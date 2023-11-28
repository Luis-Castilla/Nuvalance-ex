/**
 * Module Rectangles Service.
 * @module RectangleService
 */

/**
 * @typedef {Object} Rectangle
 * @property {number} x - The x-coordinate of the top-left corner of the rectangle.
 * @property {number} y - The y-coordinate of the top-left corner of the rectangle.
 * @property {number} height - The height of the rectangle.
 * @property {number} width - The width of the rectangle.
 */

/**
 * @typedef {Object} Response
 * @property {string} intersectionPoints - The intersection points.
 * @property {string} isContained - If RectangleA or RectangleB is contained within the other
 * @property {string} isAdjacent - If RectangleA is Proper Adjacent, Is Sub-line Adjacent, Is Partial Adjacent or neither to RectangleB
 */

/**
 * Analize Intersection, Containment and Adjacency of two rectangles.
 *
 * @function
 * @param {Rectangle} rectangleA - The initial coordenates of the A rectangle and its height and width.
 * @param {Rectangle} rectangleB - The initial coordenates of the B rectangle and its height and width.
 * @returns {Response} The rectangles analisis results.
 */
const RectanglesAnalizer = (rectangleA, rectangleB) => {
  const response = {
    intersectionPoints: 'There is not intersection',
    isContained: 'Is not Contained',
    isAdjacent: 'Is not Adjacent',
  }
  // eslint-disable-next-line no-useless-catch
  try {
    const isContained = calculateIsContained(rectangleA, rectangleB)
    if (isContained) {
      response.isContained = isContained
      return response
    }

    const intersectionPoints = calculateIntersection(rectangleA, rectangleB)
    if (intersectionPoints) {
      response.intersectionPoints = intersectionPoints
      return response
    }

    const isAdjacent = calculateIsAdjacent(rectangleA, rectangleB)
    if (isAdjacent) {
      response.isAdjacent = isAdjacent
      return response
    }

    return response
  } catch (error) {
    throw new Error()
  }
}

/**
 * Calculates the intersection points of two rectangles.
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {Object|null} The intersection points or null if there is no intersection.
 */
const calculateIntersection = (rectangleA, rectangleB) => {
  const xOverlap = Math.max(
    0,
    Math.min(rectangleA.x + rectangleA.width, rectangleB.x + rectangleB.width) -
      Math.max(rectangleA.x, rectangleB.x)
  )
  const yOverlap = Math.max(
    0,
    Math.min(
      rectangleA.y + rectangleA.height,
      rectangleB.y + rectangleB.height
    ) - Math.max(rectangleA.y, rectangleB.y)
  )

  const intersectionArea = xOverlap * yOverlap

  if (intersectionArea === 0) {
    return null
  } else {
    const intersectionData = {
      x: Math.max(rectangleA.x, rectangleB.x),
      y: Math.max(rectangleA.y, rectangleB.y),
      width: xOverlap,
      height: yOverlap,
    }
    const intersectionPoints = {
      '1st point': { x: intersectionData.x, y: intersectionData.y },
      '2nd point': {
        x: intersectionData.x + intersectionData.width,
        y: intersectionData.y,
      },
      '3rd point': {
        x: intersectionData.x,
        y: intersectionData.y + intersectionData.height,
      },
      '4th point': {
        x: intersectionData.x + intersectionData.width,
        y: intersectionData.y + intersectionData.height,
      },
    }
    return intersectionPoints
  }
}

/**
 * Checks if one rectangle is contained within another.
 *
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {string|null} 'Is Contained' if one rectangle is contained within the other, otherwise null.
 */
const calculateIsContained = (rectangleA, rectangleB) => {
  const x1Contained = rectangleA.x <= rectangleB.x
  const y1Contained = rectangleA.y <= rectangleB.y
  const x2Contained =
    rectangleA.x + rectangleA.width >= rectangleB.x + rectangleB.width
  const y2Contained =
    rectangleA.y + rectangleA.height >= rectangleB.y + rectangleB.height
  const isBInsideA = x1Contained && y1Contained && x2Contained && y2Contained

  const isAInsideB =
    !isBInsideA &&
    rectangleB.x <= rectangleA.x &&
    rectangleB.y <= rectangleA.y &&
    rectangleB.x + rectangleB.width >= rectangleA.x + rectangleA.width &&
    rectangleB.y + rectangleB.height >= rectangleA.y + rectangleA.height
  return isBInsideA || isAInsideB ? 'Is Contained' : null
}

/**
 * Checks the adjacency between two rectangles.
 *
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {string|null} The type of adjacency between the rectangles or null if not adjacent.
 */
const calculateIsAdjacent = (rectangleA, rectangleB) => {
  const checkedProper = checkProperAdjacent(rectangleA, rectangleB)
  if (checkedProper) return checkedProper
  const chekedSubline = checkSublineAdjacent(rectangleA, rectangleB)
  if (chekedSubline) return chekedSubline
  const checkedPartial = checkPartialAdjacent(rectangleA, rectangleB)
  if (checkedPartial) return checkedPartial
  return null
}

/**
 * Checks for proper adjacency between two rectangles.
 *
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {string|undefined} 'Proper Adjacent' if properly adjacent, otherwise undefined.
 */
const checkProperAdjacent = (rectangleA, rectangleB) => {
  const adjacentX =
    (rectangleA.y + rectangleA.height === rectangleB.y &&
      rectangleA.width === rectangleB.width) ||
    (rectangleB.y + rectangleB.height === rectangleA.y &&
      rectangleA.width === rectangleB.width)

  const adjacentY =
    (rectangleB.x + rectangleB.width === rectangleA.x &&
      rectangleA.height === rectangleB.height) ||
    (rectangleA.x + rectangleA.width === rectangleB.x &&
      rectangleA.height === rectangleB.height)

  if (adjacentX || adjacentY) {
    return 'Is Proper Adjacent'
  }
}

/**
 * Checks for sub-line adjacency between two rectangles.
 *
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {string|undefined} 'Is Sub-line Adjacent' if sub-line adjacent, otherwise undefined.
 */
const checkSublineAdjacent = (rectangleA, rectangleB) => {
  const isSublineOnX =
    (rectangleB.y + rectangleB.height <= rectangleA.y &&
      rectangleB.x + rectangleB.width >= rectangleA.x + rectangleA.width &&
      rectangleB.width > rectangleA.width) ||
    (rectangleA.y + rectangleA.width >= rectangleB.y &&
      rectangleA.x + rectangleA.width <= rectangleB.x + rectangleB.width &&
      rectangleB.width > rectangleA.width)

  const isSublineOnY =
    (rectangleB.x + rectangleB.width <= rectangleA.x &&
      rectangleB.y + rectangleB.height >= rectangleA.y + rectangleA.height &&
      rectangleB.height > rectangleA.height) ||
    (rectangleA.x + rectangleA.width <= rectangleB.x &&
      rectangleA.y + rectangleA.height >= rectangleB.y + rectangleB.height &&
      rectangleB.height > rectangleA.height)

  if (isSublineOnX || isSublineOnY) {
    return 'Is Sub-line Adjacent'
  }
}

/**
 * Checks for partial adjacency between two rectangles.
 *
 * @function
 * @param {Object} rectangleA - The initial coordinates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordinates of the B rectangle and its height and width.
 * @returns {string|undefined} 'Is Partial Adjacent' if partially adjacent, otherwise undefined.
 */
const checkPartialAdjacent = (rectangleA, rectangleB) => {
  const isPartialOnX =
    rectangleA.y === rectangleB.y + rectangleB.height ||
    rectangleA.y + rectangleA.height === rectangleB.y
  const isPartialOnY =
    rectangleA.x + rectangleA.width === rectangleB.x ||
    rectangleA.x === rectangleB.x + rectangleB.width
  if (isPartialOnX || isPartialOnY) {
    return 'Is Partial Adjacent'
  }
}
module.exports = {
  RectanglesAnalizer,
}
