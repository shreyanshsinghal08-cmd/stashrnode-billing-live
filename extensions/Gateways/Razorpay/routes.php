<?php

use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/extensions/gateways/razorpay/webhook', [\App\Extensions\Gateways\Razorpay\Razorpay::class, 'webhook'])
    ->name('extensions.gateways.razorpay.webhook');
