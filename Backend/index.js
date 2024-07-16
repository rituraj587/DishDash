const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());


let sample = [
  {
    "dishName": "Jeera Rice",
    "dishId": "1",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    "isPublished": true
  },
  {
    "dishName": "Paneer Tikka",
    "dishId": "2",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    "isPublished": true
  },
  {
    "dishName": "Rabdi",
    "dishId": "3",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    "isPublished": true
  },
  {
    "dishName": "Chicken Biryani",
    "dishId": "4",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    "isPublished": true
  },
  {
    "dishName": "Alfredo Pasta",
    "dishId": "5",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    "isPublished": true
  }
];

mongoose.connect('mongodb://localhost:27017/dishes');

const dishSchema = new mongoose.Schema({
  dishId: String,
  dishName: String,
  imageUrl: String,
  isPublished: Boolean
});

const Dish = mongoose.model('Dish', dishSchema);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

app.post('/toggle-publish/:dishId', async (req, res) => {
  const { dishId } = req.params;
  const dish = await Dish.findOne({ dishId });
  if (dish) {
    dish.isPublished = !dish.isPublished;
    await dish.save();
    io.emit('update', dish);
    res.json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});

app.post('/test-update', async (req, res) => {
  const dish = await Dish.findOne();
  if (dish) {
    dish.isPublished = !dish.isPublished;
    await dish.save();
    io.emit('update', dish);
    res.json(dish);
  } else {
    res.status(404).json({ message: 'No dish found' });
  }
});

server.listen(3000, () => console.log('Server started on port 3000'));
