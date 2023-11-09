const Book = require("../model/bookModel");
const asynchandler = require("express-async-handler");
//desc GET all books
//@route GET books/
//@access public

const getBooks = asynchandler(async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//desc GET a single book
//route GET books/:id
//@access public
const getBook = asynchandler(async (req, res) => {
  const bookId = req.params.Id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ error: "Book with entered id couldn't be found" });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//desc Create a new record
//route POST books/
//@access public

const addBook = asynchandler(async (req, res) => {
  const { Title, Author, Genre, Publication_year } = req.body;
  try {
    const newBook = await Book.create({
      Title,
      Author,
      Genre,
      Publication_year,
    });
    res.status(201).json({
      message: "Book added Successfullly 😀!!",
      book: newBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//desc update
//route PUT books/:id
//access public

const updateBook = asynchandler(async (req, res) => {
  const bookId = req.params.Id;
  const { Title, Author, Genre, Publication_year } = req.body;

  try {
    const [updatedRowsCount] = await Book.update(
      { Title, Author, Genre, Publication_year },
      { where: { Id: bookId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Book not found 😓..." });
    }

    res.json({ message: "Book updated successfully 😀..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//desc delete
//route DELETE /:id
//@access public
const deleteBook = asynchandler(async (req, res) => {
  const bookId = req.params.Id;

  try {
    const deletedRowsCount = await Book.destroy({ where: { Id: bookId } });

    if (deletedRowsCount === 0) {
      return res.json({ error: "Book not found 😔.." });
    }

    res.json({ message: "Book deleted Successfully 😃!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};
