const express = require('express')
const router = express.Router()
const { getAllAuthors, getAllAuthorsByID,createAuthor, updateAuthor,deleteAuthor } 
= require('..//controllers/authorController')
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')


router.route("/").get(getAllAuthors).post( verifyTokenAndAdmin, createAuthor)

  router.route("/:id")
  .get(getAllAuthorsByID)
  .put( verifyTokenAndAdmin, updateAuthor)
  .delete(deleteAuthor)


  module.exports = router
