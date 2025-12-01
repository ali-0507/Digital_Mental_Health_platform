const Screening = require("../models/Screening");
const {logActivity} = require("../utils/User.logActivity");
const questionSets = require("../data/screeningQuestions");


exports.saveScreening = async (req, res) => {
  try {
    const { answers, score, level } = req.body;

    if (!answers || score === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const last = await Screening.findOne({ user: req.user._id }).sort({ createdAt: -1 });

    // let level = "level1";
    // if (last) {
    //   if (last.score < 10) level = "level1";
    //   else if (last.score < 16) level = "level2";
    //   else level = "level3";
    // }

    const questions = questionSets[level];

    const newScreening = await Screening.create({
      user: req.user._id,
      questions,   // always save backend questions
      answers,
      score,
      level,
    });

    await logActivity(req.user?._id, "screening", { score });
    res.status(201).json({
      message: "Screening saved successfully",
      data: newScreening,
    });
    res.status(201).json({ message: "Saved", data: newScreening });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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


exports.getQuestions = async (req, res) => {
  const userId = req.user?._id;
  const last = await Screening.findOne({ user: userId }).sort({ createdAt: -1 });

  let level = "level1";
  if (last) {
    if (last.score < 10) level = "level1";
    else if (last.score < 16) level = "level2";
    else level = "level3";
  }

  res.json({ questions: questionSets[level], level });
};

exports.clearHistory = async (req, res) => {
  try {
    console.log("Deleting for user:", req.user._id);
    
    const result= await Screening.deleteMany({ user: req.user._id });

    console.log("Delete result:", result);

    res.status(200).json({
      message: "All screening history cleared successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error while clearing history" });
  }
};

exports.deleteOneScreening = async (req, res) => {
  try {
    const screeningId = req.params.id;

    // Ensure the item belongs to the logged-in user
    const deleted = await Screening.findOneAndDelete({
      _id: screeningId,
      user: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Screening not found or not yours" });
    }

    res.json({ message: "Screening deleted", data: deleted });
  } catch (err) {
    console.error("Delete single screening error:", err);
    res.status(500).json({ message: "Server error while deleting screening" });
  }
};
