const Booking = require("../models/Booking");
const { sendEmail } = require("../utils/email");

exports.createBooking = async (req, res) => {
  try {
    const user = req.user; // from protect middleware
    const { name, email, date, time, mode, note } = req.body;

    // 1️⃣ Save booking in DB
    const booking = await Booking.create({
      user: user._id,
      name,
      email,
      date,
      time,
      mode,
      note,
    });

    // 2️⃣ Send confirmation email to the user
    await sendEmail(
      email,
      "Your Booking Confirmation",
      `Hi ${name}, your booking for ${date} at ${time} (${mode}) has been successfully received.`,
      `<p>Hi <b>${name}</b>,</p>
       <p>Your booking for <b>${date}</b> at <b>${time}</b> (${mode}) has been successfully received.</p>
       <p>Our counselor will contact you soon.</p>
       <p>— Digital Mental Health Platform</p>`
    );

    // 3️⃣ Send notification email to the admin/counselor
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Booking Received",
      `New booking from ${name} (${email}) on ${date} ${time}. Mode: ${mode}. Note: ${note || "N/A"}`,
      `<p><b>New Booking Received</b></p>
       <p><b>Name:</b> ${name}</p>
       <p><b>Email:</b> ${email}</p>
       <p><b>Date:</b> ${date}</p>
       <p><b>Time:</b> ${time}</p>
       <p><b>Mode:</b> ${mode}</p>
       <p><b>Note:</b> ${note || "N/A"}</p>`
    );

    // 4️⃣ Respond success
    res.status(201).json({
      success: true,
      message: "Booking created successfully and emails sent",
      booking,
    });
  } catch (err) {
    console.error("❌ Booking creation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};