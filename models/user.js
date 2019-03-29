'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      validate:{
        isUnique(){
          return User.findAll()
          .then(data=>{
            data.forEach(element=>{
              if(element.username==this.username){
                throw new Error ('Email sudah ada')
              }
            })
          })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(user, option)=>{
        let salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password,salt)
      },
      beforeSave:(user, option)=>{
        let salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password,salt)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Restaurant, {foreignKey: 'ownerId'})
    User.hasMany(models.Review, {foreignKey: 'CreatorId' })

    // models.User.belongsToMany(models.Restaurant, {through: Review, foreignKey: 'CreatorId' })
  };
  return User;
};