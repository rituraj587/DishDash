# DishDash
 a solution to manage and display dish information, including creating a database, API, and a front-end dashboard. The dashboard allows toggling the published status of dishes and show real-time updates.


# Dish Dashboard

This project is a full-stack application that allows you to manage and display dish information. It includes a Node.js backend, a MongoDB database, and a React frontend with real-time updates using Socket.IO.

## Table of Contents

- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing Features](#testing-features)

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/rituraj587/DishDash.git
    ```

2. Install backend dependencies:
    ```sh
    cd Backend
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    cd ../Frontend/DishDash
    npm install
    ```

### Configuration

1. Ensure MongoDB is running on `mongodb://localhost:27017`.
2. Populate the database with sample data if needed.

## Running the Application

### Backend

1. Start the backend server:
    ```sh
    cd Backend
    node index.js
    ```

### Frontend

1. Start the frontend server:
    ```sh
    cd ../Frontend/DishDash
    npm run dev
    ```

## Testing Features

### Fetching Dishes

1. Open your browser and navigate to `http://localhost:5173`.
2. You should see a list of dishes displayed on the dashboard.

### Toggling Publish Status

1. Click the "Publish" or "Unpublish" button on any dish card.
2. The status should update immediately on the UI and reflect the change in the backend.

### Real-Time Updates

1. Open another tab and navigate to `http://localhost:5173`.
2. In the first tab, make a POST request to toggle the publish status:
    ```sh
    curl -X POST http://localhost:3000/test-update
    ```
3. Observe the real-time update reflecting in both tabs.

### API Endpoints

- **Get all dishes:**
    ```sh
    GET http://localhost:3000/dishes
    ```

- **Toggle publish status:**
    ```sh
    POST http://localhost:3000/toggle-publish/:dishId
    ```

- **Test update endpoint:**
    ```sh
    POST http://localhost:3000/test-update
    ```

### Socket.IO

1. The backend is configured to use Socket.IO with CORS enabled for the frontend.
2. The frontend listens for updates and updates the UI in real-time when the backend emits changes.

## Additional Notes

- Ensure that both frontend and backend servers are running simultaneously.
- If there are any issues with CORS, check that the origins are correctly configured in the backend.

## Conclusion

This application demonstrates a simple yet effective way to manage and display dish information with real-time updates. Follow the instructions to test and ensure all features are working as expected.
