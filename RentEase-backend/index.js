require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { signup, login } = require('./controllers/authUser');
const {ownerSignup,ownerLogin}=require('./controllers/authOwner');
const app = express();
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.post('/usersignup', signup);
app.post('/userlogin', login);
app.post('/ownersignup', ownerSignup);
app.post('/ownerlogin', ownerLogin);

const PORT =8080;
app.listen(PORT, () => console.log(`Server running on port`));
