# 🌍 Tour Connect Backend ✈️

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)

Welcome to the **Tour Connect** backend! This is a robust Express.js & MongoDB-powered REST API designed for managing and organizing guided tours. It features full CRUD operations, detailed Swagger API documentation, rotational file logging, and comes with a beautiful vanilla front-end to interact directly with the API.

---

## ✨ Key Features
- 🚀 **RESTful Architecture:** 
- 📖 **Swagger UI Documentation:**
- 💾 **MongoDB Integration:** 
- 📝 **Advanced Logging:** 
- 🎨 **Built-in Dashboard:** 

---

## 🛠️ Tech Stack
- **Runtime Environment:** [Node.js](https://nodejs.org/en/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **API Documentation:** [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) & [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- **Logging:** [Morgan](https://github.com/expressjs/morgan) & [Rotating File Stream](https://github.com/iccicci/rotating-file-stream)

---

## 📂 Folder Structure
```text
📦 tour-connect-backend
 ┣ 📂 config            # Logging and configuration files (e.g., logger.js)
 ┣ 📂 controllers       # Core business logic methods for different routes
 ┣ 📂 models            # Mongoose schemas representing database collections
 ┣ 📂 public            # Frontend assets (HTML, CSS, JS dashboard)
 ┣ 📂 routes            # Express router setups mapping URLs to controllers
 ┣ 📂 swagger           # Swagger configuration and implementation definitions
 ┣ 📂 utils             # Utilities, e.g., dummy tour generation script
 ┣ 📜 app.js            # Express application setup, middlewares, and mounting
 ┣ 📜 index.js          # Entry point that connects to DB and starts the server
 ┗ 📜 package.json      # Dependencies and project scripts
```

---

## ⚙️ Pre-requisites
Make sure you have the following installed on your machine:
- **Node.js**: v14.0.0 or higher
- **MongoDB**: Locally installed or access to a MongoDB Atlas cluster URI

---

## 🚀 Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/your-username/tour-connect-backend.git
cd tour-connect-backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

**4. Run the application**
For development (uses nodemon to auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```
The server will be running normally on `http://localhost:3000`.

---

## 🌐 API Overview & Endpoints
The base API route path is `/tour`.

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | `/tour`       | Fetch all available tours            |
| POST   | `/tour`       | Create a new tour                    |
| GET    | `/tour/:id`   | Fetch a specific tour by its ID      |
| PUT    | `/tour/:id`   | Update a specific tour fully         |
| DELETE | `/tour/:id`   | Delete a specific tour from the DB   |

---

## 📚 Interactive API Documentation (Swagger)
This project makes API testing and implementation simple using a built-in Swagger interface.
Once the server is running, navigate to:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)** 

Here, you can learn about expected request bodies and schema requirements, and natively execute requests to test response states.

---

## 🖥️ Mini Dashboard Access
This project features a neatly-styled built-in Vanilla frontend to easily test API endpoints visually.
Start the server and immediately open your browser, navigating to:

👉 **[http://localhost:3000](http://localhost:3000)**

You'll see a dashboard interface featuring:
- **All Tours** fetcher
- **Create Tour** form wizard
- **Update Tour** parameter inputs
- **Delete Tour** input panel

---

## 📊 Request Logging Overview
All HTTP requests hitting the server endpoints are meticulously logged inside a local `/logs` directory using a streamlined setup with `morgan`.
Log streams are automatically grouped and rotated daily using `rotating-file-stream`, ensuring massive logs don't consume all your disk space over extended uptimes!

---

> Crafted with ❤️ by Durga Prasad Kar
