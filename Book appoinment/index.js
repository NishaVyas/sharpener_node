const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(express.json());

// Route for serving the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Routes for API requests
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
