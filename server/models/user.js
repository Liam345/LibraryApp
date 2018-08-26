'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    stripeCustomerId:{
      type: DataTypes.STRING,
      allowNull: true,
      unique:true
    }
    }, {});

    User.associate = function(models) {
      User.hasMany(models.Address,{
        foreignKey:'userId',
        as:'addresses'
      })
      //when querying for user address's we can query by addresses
      //instead of Sequelize default i.e.Addresses
      User.hasMany(models.Order,{
        foreignKey:'userId',
        as:'orders'
      })
  };

  

  /**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
  User.prototype.comparePassword = function comparePassword(password,callback){
    bcrypt.compare(password,this.password,callback);
  }

//Instance methods
// User.prototype.generateHash = function(password){
//   return bcrypt.hash(password,bcrypt.genSaltSync(8));
// }

//   User.prototype.validPassword = function(password){
//       return bcrypt.compare(password, this.password);
//   }

/**
 * The before-create hook method to generate and save hash.
 */
  // User.hook('beforeCreate',(user,options)=>{
  //   // proceed further only if the user is new or the password is modified
  //   if(!user.changed()) return next();
  //   return bcrypt.genSalt((saltError,salt)=>{
  //     if (saltError) {return next(saltError);}
  //     return bcrypt.hash(user.password,salt,(hashError,hash)=>{
  //       if (hashError) {return next(hashError);}
  //       //replace password string with hash value
  //       user.password = hash;
  //       //hooks are called in an async fashin. So you need to call completion
  //       //promise once you are done. Otherwise would not store it in the database
  //       return next();
  //     })
  //   }) 
  // });

  /*
  Todo- Bad idea to use Hash Sync for performance. See Link
  https://news.ycombinator.com/item?id=11120279 
  */
  User.hook('beforeCreate',(user,options)=>{
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
  })

  return User;
};