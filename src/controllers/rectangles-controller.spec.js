const { expect } = require('chai');
const sinon = require('sinon');
const { RectangleAnalizer } = require('./rectangles-controller');
const rectangleService = require('../services/rectangles-service');

describe('Rectangle Controller', () => {
  it('should return analysis result with OK response', async () => {
    const req = {
      body: {
        rectangleA: {},
        rectangleB: {}
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    const mockAnalysisResult = {
      intersectionPoints: 'There is not intersection',
      isContained: 'Is Contained',
      isAdjacent: 'Is not Adjacent',
    };

    sinon.stub(rectangleService, 'RectanglesAnalizer').returns(mockAnalysisResult);

    RectangleAnalizer(req, res);

    expect(rectangleService.RectanglesAnalizer.calledOnce).to.be.true;
    expect(rectangleService.RectanglesAnalizer.calledWith(req.body.rectangleA, req.body.rectangleB)).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ analysisResult: mockAnalysisResult })).to.be.true;

    rectangleService.RectanglesAnalizer.restore();
  });

  it('should return analysis result with ERROR response', async () => {
    const req = {
      body: {
        rectangleA: {},
        rectangleB: {}
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    sinon.stub(rectangleService, 'RectanglesAnalizer').throws(new Error('Somehitng went a little too bad'));

    RectangleAnalizer(req, res);

    expect(rectangleService.RectanglesAnalizer.calledOnce).to.be.true;
    expect(rectangleService.RectanglesAnalizer.calledWith(req.body.rectangleA, req.body.rectangleB)).to.be.true;

    expect(res.status.calledWith(500)).to.be.true;

    rectangleService.RectanglesAnalizer.restore();
  });
});