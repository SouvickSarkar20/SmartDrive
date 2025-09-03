import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Delivery", deliverySchema);
