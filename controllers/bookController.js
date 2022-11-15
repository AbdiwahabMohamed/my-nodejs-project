const asyncHandler = require('express-async-handler')
const { Book, validateCreateBook,validateUpdateBook} = require('../Models/Book')




/**
 *  @desc    Get all books
 *  @route   /api/books
 *  @method  GET
 *  @access  public
 */

const getAllBooks = asyncHandler(
    async (req, res) => {
      const { minPrice,maxPrice } = req.query
      let book
      // comparison query operator
      // $eq equal
      // $ne not eqaul
      // $lt less than  
      // lte less than and equal
      if( minPrice && maxPrice) {
        book = await Book.find({price: {$gte: minPrice, $lte: maxPrice}})
        .populate('author', ['_id','fullName'])
         //.sort({fullName: 1}).select('fullName -_id')
      } else {
       book = await Book.find().populate('author', ['_id','fullName'])
      }
      
         res.status(200).json(book);
      } 
  )
/**
 *  @desc    Get book by id
 *  @route   /api/books/:id
 *  @method  GET
 *  @access  public
 */

  const getBooksById = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id)
      if(book) {
       res.status(200).json(book)
      }else {
       res.status(404).json({message: 'Book not found'})
      }
      } 
  )

  /**
 *  @desc    Create new book
 *  @route   /api/books
 *  @method  POST
 *  @access  private (only admin)
 */
  const createBook = asyncHandler(
    async (req, res) => {
      const { error } = validateCreateBook(req.body)
    
      if(error) {
        return res.status(400).json({ message: error.details[0].message }) // error
      }
      
        const book = new Book ({
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        })
        
       const result = await book.save()
        res.status(201).json(result)
      
      }
   )

   /**
 *  @desc    Update a book
 *  @route   /api/books/:id
 *  @method  PUT
 *  @access  private (only admin)
 */
   const updateBook = asyncHandler(
    async (req, res) => {
      const { error } = validateUpdateBook(req.body)
    
      if(error) {
        return res.status(400).json({ message: error.details[0].message }) // error
      }
  
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
          $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
          }
        }, { new: true}) // Already it give you
        res.status(200).json(updatedBook)
      } 
  )

     /**
     *  @desc    Delete a book
     *  @route   /api/books/:id
     *  @method  DELETE
     *  @access  private (only admin)
     */
      const deleteBook = asyncHandler(
        async (req, res) => {
            const book = await Book.findById(req.params.id)
      
            if(book) {
              const book = await Book.findByIdAndDelete()
              res.status(200).json({ message: 'Book has been deleted' })
            } else { 
              res.status(404).json({ message: 'Book not found' })
            }
          })


  module.exports = {
    getAllBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook
  }