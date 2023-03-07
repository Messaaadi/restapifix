const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
mongoose.set("strictQuery", false);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
 
// connect to the database
let connection = "mongodb+srv://IlyesJad:Azerty147+@cluster0.q5slz96.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// create a new user
const user = new User({
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password',
});
user.save()
.then(() => {
  console.log('User created successfully');
})
.catch((error) => {
  console.error('Error creating user:', error);
});
const user2 = new User({
    name: 'Elyes Jad',
    email: 'elyes.jad@gmail.com',
    password: 'helloworld',
  });
  user2.save()
  .then(() => {
    console.log('User created successfully');
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });
  // define routes
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
