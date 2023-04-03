const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// A User model class that extends the Sequelize Model class
class User extends Model {

  checkPassword(loginPw) { // Create a custom method to check if a given password matches the hashed password stored in the database
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Defines the User model attributes and their data types, along with any additional constraints
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7,], // password must be atleast length of 7
      },
    },
  },
  {
    hooks: { // Add hooks to hash the user's password before creating or updating the user data in the database
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
