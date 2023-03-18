const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  
  app.use(express.json());
  
  app.post('/api/Users', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
   
    try {
      const newUser = await prisma.user.create({
        data: {
          FirstName: firstname,
          LastName: lastname,
          Email: email,
          Password: password,
          LoggedIn: false
        }
      });
      console.log(newUser); // Add this line to log the newUser object
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
/**
  const express = require('express')
  const router = express.Router()
  const { createUser } = require('./Users')
  
  router.post('/users', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const newUser = await createUser(firstName, lastName, email, password)
    res.json(newUser)
  })
  
  module.exports = router
*/