const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Tour API", () => {
    beforeAll(async () => {
        const connectDB = require("../config/db");
        await connectDB();
    });

    afterAll(async () => {
        // Clean up mock tour inserted during testing
        const Tour = require("../models/tourModel");
        await Tour.deleteMany({ tour_id: { $in: [1, "1", 999, "999"] } });
        await mongoose.connection.close();
    });

    it("POST /tour should create a tour", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: 1,
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Tour created successfully");
    });

    it("PUT /tour/:id should update a tour", async () => {
        const response = await request(app).put("/tour/1").send({
            duration: "2",
            duration_unit: "hours",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Tour 1 updated successfully");
    });

    it("GET /tour/:id should return a tour", async () => {
        const response = await request(app).get("/tour/1");
        expect(response.status).toBe(200);
        expect(response.body.data.tour_options[0]).toHaveProperty("tour_id", 1);
    });

    it("GET /tour should return all tours", async () => {
        const response = await request(app).get("/tour");
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("tour_options");
        expect(Array.isArray(response.body.data.tour_options)).toBe(true);
    });

    it("DELETE /tour/:id should delete a tour", async () => {
        const response = await request(app).delete("/tour/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Tour 1 deleted successfully");
    });

    it("GET /tour/:id should return 404 if tour not found", async () => {
        const response = await request(app).get("/tour/999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Tour not found");
    });

    it("PUT /tour/:id should return 404 if tour not found", async () => {
        const response = await request(app).put("/tour/999").send({
            title: "Tour 1 updated",
            description: "Description 1 updated",
            pick_up: "Pick up 1 updated",
            meeting_point: "Meeting point 1 updated",
            drop_off: "Drop off 1 updated",
            duration: "2",
            duration_unit: "hour",
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Tour not found");
    });

    it("DELETE /tour/:id should return 404 if tour not found", async () => {
        const response = await request(app).delete("/tour/999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Tour not found");
    });

    it("POST should fail if tour_id is missing", async () => {
        const response = await request(app).post("/tour").send({
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"tour_id\" is required");
    });

    it("POST should fail if title is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"title\" is required");
    });

    it("POST should fail if title is less than 3 characters", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "To",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"title\" length must be at least 3 characters long");
    });

    it("POST should fail if title is more than 100 characters", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1".repeat(100),
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"title\" length must be less than or equal to 100 characters long");
    });

    it("POST should fail if description is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"description\" is required");
    });

    it("POST should fail if description is less than 5 characters", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Desc",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"description\" length must be at least 5 characters long");
    });

    it("POST should fail if description is more than 1000 characters", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1".repeat(1000),
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"description\" length must be less than or equal to 1000 characters long");
    });

    it("POST should fail if pick_up is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"pick_up\" is required");
    });

    it("POST should fail if meeting_point is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"meeting_point\" is required");
    });

    it("POST should fail if drop_off is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            duration: "1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"drop_off\" is required");
    });

    it("POST should fail if duration is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration\" is required");
    });

    it("POST should fail if duration_unit is missing", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration_unit\" is required");
    });

    it("POST /tour should fail if duration_unit is not valid", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "1",
            duration_unit: "second",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration_unit\" must be one of [hour, hours, day, days]");
    });

    it("POST /tour should fail if duration is negative", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "-1",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration\" must be a positive number");
    });

    it("POST /tour should fail if duration is zero", async () => {
        const response = await request(app).post("/tour").send({
            tour_id: "1",
            title: "Tour 1",
            description: "Description 1",
            pick_up: "Pick up 1",
            meeting_point: "Meeting point 1",
            drop_off: "Drop off 1",
            duration: "0",
            duration_unit: "hour",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration\" must be a positive number");
    });

    it("PUT /tour/:id should fail if title is less than 3 characters", async () => {
        const response = await request(app).put("/tour/1").send({
            title: "To",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"title\" length must be at least 3 characters long");
    });

    it("PUT /tour/:id should fail if title is more than 100 characters", async () => {
        const response = await request(app).put("/tour/1").send({
            title: "Title 1".repeat(100),
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"title\" length must be less than or equal to 100 characters long");
    });

    it("PUT /tour/:id should fail if description is less than 5 characters", async () => {
        const response = await request(app).put("/tour/1").send({
            description: "Desc",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"description\" length must be at least 5 characters long");
    });

    it("PUT /tour/:id should fail if description is more than 1000 characters", async () => {
        const response = await request(app).put("/tour/1").send({
            description: "Description 1".repeat(1000),
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"description\" length must be less than or equal to 1000 characters long");
    });

    it("PUT /tour/:id should fail if duration is negative", async () => {
        const response = await request(app).put("/tour/1").send({
            duration: "-1",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration\" must be a positive number");
    });

    it("PUT /tour/:id should fail if duration is zero", async () => {
        const response = await request(app).put("/tour/1").send({
            duration: "0",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration\" must be a positive number");
    });

    it("PUT /tour/:id should fail if duration_unit is not valid", async () => {
        const response = await request(app).put("/tour/1").send({
            duration_unit: "second",
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toContain("\"duration_unit\" must be one of [hour, hours, day, days]");
    });

});