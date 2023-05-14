const { Movies } = require("../../db/models");

module.exports = {

  getAllMovies: async (req, res, next) => {
    try {
      const movies = await Movies.findAll({
        attributes: ["id", "title", "genre", "year"],

        offset: req.query.page,
        limit: req.query.size,
      });
      const movieCount = await Movies.count();

      res.status(200).json({
        message: "Success Mendapatkan semua data movies",
        data: movies,
        meta: {
          page: req.query.page,
          count: movieCount,
          size: movies.length,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getByIdMovies: async (req, res, next) => {
    try {
      const { id } = req.params;
      const movies = await Movies.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "title", "genre", "year"],
      });

      res.status(200).json({
        message: "Success Mendapatkan data movies berdasarkan kategori",
        data: movies,
      });
    } catch (err) {
      next(err);
    }
  },

  createMovies: async (req, res, next) => {
    try {
      const { title, genre, year } = req.body;

      const movies = await Movies.create({
        title: title,
        genre: genre,
        year: year,
      });

      res.status(201).json({
        message: "Success tambah data movies",
        data: movies,
      });
    } catch (err) {
      next(err);
    }
  },

  updateMovies: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, genre, year } = req.body;
      const checkMovies = await Movies.findOne({
        where: {
          id: id,
        },
      });

      const movies = await checkMovies.update({
        title: title,
        genre: genre,
        year: year,
      });
      res.status(200).json({
        message: "Success Update data movies",
        data: movies,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteMovies: (req, res, next) => {
    Movies.findOne({
      where: { id: req.params.id },
    })
      .then((movies) => {
        if (movies) {
          movies.destroy();

          res.status(200).json({
            message: "Success hapus movies",
            data: movies,
          });
        }
      })
      .catch((err) => next(err));
  },
};
