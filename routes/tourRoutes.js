const express = require("express");
const router = express.Router();
const { getAllTours, createTour, updateTour, deleteTour, getTourById } = require("../controllers/tourController");
const validate = require("../middlewares/validate");
const { tourSchema, updateTourSchema } = require("../validators/tourValidator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - tour_id
 *         - title
 *       properties:
 *         tour_id:
 *           type: number
 *           description: The unique identifier for a tour
 *         title:
 *           type: string
 *           description: The title of the tour
 *         description:
 *           type: string
 *           description: The description of the tour
 *         pick_up:
 *           type: string
 *           description: Pick up location
 *         meeting_point:
 *           type: string
 *           description: Meeting point for the tour
 *         drop_off:
 *           type: string
 *           description: Drop off location
 *         duration:
 *           type: number
 *           description: Duration of the tour
 *         duration_unit:
 *           type: string
 *           description: Duration unit (e.g., days, hours)
 *           default: days
 *       example:
 *         tour_id: 101
 *         title: "Amazing Paris Tour"
 *         description: "A wonderful tour around the city of light."
 *         pick_up: "Hotel Lobby"
 *         meeting_point: "Eiffel Tower"
 *         drop_off: "Hotel"
 *         duration: 3
 *         duration_unit: "days"
 *     UpdateTour:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the tour
 *         description:
 *           type: string
 *           description: The description of the tour
 *         pick_up:
 *           type: string
 *           description: Pick up location
 *         meeting_point:
 *           type: string
 *           description: Meeting point for the tour
 *         drop_off:
 *           type: string
 *           description: Drop off location
 *         duration:
 *           type: number
 *           description: Duration of the tour
 *         duration_unit:   
 *           type: string
 *           description: Duration unit (e.g., day, days, hour, hours)
 *           default: days
 *       example:
 *         title: "Amazing Paris Tour"
 *         description: "A wonderful tour around the city of light."
 *         pick_up: "Hotel Lobby"
 *         meeting_point: "Eiffel Tower"
 *         drop_off: "Hotel"
 *         duration: 3
 *         duration_unit: "days"
 */

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: API for managing tours
 */

/**
 * @swagger
 * /tour:
 *   get:
 *     summary: Retrieve a list of tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *         description: A list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     tour_options:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Tour'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllTours);

/**
 * @swagger
 * /tour:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Tour created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tour created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(tourSchema), createTour);

/**
 * @swagger
 * /tour/{id}:
 *   put:
 *     summary: Update an existing tour
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The unique ID of the tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTour'
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Amazing Paris Tour updated successfully"
 *       500:
 *         description: Internal server error
 */
router.put("/:tour_id", validate(updateTourSchema), updateTour);

/**
 * @swagger
 * /tour/{id}:
 *   delete:
 *     summary: Delete a tour
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the tour
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Amazing Paris Tour deleted successfully"
 *       500:
 *         description: Internal server error
 */
router.delete("/:tour_id", deleteTour);

/**
 * @swagger
 * /tour/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the tour
 *     responses:
 *       200:
 *         description: A single tour object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     tour_options:
 *                       $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Internal server error
 */
router.get("/:tour_id", getTourById);

module.exports = router;