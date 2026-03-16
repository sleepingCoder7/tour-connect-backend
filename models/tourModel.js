const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    tour_id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    pick_up: String,
    meeting_point: String,
    drop_off: String,
    duration: Number,
    duration_unit: {
        type: String,
        default: "days"
    }
}, { versionKey: false });

module.exports = mongoose.model("Tour", tourSchema);