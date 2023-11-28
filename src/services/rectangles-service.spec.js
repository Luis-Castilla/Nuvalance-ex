const mockery = require('mockery');
const chai = require('chai');

const expect = chai.expect;


describe('Rectangles Services Test', () => {
    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
      });
    it('Intersection Points', () => {
        const expectedResponse = {
            intersectionPoints: {
                "1st point": {"x": 2, "y": 3},
                "2nd point": {"x": 4, "y": 3},
                "3rd point": {"x": 2, "y": 4},
                "4th point": {"x": 4, "y": 4},
            },
            isContained: 'Is not Contained',
            isAdjacent: 'Is not Adjacent',

        }
        const rectangleA = {
            "x":2,
            "y": 2,
            "height": 2,
            "width": 2
        }
        const rectangleB = {
            "x": 0,
            "y": 3,
            "height": 3,
            "width": 4
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })

    it('Is Contained', () => {
        const expectedResponse = {
            intersectionPoints: 'There is not intersection',
            isContained: 'Is Contained',
            isAdjacent: 'Is not Adjacent',

        }
        const rectangleA = {
            "x":1,
            "y": 3,
            "height": 2,
            "width": 2
        }
        const rectangleB = {
            "x": 0,
            "y": 3,
            "height": 3,
            "width": 4
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })

    it('Proper Adjacent', () => {
        const expectedResponse = {
            intersectionPoints: 'There is not intersection',
            isContained: 'Is not Contained',
            isAdjacent: 'Is Proper Adjacent',

        }
        const rectangleA = {
            "x": 6,
            "y": 5,
            "height": 1,
            "width": 2
        }
        const rectangleB = {
            "x": 1,
            "y": 5,
            "height": 1,
            "width": 5
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })

    it('Sub-line Adjacent', () => {
        const expectedResponse = {
            intersectionPoints: 'There is not intersection',
            isContained: 'Is not Contained',
            isAdjacent: 'Is Sub-line Adjacent',

        }
        const rectangleA = {
            "x": 6,
            "y": 5,
            "height": 1,
            "width": 2
        }
        const rectangleB = {
            "x": 1,
            "y": 5,
            "height": 2,
            "width": 5
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })

    it('Partial Adjacent', () => {
        const expectedResponse = {
            intersectionPoints: 'There is not intersection',
            isContained: 'Is not Contained',
            isAdjacent: 'Is Partial Adjacent',

        }
        const rectangleA = {
            "x": 6,
            "y": 5,
            "height": 4,
            "width": 2
        }
        const rectangleB = {
            "x": 1,
            "y": 5,
            "height": 2,
            "width": 5
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })

    it('No relation between rectangles', () => {
        const expectedResponse = {
            intersectionPoints: 'There is not intersection',
            isContained: 'Is not Contained',
            isAdjacent: 'Is not Adjacent',

        }
        const rectangleA = {
            "x": 7,
            "y": 6,
            "height": 4,
            "width": 2
        }
        const rectangleB = {
            "x": 1,
            "y": 5,
            "height": 2,
            "width": 5
        }
        const { RectanglesAnalizer } = require('./rectangles-service');
        const response = RectanglesAnalizer(rectangleA, rectangleB);
        expect(response).deep.equal(expectedResponse);
    })
 })