/**
 * @swagger
 * tags:
 *   name: Rectangles
 *   description: API endpoints for rectangles analysis
 */

/**
 * @swagger
 * /api/v1/rectangles:
 *   post:
 *     summary: Route to retrieve rectangles analysis.
 *     tags: [Rectangles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rectangleA:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *                   height:
 *                     type: number
 *                   width:
 *                     type: number
 *               rectangleB:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *                   height:
 *                     type: number
 *                   width:
 *                     type: number
 *             required:
 *               - rectangleA
 *               - rectangleB
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analysisResult:
 *                   type: object
 *                   properties:
 *                     intersectionPoints:
 *                       type: string
 *                     isContained:
 *                       type: string
 *                     isAdjacent:
 *                       type: string
 *       '500':
 *         description: Internal Server Error
 */