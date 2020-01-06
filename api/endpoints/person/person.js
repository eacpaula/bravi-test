"use strict";

const mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const personSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  contacts: [contactSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = personSchema;