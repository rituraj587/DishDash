import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
// import 'bootstrap/dist/css/bootstrap.min.css';




const Dashboard = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
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
