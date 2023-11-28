/**
 * Module Rectangles Service.
 * @module RectangleService
 */

/**
 * Analize Intersection, Containment and Adjacency of two rectangles.
 *
 * @function RectanglesAnalizer
 * @async
 * @param {Object} rectangleA - The initial coordenates of the A rectangle and its height and width.
 * @param {Object} rectangleB - The initial coordenates of the B rectangle and its height and width.
 * @returns {Promise<Object>} The rectangles analisis results.
 */
const RectanglesAnalizer = async (rectangleA, rectangleB) => {
    const response = {
        intersectionPoints: 'There is not intersection',
        isContained: 'Is not Contained',
        isAdjacent: 'Is not Adjacent',
    }
    // eslint-disable-next-line no-useless-catch
    try {
        const intersectionPoints = calculateIntersection(rectangleA, rectangleB)
        if (intersectionPoints) {
            response.intersectionPoints = intersectionPoints
            return response
        }

        const isContained = calculateIsContained(rectangleA, rectangleB)
        if (isContained) {
            response.isContained = isContained
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

const calculateIntersection = (rectangleA, rectangleB) => {
    const xOverlap = Math.max(
        0,
        Math.min(
            rectangleA.x + rectangleA.width,
            rectangleB.x + rectangleB.width
        ) - Math.max(rectangleA.x, rectangleB.x)
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

const calculateIsAdjacent = (rectangleA, rectangleB) => {
    const checkedProper = checkProperAdjacent(rectangleA, rectangleB)
    if (checkedProper) return checkedProper
    const chekedSubline = checkSublineAdjacent(rectangleA, rectangleB)
    if (chekedSubline) return chekedSubline
    const checkedPartial = checkPartialAdjacent(rectangleA, rectangleB)
    if (checkedPartial) return checkedPartial
    return null
}

const checkProperAdjacent = (rectangleA, rectangleB) => {
    const adjacentX =
        (rectangleA.y + rectangleA.height === rectangleB.y &&
            rectangleA.width === rectangleB.width) ||
        (rectangleB.y + rectangleB.height === rectangleA.y &&
            rectangleA.width === rectangleB.width)

    const adjacentY =
        (rectangleB.x + rectangleB.width === rectangleA.x &&
            rectangleA.width === rectangleB.width) ||
        (rectangleA.x + rectangleA.width === rectangleB.x &&
            rectangleA.width === rectangleB.width)

    if (adjacentX || adjacentY) {
        return 'Proper Adjacent'
    }
}

const checkSublineAdjacent = (rectangleA, rectangleB) => {
    const isSublineOnX =
        (rectangleB.y + rectangleB.height <= rectangleA.y &&
            rectangleB.x + rectangleB.width >=
                rectangleA.x + rectangleA.width &&
            rectangleB.width > rectangleA.width) ||
        (rectangleA.y + rectangleA.width >= rectangleB.y &&
            rectangleA.x + rectangleA.width <=
                rectangleB.x + rectangleB.width &&
            rectangleB.width > rectangleA.width)

    const isSublineOnY =
        (rectangleB.x + rectangleB.width <= rectangleA.x &&
            rectangleB.y + rectangleB.height >=
                rectangleA.y + rectangleA.height &&
            rectangleB.height > rectangleA.height) ||
        (rectangleA.x + rectangleA.width <= rectangleB.x &&
            rectangleA.y + rectangleA.height >=
                rectangleB.y + rectangleB.height &&
            rectangleB.height > rectangleA.height)

    if (isSublineOnX || isSublineOnY) {
        return 'Is Sub-line Adjacent'
    }
}

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
