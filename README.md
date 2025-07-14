# Three Animals V.2 - Hot Hand Thinking in Children

This is an archived Node.js + Express web application originally deployed on Heroku. It interfaces with a MongoDB Atlas cluster and provides multiple experiment tasks and logging endpoints.

## Overview

The app serves an interface for recording experiment results via endpoints like `/otters`, `/owls`, `/chipmunks`, and `/subjects`, and retrieving them through corresponding `GET` routes. It also serves EJS-based HTML views and static assets from the `/public` folder.

## Requirements

- Node.js (v14 or higher recommended)
- npm
- MongoDB Atlas account (or local MongoDB) - you must create a cluster called "dbRabbits" and collections named after the animals "otters", "owls" and "chipmunks". Another collection "subjects" is used for collecting subjects info.

## Setup

1. Clone this repo

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root of the project with the following format:
    ```bash
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dbRabbits
    PORT=3000

4. If you want to test with a local MongoDB instance instead, you can omit MONGODB_URI — the app defaults to mongodb://localhost:27017.

5. Start the server
    ```bash
    npm start

6. Visit: http://localhost:3000

## Project Structure
    ThreeAnimalsV2/
    ├── public/              # Static assets (CSS, JS, images)
    ├── views/               # EJS templates (index.ejs, task1.ejs, etc.)
    ├── server.js            # Main server logic
    ├── .env                 # Example env file (add this manually)
    ├── .gitignore
    ├── package.json
    └── package-lock.json

## Routes
### Frontend Views
    / – Landing page
    /task1, /task2, /task3 – Experiment tasks
### API Endpoints
#### GET
    /logOtters, /logOwls, /logChipmunks – Return logs
    /subjects – List of subject numbers
    /single_subject/:id – Retrieve a specific subject by MongoDB ObjectId
#### POST
    /otters, /owls, /chipmunks, /subjects – Insert new records
#### PUT
    /update_subject – Update subject’s experiment field

## Notes
1. This project is archived and not actively maintained.
2. Some routes may assume specific formats in the front-end form submission — inspect views/ and public/ assets for context.
3. body-parser is now part of Express (express.json() and express.urlencoded()), but is still used here for legacy compatibility.