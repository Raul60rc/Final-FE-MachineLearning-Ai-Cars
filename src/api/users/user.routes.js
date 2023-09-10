const express = require("express");
const User = require("./users.model.js");
const { DELETE, UPDATE, READ } = require("sequelize/types/query-types");
const jwt = require("jsonwebtoken");


Router.post('/login',async (req,res) =>{
  const {username, password} = req.body;

  if (username === "your_username" && password === "your_password"){
    const token = jwt.sign({username}, jwtSecret, {expiresIn :'7d'});
    res.json({token});

  }else {
    res.status(401).json({error: "Authentication failed"});
  }
});