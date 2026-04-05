const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const routes = require('./routes/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const validateMiddleware = require('./middlewares/validateMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configure CORS to allow only specific origins
const corsOptions = {
    origin: ['http://localhost:3000'],
};

// Middleware
app.use(bodyParser.json());

// CORS Config
app.use(cors(corsOptions));

// Routes
app.use('/', routes);

// Middleware
app.use(errorMiddleware);
app.use(validateMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});