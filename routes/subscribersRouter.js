const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriberModel");
const {
  getElements,
  getElementbyId,
  createElement,
  updateElement,
  deleteElement,
  getSubscriber,
} = require("../controllers/suscriberController");

// routes for -------------------
// getting all
router.get("/", getElements);

// getting one
router.get("/:id", getElementbyId);

// creating one
router.post("/", createElement);

// updating one
router.patch("/:id", getSubscriber, updateElement);

// deleting one
router.delete("/:id", getSubscriber, deleteElement);

module.exports = router;
