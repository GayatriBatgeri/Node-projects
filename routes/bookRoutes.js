const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");
router.route("/").get(getBooks).post(addBook);
router.route("/:Id").get(getBook).put(updateBook).delete(deleteBook);
module.exports = router;
