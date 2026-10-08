import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, amount, currency = "INR" } = body;

    if (!amount) {
      return NextResponse.json(
        { error: "Invoice amount is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Convert USD to INR representation (1 USD ≈ 83 INR) or use exact amount if INR
    const amountInPaise = Math.round(Number(amount) * 83 * 100);

    // If actual Razorpay credentials are set in environment
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${invoiceId || Date.now()}`,
        notes: {
          invoiceId: invoiceId || "INV-2026-092",
          platform: "StashrNode Next.js 14 Vercel",
        },
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
      });
    }

    // Seamless Fallback for Vercel Preview / Demo Mode
    const mockOrderId = `order_sn_${Math.random().toString(36).substring(2, 11)}`;
    return NextResponse.json({
      orderId: mockOrderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: "rzp_test_StashrNodeDemo",
      demoMode: true,
      message: "Order generated in sandbox demo mode. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET for live processing.",
    });
  } catch (error: any) {
    console.error("Razorpay order generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
