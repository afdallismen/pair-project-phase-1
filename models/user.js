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
      beforeBulkCreate:(user, option)=>{
        let salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password,salt)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Restaurant, {foreignKey: 'ownerId'})
    User.hasMany(models.Review, {foreignKey: 'CreatorId' })
  };
  return User;
};