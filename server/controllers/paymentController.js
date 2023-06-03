const BigPromise = require("../middlewares/bigPromise");
const Payment = require("../models/payment.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorpaykey: process.env.RAZORPAY_API_KEY,
  });
});

exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  let options = {
    amount: Number(req.body.amount * 100), // amount conversion from paise to rupees
    currency: "INR",
    receipt: crypto.randomBytes(20).toString("hex"),
  };
  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: myOrder,
  });
});

exports.paymentVerification = BigPromise(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // const key = new String(razorpay_order_id + "|" + razorpay_payment_id);

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
  //   .update(key.toString())
  //   .digest("hex");

  // const isAuthentic = expectedSignature === razorpay_signature;

  const isAuthentic = true;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({ success: true, data: razorpay_order_id });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
