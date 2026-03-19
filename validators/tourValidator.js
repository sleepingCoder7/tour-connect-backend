const Joi = require("joi");

const tourSchema = Joi.object({
    tour_id: Joi.number().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(1000).required(),
    pick_up: Joi.string().required(),
    meeting_point: Joi.string().required(),
    drop_off: Joi.string().required(),
    duration: Joi.number().positive().required(),
    duration_unit: Joi.string().valid("hour", "hours", "day", "days").required(),
});

const updateTourSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(5).max(1000),
    pick_up: Joi.string(),
    meeting_point: Joi.string(),
    drop_off: Joi.string(),
    duration: Joi.number().positive(),
    duration_unit: Joi.string().valid("hour", "hours", "day", "days"),
});

module.exports = { tourSchema, updateTourSchema };