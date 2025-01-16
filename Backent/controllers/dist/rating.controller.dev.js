"use strict";

var Rating = require('../models/rating.model'); // const Product = require('../models/product.model');


exports.addRating = function _callee(req, res) {
  var _req$body, productId, userId, rating, existingRating, rate;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, productId = _req$body.productId, userId = _req$body.userId, rating = _req$body.rating; // Check if the user already rated the product

          _context.next = 4;
          return regeneratorRuntime.awrap(Rating.findOne({
            productId: productId,
            userId: userId
          }));

        case 4:
          existingRating = _context.sent;

          if (!existingRating) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: 'You have already rated this product.'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Rating.create({
            productId: productId,
            userId: userId,
            rating: rating
          }));

        case 9:
          rate = _context.sent;
          res.status(201).json({
            success: true,
            message: 'Rating added successfully.',
            // rating: rate,
            rate: rate
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getAverageRating = function _callee2(req, res) {
  var productId, ratings, averageRating;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          productId = req.params.productId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Rating.find({
            productId: productId
          }));

        case 4:
          ratings = _context2.sent;

          if (!(ratings.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            success: true,
            averageRating: 0,
            message: 'No ratings for this product.'
          }));

        case 7:
          // rating in one decimal like 3.3 
          averageRating = ratings.reduce(function (sum, rating) {
            return sum + rating.rating;
          }, 0) / ratings.length;
          res.status(200).json({
            success: true,
            averageRating: averageRating.toFixed(1) // Rounded to one decimal place

          });
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getRatingsByProduct = function _callee3(req, res) {
  var productId, ratings;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          productId = req.params.productId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Rating.find({
            productId: productId
          }));

        case 4:
          ratings = _context3.sent;
          res.status(200).json({
            success: true,
            ratings: ratings
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.updateRating = function _callee4(req, res) {
  var _req$body2, ratingId, userId, rating, ratingToUpdate;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, ratingId = _req$body2.ratingId, userId = _req$body2.userId, rating = _req$body2.rating;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Rating.findOne({
            _id: ratingId,
            userId: userId
          }));

        case 4:
          ratingToUpdate = _context4.sent;

          if (ratingToUpdate) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: 'Rating not found or you are not authorized to update it.'
          }));

        case 7:
          ratingToUpdate.rating = rating || ratingToUpdate.rating;
          _context4.next = 10;
          return regeneratorRuntime.awrap(ratingToUpdate.save());

        case 10:
          res.status(200).json({
            success: true,
            message: 'Rating updated successfully.',
            rating: ratingToUpdate
          });
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.deleteRating = function _callee5(req, res) {
  var _req$body3, ratingId, userId, ratingToDelete, productId, ratings, averageRating;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body3 = req.body, ratingId = _req$body3.ratingId, userId = _req$body3.userId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Rating.findOne({
            _id: ratingId,
            userId: userId
          }));

        case 4:
          ratingToDelete = _context5.sent;

          if (ratingToDelete) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: 'Rating not found or you are not authorized to delete it.'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(ratingToDelete.remove());

        case 9:
          // updata the average rating
          productId = ratingToDelete.productId;
          _context5.next = 12;
          return regeneratorRuntime.awrap(Rating.find({
            productId: productId
          }));

        case 12:
          ratings = _context5.sent;
          averageRating = ratings.reduce(function (sum, rating) {
            return sum + rating.rating;
          }, 0) / ratings.length;
          _context5.next = 16;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: productId
          }, {
            $set: {
              averageRating: averageRating
            }
          }));

        case 16:
          res.status(200).json({
            success: true,
            message: 'Rating deleted successfully.'
          });
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            success: false,
            message: _context5.t0.message
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
};