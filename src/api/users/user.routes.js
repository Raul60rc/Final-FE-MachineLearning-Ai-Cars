const express = require("express");
const User = require("./users.model.js");
const { DELETE, UPDATE, READ } = require("sequelize/types/query-types");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../../middlewares/authenticateJwt.js");

const router = express.Router();

router.post('/login', async (req,res) =>{
  const {username,password} = req.body;

  try{
    const user = await User.findOne({where: {username}});
    if (!user || user.password !== password){
      return res.status(401).json({error: "Authentication failed"});
    }
    const token = jwt.sign({id: user.id, username: user.username}, jwtSecret, {expiresIn: '7d'});
    res.json({token});
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;

