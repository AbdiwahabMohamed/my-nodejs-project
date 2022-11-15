const asyncHandler = require('express-async-handler')
const { Author,validateCreateAuthor,validateUpdateAuthor } = require('../Models/Authors')



/**
 *  @desc    Get all authors
 *  @route   /authors
 *  @method  GET
 *  @access  public
 */


const getAllAuthors = asyncHandler(
    async (reg, res) => {
      const { pageNumber } = req.query
      const authorPerPage = 2
       const authorList = await Author.find()
                                      .skip((pageNumber - 1 ) * authorPerPage)
                                      .limit(authorPerPage)
       //.sort({fullName: 1}).select('fullName -_id')
         res.status(200).json(authorList);
      } 
  )

/**
 *  @desc    Get authors by id
 *  @route   /authors
 *  @method  GET
 *  @access  public
 */

  const getAllAuthorsByID = asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id)
      if(author) {
       res.status(200).json(author)
      }else {
       res.status(404).json({message: 'author not found'})
      }
      } 
  )

  /**
 *  @desc    Create new author
 *  @route   /authors
 *  @method  POST
 *  @access  private (only admin)
 */

  const createAuthor = asyncHandler(
    async (req, res) => {
      const { error } = validateCreateAuthor(req.body)
    
      if(error) {
        return res.status(400).json({ message: error.details[0].message }) // error
      }
      
        const author = new Author ({
          fullName: req.body.fullName,
          nationality: req.body.nationality,
          image: req.body.image
        })
        
       const result = await author.save()
        res.status(201).json(result)
      
      }
   )

   /**
 *  @desc    Update author
 *  @route   /author/:id
 *  @method  PUT
 *  @access  private (only admin)
 */


   const updateAuthor = asyncHandler(
    async (req, res) => {
      const { error } = validateUpdateAuthor(req.body)
    
      if(error) {
        return res.status(400).json({ message: error.details[0].message }) // error
      }
  
        const author = await Author.findByIdAndUpdate(req.params.id, {
          $set: {
          fullName: req.body.fullName,
          nationality: req.body.nationality,
          image: req.body.image
          }
        }, { new: true}) // Already it give you
        res.status(200).json(author)
      } 
  )

  /**
     *  @desc    Delete author
     *  @route   /authors/:id
     *  @method  DELETE
     *  @access  private (only admin)
     */

  const deleteAuthor = asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id)

        if(author) {
          const author = await Author.findByIdAndDelete()
          res.status(200).json({ message: 'author has been deleted' })
        } else { 
          res.status(404).json({ message: 'author not found' })
        }
      })



      module.exports = {
        getAllAuthors,
        getAllAuthorsByID,
        createAuthor,
        updateAuthor,
        deleteAuthor
      }