const express = require('express')
const router = express.Router()
const productController = require('../controllers/rectangles-controller')

/**
 * Module Routes.
 * @module Routes
 */

/**
 * Route to retrieve rectanlges analysis.
 * @name POST /api/v1/rectangles
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/rectangles', (req, res) => {
  productController.RectangleAnalizer(req, res)
})

module.exports = router
