const express = require('express')
const router = express.Router()
const {  verifyTokenAndAdmin } = require('../middleware/verifyToken')
const { getAllBooks, getBooksById, createBook, updateBook, deleteBook }
 = require("../controllers/bookController")


 
// /books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// /books/:id
router
  .route("/:id")
  .get(getBooksById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);


module.exports = router