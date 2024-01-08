require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect(mongoString);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
