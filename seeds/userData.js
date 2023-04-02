const { User } = require('../models');

const userdata = [
  {
    username: "Gabriel",
    email: "gabe@gmail.com",
    password: "321password",
  },
  {
    username: "Jeff",
    email: "jeff@gmail.com",
    password: "mynameisjeff",
  },
  {
    username: "Olana",
    email: "olana@hotmail.com",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;