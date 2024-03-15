// app.js
require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

// Use environment variables in your application
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Todo = sequelize.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Enables createdAt and updatedAt fields
    createdAt: 'created_at', // Customize createdAt field name
    updatedAt: 'updated_at' // Customize updatedAt field name
});

// Setup middlewares
// Parse JSON request bodies
app.use(bodyParser.json());

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes and middleware
app.get("/ping", async (req, res) => {
    res.status(200).json({ message: "pong" })
})

app.get("/api/v1/todos", async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.status(200).json({ data: todos })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post("/api/v1/todos", async (req, res) => {
    const { description, status } = req.body
    try {
        const todo = await Todo.create({ description, status }, {
            fields: ['description', 'status']
        })
        res.status(200).json({ data: { todo } })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});