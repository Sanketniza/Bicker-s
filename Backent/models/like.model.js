const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  type: {
    type: String,
    enum: ['like', 'dislike'],
    required: true,
  },
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);
