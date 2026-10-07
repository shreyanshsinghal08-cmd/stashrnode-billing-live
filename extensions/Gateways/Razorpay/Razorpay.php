<?php

namespace App\Extensions\Gateways\Razorpay;

use App\Attributes\ExtensionMeta;
use App\Classes\Extension\Gateway;
use App\Classes\Extension\Extension;
use App\Helpers\ExtensionHelper;
use App\Models\Invoice;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

if (!class_exists('App\Extensions\Gateways\Razorpay\Razorpay')) {
    #[ExtensionMeta(
        name: 'Razorpay Gateway',
        description: 'Accept payments via Razorpay (UPI, Cards, NetBanking, Wallets).',
        version: '1.0.0',
        author: 'Paymenter',
        url: 'https://razorpay.com'
    )]
    class Razorpay extends Gateway
    {
        public function boot()
        {
            if (file_exists(__DIR__ . '/routes.php')) {
                require __DIR__ . '/routes.php';
            } elseif (!Route::has('extensions.gateways.razorpay.webhook')) {
                Route::match(['get', 'post'], '/extensions/gateways/razorpay/webhook', [static::class, 'webhook'])
                    ->name('extensions.gateways.razorpay.webhook');
            }
        }

        public function getName()
        {
            return 'Razorpay';
        }

        public function getConfig($values = [])
        {
            if (is_string($values)) {
                $key = $values;
                // 1. Check loaded config array
                if (!empty($this->config[$key])) {
                    return $this->config[$key];
                }

                // 2. Query settings table from database
                $setting = Setting::where('key', $key)
                    ->where(function ($query) {
                        $query->where('settingable_type', \App\Models\Gateway::class)
                            ->orWhere('settingable_type', \App\Models\Extension::class)
                            ->orWhere('settingable_type', 'gateway')
                            ->orWhere('settingable_type', 'extension');
                    })
                    ->value('value');

                if ($setting) {
                    return $setting;
                }

                // 3. Fallback to services config / environment variables
                return config('services.razorpay.' . $key) ?? env('RAZORPAY_' . strtoupper($key));
            }

            return [
                [
                    'name' => 'key_id',
                    'friendlyName' => 'Razorpay Key ID',
                    'label' => 'Razorpay Key ID',
                    'type' => 'string',
                    'required' => true,
                    'description' => 'Enter your Razorpay Key ID (e.g. rzp_live_xxxxxxxx or rzp_test_xxxxxxx)',
                ],
                [
                    'name' => 'key_secret',
                    'friendlyName' => 'Razorpay Key Secret',
                    'label' => 'Razorpay Key Secret',
                    'type' => 'string',
                    'required' => true,
                    'description' => 'Enter your Razorpay Key Secret',
                ],
            ];
        }

        public function pay($invoice, $total = null)
        {
            $keyId = $this->getConfig('key_id');
            $keySecret = $this->getConfig('key_secret');
            $amount = (int) round(($total ?? $invoice->total) * 100); // Amount in paise
            $currency = $invoice->currency ?? 'INR';

            // Create Razorpay Order via HTTP API
            $response = Http::withBasicAuth($keyId, $keySecret)
                ->post('https://api.razorpay.com/v1/orders', [
                    'amount' => $amount,
                    'currency' => $currency,
                    'receipt' => 'INV-' . $invoice->id,
                    'notes' => [
                        'invoice_id' => $invoice->id,
                    ],
                ]);

            if ($response->failed()) {
                Log::error('Razorpay Order Creation Failed: ' . $response->body());
                return redirect()->back()->with('error', 'Unable to initiate Razorpay payment. Check API Keys.');
            }

            $order = $response->json();
            $orderId = $order['id'];
            $callbackUrl = Route::has('extensions.gateways.razorpay.webhook')
                ? route('extensions.gateways.razorpay.webhook', ['invoice_id' => $invoice->id])
                : url('/extensions/gateways/razorpay/webhook?invoice_id=' . $invoice->id);
            $sep = str_contains($callbackUrl, '?') ? '&' : '?';

            // Render Inline Razorpay Standard Checkout JS Form
            $html = '
            <!DOCTYPE html>
            <html>
            <head>
                <title>Redirecting to Razorpay...</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                    .card { text-align: center; background: #1e293b; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
                    .spinner { border: 4px solid rgba(255,255,255,0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #06b6d4; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="spinner"></div>
                    <h2>Connecting to Razorpay Gateway...</h2>
                    <p>Please do not close or refresh this window.</p>
                </div>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <script>
                    var options = {
                        "key": "' . e($keyId) . '",
                        "amount": "' . $amount . '",
                        "currency": "' . e($currency) . '",
                        "name": "' . e(config('app.name', 'StashrNode')) . '",
                        "description": "Invoice #' . e($invoice->id) . ' Payment",
                        "order_id": "' . e($orderId) . '",
                        "handler": function (response){
                            window.location.href = "' . $callbackUrl . $sep . 'razorpay_payment_id=" + response.razorpay_payment_id + "&razorpay_order_id=" + response.razorpay_order_id + "&razorpay_signature=" + response.razorpay_signature;
                        },
                        "modal": {
                            "ondismiss": function(){
                                window.location.href = "' . (Route::has('invoices.show') ? route('invoices.show', $invoice->id) : url('/invoices/' . $invoice->id)) . '";
                            }
                        },
                        "theme": {
                            "color": "#06b6d4"
                        }
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.open();
                </script>
            </body>
            </html>';

            return response($html);
        }

        public function webhook(Request $request)
        {
            $keySecret = $this->getConfig('key_secret');

            // Handle Webhook / Callback Redirect parameters
            $paymentId = $request->input('razorpay_payment_id')
                ?? $request->input('payload.payment.entity.id');
            $orderId = $request->input('razorpay_order_id')
                ?? $request->input('payload.order.entity.id')
                ?? $request->input('payload.payment.entity.order_id');
            $signature = $request->input('razorpay_signature')
                ?? $request->header('X-Razorpay-Signature');
            $invoiceId = $request->input('invoice_id')
                ?? $request->input('payload.payment.entity.notes.invoice_id');

            if ($paymentId && $orderId && $signature && $invoiceId) {
                $generatedSignature = hash_hmac('sha256', $orderId . "|" . $paymentId, $keySecret);

                if (hash_equals($generatedSignature, $signature)) {
                    // Verification Successful - Mark Invoice Paid
                    $invoice = Invoice::find($invoiceId);
                    if ($invoice && $invoice->status !== 'paid') {
                        Extension::payment($invoice->id, 'Razorpay', $paymentId);
                        ExtensionHelper::payment($invoice, 'Razorpay', $paymentId);
                        if ($invoice->fresh()->status !== 'paid') {
                            $invoice->status = 'paid';
                            $invoice->save();
                        }
                    }

                    if ($request->isMethod('post') && !$request->has('razorpay_payment_id')) {
                        return response()->json(['status' => 'success']);
                    }

                    $redirectUrl = Route::has('invoices.show') ? route('invoices.show', $invoiceId) : url('/invoices/' . $invoiceId);
                    return redirect()->to($redirectUrl)->with('success', 'Payment successful via Razorpay!');
                }
            }

            return response()->json(['status' => 'error', 'message' => 'Invalid signature'], 400);
        }
    }
}

if (!class_exists('Paymenter\Extensions\Gateways\Razorpay\Razorpay')) {
    class_alias('App\Extensions\Gateways\Razorpay\Razorpay', 'Paymenter\Extensions\Gateways\Razorpay\Razorpay');
}

if (!class_exists('App\Extensions\Gateways\Razorpay\Extension')) {
    class_alias('App\Classes\Extension\Extension', 'App\Extensions\Gateways\Razorpay\Extension');
}