const Subscriber = require("../models/subscriberModel");

async function getElements(req, res) {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getElementbyId(req, res) {
  try {
    const subscribers = await Subscriber.findById(req.params.id).exec();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createElement(req, res) {
  console.log("Request Body:", req.body);

  try {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribeToChannel: req.body.subscribeToChannel,
    });
    const sub = await subscriber.save();
    res.status(201).json({ data: sub });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateElement(req, res) {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribeToChannel != null) {
    res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
  }
  try {
    const updateSubscriber = await res.subscriber.save();
    res.json(updateSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.mesage });
  }
}

async function deleteElement(req, res) {
  try {
    await req.subscriber.deleteOne();
    res.json({ message: "deleted the subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSubscriber(req, res, next) {
  try {
    let subscriber = await Subscriber.findById(req.params.id).exec();
    if (subscriber === null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
    req.subscriber = subscriber;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getElements,
  getElementbyId,
  createElement,
  updateElement,
  deleteElement,
  getSubscriber,
};
