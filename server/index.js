const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow requests from Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
    res.json({ status: 'Idea Platform Backend is running' });
});

// Example route for submitting ideas
app.post('/api/ideas', (req, res) => {
    const { title, description, impact } = req.body;
    console.log('New Idea Received:', { title, description, impact });

    // In a real app, you would save this to a database (e.g. Firestore)
    res.status(201).json({
        message: 'Idea submitted successfully!',
        idea: { title, description, impact, id: Date.now() }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
