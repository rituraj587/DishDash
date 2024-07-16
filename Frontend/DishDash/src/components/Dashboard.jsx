import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './Dashboard.css';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    fetchDishes();

    socket.on('update', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) => (dish.dishId === updatedDish.dishId ? updatedDish : dish))
      );
    });

    return () => {
      socket.off('update');
    };
  }, []);

  const fetchDishes = async () => {
    const response = await axios.get('http://localhost:3000/dishes');
    setDishes(response.data);
  };

  const togglePublish = async (dishId) => {
    await axios.post(`http://localhost:3000/toggle-publish/${dishId}`);
    fetchDishes();
  };

  return (
    <div className="container">
      <h1>Dish Dashboard</h1>
      <div className="row">
        {dishes.map(dish => (
          <div className="col-md-4" key={dish.dishId}>
            <div className="card mb-4">
              <img src={dish.imageUrl} className="card-img-top img-fit" alt={dish.dishName} />
              <div className="card-body">
                <h5 className="card-title">{dish.dishName}</h5>
                <p className="card-text">Published: {dish.isPublished ? 'Yes' : 'No'}</p>
                <button onClick={() => togglePublish(dish.dishId)} className="btn btn-primary">
                  {dish.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
