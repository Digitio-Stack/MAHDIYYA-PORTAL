const express = require("express");
const router = express.Router();
const Duty = require("../models/dutyModel"); // Assuming your Mongoose model is defined in a file called 'duty.js'

// Route to get all duties
router.get("/", async (req, res) => {
  try {
    const duties = await Duty.find();
    res.json(duties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single duty by institutionNumber
router.get("/:institutionNumber", getDuty, (req, res) => {
  res.json(res.duty);
});

// Middleware function to get duty object by institutionNumber
async function getDuty(req, res, next) {
  let duty;
  try {
    duty = await Duty.findOne({
      institutionNumber: req.params.institutionNumber,
    });
    if (duty == null) {
      return res.status(404).json({ message: "Cannot find duty" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.duty = duty;
  next();
}

// Route to create a new duty
router.post("/", async (req, res) => {
  const duty = new Duty({
    institutionNumber: req.body.institutionNumber,
    institutionName: req.body.institutionName,
    dates: req.body.dates,
  });

  try {
    const newDuty = await duty.save();
    res.status(201).json(newDuty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a duty
router.patch("/:institutionNumber", getDuty, async (req, res) => {
  if (req.body.institutionName != null) {
    res.duty.institutionName = req.body.institutionName;
  }
  if (req.body.dates != null) {
    res.duty.dates = req.body.dates;
  }
  try {
    const updatedDuty = await res.duty.save();
    res.json(updatedDuty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a duty
router.delete("/:institutionNumber", getDuty, async (req, res) => {
  try {
    await res.duty.remove();
    res.json({ message: "Deleted duty" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
