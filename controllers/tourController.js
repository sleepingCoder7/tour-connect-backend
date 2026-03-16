const Tour = require("../models/tourModel.js");

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({
            data: {
                tour_options: tours
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTourById = async (req, res) => {
    try {
        const tour = await Tour.find({tour_id: req.params.tour_id});
        if (tour.length === 0) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({
            data: {
                tour_options: tour
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTour = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        res.status(201).json({ message: "Tour created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTour = async (req, res) => {
    try {
        const tourId = req.params.tour_id;
        const tour = await Tour.findOneAndUpdate({tour_id: tourId}, req.body);
        res.status(200).json({ message: `${tour.title} updated successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTour = async (req, res) => {
    try {
        const tourId = req.params.tour_id;
        const tour = await Tour.findOneAndDelete({tour_id: tourId});
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        res.status(200).json({ message: `${tour.title} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getAllTours, createTour, updateTour, deleteTour, getTourById};