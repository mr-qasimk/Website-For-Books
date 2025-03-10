require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());


app.use(express.json());

app.use(bodyParser.json());

// Serve static files (uploads folder)
app.use('/uploads', express.static('Uploads'));
//mongodb
mongoose
  .connect(process.env.mongooseUrl, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


const userRoutes = require('./Routes/userRoutes')
const bookRoutes = require('./Routes/bookRoutes')
const favoriteRoutes = require('./Routes/favoriteRoutes')



app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/favorites', favoriteRoutes);


  // Start the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  