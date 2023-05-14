/**
 *  @swagger
 *  components:
 *    schemas:
 *      Movies:
 *        type: object
 *        required:
 *          - title
 *          - genre
 *          - year
 *        properties:
 *          id:
 *            type: integer
 *            description: sebagai primary key
 *          title:
 *            type: string
 *            description: untuk memberi nama judul film
 *          genre:
 *            type: string
 *            description: untuk memberi nama judul genre
 *          year:
 *            type: string
 *            description: untuk memberi kapan terbit film
 *        example:
 *          id: 1
 *          title: Titanic
 *          genre: Romance
 *          year: 2001
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing api
 * /movies:
 *   post:
 *     summary: Create a new Movies
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         description: The created movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some Server Error
 * /movies/{id}:
 *   get:
 *     summary: Get the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       404:
 *         description: the movie was not found
 *   put:
 *    summary: Update the movie by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The movies was updated
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The movies was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *    summary: delete the movie by the id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the movie id
 * 
 *    responses:
 *      200:
 *        description: The movies was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The movies was not found
 *      500:
 *        description: Some error happened
 */    

const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  getAllMovies,
  getByIdMovies,
  createMovies,
  updateMovies,
  deleteMovies,
} = require("./controller");

router.get("/movies", auth, getAllMovies);
router.get("/movies/:id", auth, getByIdMovies);
router.post("/movies", auth, createMovies);
router.put("/movies/:id", auth, updateMovies);
router.delete("/movies/:id", auth, deleteMovies);

module.exports = router;
