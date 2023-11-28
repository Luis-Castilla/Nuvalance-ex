const rectangleService = require('../services/rectangles-service')
const {
  setResponseWithError,
  setResponseWithOk,
} = require('../utils/common-response')

/**
 * Module Rectangle Controller.
 * @module RectangleController
 */

/**
 * Handles the retrieval of a product by its ID and sends an HTTP response.
 *
 * @function RectangleAnalizer
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} The product data if found.
 * @throws {Error} If the product is not found or an error occurs.
 */
const RectangleAnalizer = (req, res) => {
  try {
    const { rectangleA, rectangleB } = req.body
    const analysisResult = rectangleService.RectanglesAnalizer(
      rectangleA,
      rectangleB
    )
    setResponseWithOk(res, 200, { analysisResult })
  } catch (error) {
    setResponseWithError(res, 500, 'Something when wrong')
  }
}

module.exports = {
  RectangleAnalizer,
}
