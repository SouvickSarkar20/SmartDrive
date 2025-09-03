import Delivery from "../models/Delivery.js";

export const addDelivery = async (req, res) => {
  try {
    const { location } = req.body;
    const delivery = await Delivery.create({ userId: req.user, location });
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
