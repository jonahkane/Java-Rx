const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const drinkSchema = new Schema({
  drinkTitle: {
    type: String,
    required: 'What kind of coffee drink do you like?',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  drinkIngredients: {
    type: Array,
    required: true,
    trim: true,
  },
  drinkInstructions: {
    type: Array,
    required: true,
    trim: true,
  },
  
  drinkAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
