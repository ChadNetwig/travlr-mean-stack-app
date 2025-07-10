# Travlr Getaways – MEAN Stack Travel Booking Application

## Overview
Travlr Getaways is a full-stack web application designed for managing travel bookings. The system supports user registration, itinerary management, and administrative maintenance through a responsive, single-page application (SPA) interface.

This project demonstrates the implementation of the **Model–View–Controller (MVC) architectural pattern** using the MEAN stack:  
- **MongoDB** for data storage  
- **Express.js** for server-side logic  
- **Angular** for the front-end SPA  
- **Node.js** as the runtime environment  

---

## Key Features
- **User Registration and Authentication**
  - Secure account creation and login
- **Travel Package Management**
  - Search, create, update, and delete trip data
  - Admin-only access for editing content
- **RESTful API**
  - CRUD endpoints to manage trip records
- **Single Page Application**
  - Dynamic updates without full-page reloads
- **MVC Separation**
  - Clear division between data, logic, and presentation

---

## System Architecture
The application is structured into **three tiers**:

### 1. Presentation Tier (Angular)
- Responsible for all client-side rendering.
- Implements routing and view templates.
- Communicates with the server over RESTful APIs via `HttpClient`.
- Utilizes two-way data binding to update the DOM dynamically.

### 2. Business Logic Tier (Express.js + Node.js)
- Handles routing, authentication, and session management.
- Acts as middleware between the front end and database.
- Provides controller logic to process API requests.

### 3. Data Access Tier (MongoDB + Mongoose)
- Stores user accounts, travel packages, and booking data.
- Provides schema definitions and CRUD operations via Mongoose ODM.

---

## MVC Workflow
The application follows a clear MVC logic loop:

1. **View:** Angular renders the UI and captures user interactions.
2. **Controller:** Angular components make HTTP requests to the Express server.
3. **Model:** Express routes call Mongoose models to query MongoDB.
4. **Response:** Data is returned as JSON and used by Angular to update the view in real time.

---

## API Endpoints
A sample of the RESTful API routes:

| Method | Endpoint                  | Purpose                                  |
|--------|---------------------------|------------------------------------------|
| GET    | `/api/trips`              | Retrieve all trips                       |
| GET    | `/api/trips/:tripCode`    | Retrieve a single trip by code           |
| POST   | `/api/trips`              | Create a new trip                        |
| PUT    | `/api/trips/:tripCode`    | Update an existing trip                  |
| DELETE | `/api/trips/:tripCode`    | Delete a trip by code                    |

All endpoints accept and return JSON.

---

## Screenshots

### Sequence Diagram
<img src="assets/Sequence%20Diagram_Travlr%20Getaways.jpeg" alt="Sequence Diagram" width="600"/>

---

### Class Diagram
<img src="assets/Travlr%20Getaways%20Class%20Diagram%20with%20Labels.jpeg" alt="Class Diagram" width="600"/>

---

### MEAN Stack Architecture Diagram
<img src="assets/mean-stack-architecture-sequence%20diagram-example.jpeg" alt="MEAN Stack Architecture Diagram" width="600"/>

---

## Technologies Used
- **MongoDB:** NoSQL database for persistence
- **Express.js:** RESTful server framework
- **Angular:** Front-end SPA framework
- **Node.js:** JavaScript runtime
- **Mongoose:** ODM for MongoDB
- **Postman:** API testing and validation

---

## How to Build and Run
1. **Backend:**
   - Navigate to the server directory.
   - Install dependencies:  
     ```bash
     npm install
     ```
   - Start the server:  
     ```bash
     npm start
     ```
2. **Frontend:**
   - Navigate to the Angular app directory.
   - Install dependencies:  
     ```bash
     npm install
     ```
   - Start the Angular development server:  
     ```bash
     ng serve
     ```
3. Visit `http://localhost:4200` to access the application.

---

## Important Notes
- This repository is intended for demonstration and portfolio purposes.
- Additional configuration may be required for deployment in production environments.

---

## License
This project is shared for educational and illustrative purposes. No warranty is provided.
