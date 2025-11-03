const Screening = require("../models/Screening");

exports.saveScreening = async (req, res) => {
  try {
    const { questions, answers, score } = req.body;

    if (!questions || !answers || score === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newScreening = await Screening.create({
      user: req.user._id,
      questions,
      answers,
      score,
    });

    res.status(201).json({
      message: "Screening saved successfully",
      data: newScreening,
    });
  } catch (err) {
    console.error("Save screening error:", err);
    res.status(500).json({ message: "Server error while saving screening" });
  }
};

exports.getUserScreenings = async (req, res) => {
  try {
    const screenings = await Screening.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ data: screenings });
  } catch (err) {
    console.error("Fetch screenings error:", err);
    res.status(500).json({ message: "Server error while fetching screenings" });
  }
};
