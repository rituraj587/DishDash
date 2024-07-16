const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

let sample =[
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
  ]


mongoose.connect('mongodb://localhost:27017/dishes');

const dishSchema = new mongoose.Schema({
  dishId: String,
  dishName: String,
  imageUrl: String,
  isPublished: Boolean
});

const Dish = mongoose.model('Dish', dishSchema);

app.get('/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
// res.json(sample);
});

app.post('/toggle-publish/:dishId', async (req, res) => {
    const { dishId } = req.params;
    const dish = await Dish.findOne({ dishId });
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
  });
  

app.listen(3000, () => console.log('Server started on port 3000'));
