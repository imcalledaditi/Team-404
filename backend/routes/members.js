const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');
const path = require('path');

// Setup file upload destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images are saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // make name unique
  }
});

const upload = multer({ storage: storage });


// ✅ GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching member' });
  }
});

// ✅ POST new member
router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    const {
      name,
      email,
      rollNumber,
      year,
      degree,
      role,
      project,
      hobby,
      certification,
      internship,
      aim
    } = req.body;

    const newMember = new Member({
      name,
      email,
      rollNumber,
      year,
      degree,
      role,
      project,
      hobby,
      certification,
      internship,
      aim,
      profileImage: req.file ? req.file.filename : null
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving member' });
  }
});

// ✅ PUT update member
router.put('/:id', async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Member not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating member' });
  }
});

// ✅ DELETE member
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting member' });
  }
});

module.exports = router;
