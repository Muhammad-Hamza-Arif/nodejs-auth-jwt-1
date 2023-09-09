const movieModel = require('../models/movies'); // Import your movie model

const getById = async (req, res, next) => {
  try {
    const movieInfo = await movieModel.findById(req.params.movieId);
    res.json({ status: "success", message: "Movie found!!!", data: { movies: movieInfo } });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const movies = await movieModel.find({});
    const moviesList = movies.map(movie => ({
      id: movie._id,
      name: movie.name,
      released_on: movie.released_on,
      seats: movie.seats,
      price: movie.price
    }));
    res.json({ status: "success", message: "Movies list found!!!", data: { movies: moviesList } });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  console.log("hello >>>>>>",req.body);
  try {
    await movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name, released_on: req.body.released_on });
    // const movies = await movieModel.find({});
    // const moviesList = movies.map(movie => ({
    //   id: movie._id,
    //   name: movie.name,
    //   released_on: movie.released_on
    // }));
    res.json({ status: "success", message: "Movie updated successfully!!!",  data: null });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await movieModel.findByIdAndRemove(req.params.movieId);
    
    res.json({ status: "success", message: "Movie deleted successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newMovie = {
      name: req.body.name,
      released_on: req.body.released_on,
      seats: req.body.seats,
      price: 100

    };
    console.log("movie", newMovie)
    await movieModel.create(newMovie);
    res.json({ status: "success", message: "Movie added successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  getAll,
  updateById,
  deleteById,
  create
};
