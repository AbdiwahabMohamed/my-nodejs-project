const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const { User, validateUpdateUser} = require('../Models/User')

/**
 *  @desc    Get all Users
 *  @route   /User
 *  @method  GET
 *  @access  private (only admin & user himself)
 */


 module.exports.getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password')
      res.status(200).json(users)
    } 
  )

/**
 *  @desc    Get Users By Id
 *  @route   /Users
 *  @method  GET
 *  @access  private (only admin & user himself)
 */

 module.exports.getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: 'User not found'})
      }
    } 
    )

/**
 *  @desc    Get all books
 *  @route   /Users
 *  @method  PUT
 *  @access  private (only admin)
 */

 module.exports.updateUser = asyncHandler( async (req, res) => {
    const { error } = validateUpdateUser(req.body)
    if(error) {
      return res.status(400).json({ message: error.details[0].message }) // error
    }
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          email: req.body.email,
          password: req.body.password,
          userName: req.body.userName,
        }
      }, { new: true}).select('-password') // Already it give you
      res.status(200).json(updatedUser)
    } 
)

/**
 *  @desc    Delete user
 *  @route   /Users
 *  @method  delete
 *  @access  private (only admin & user himself)
 */
  

 module.exports.deleteUser =  asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
      if(user) {
     const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'User has been deleted successfully' })
      } else {
        res.status(404).json({message: 'User not found'})
      }
    } 
  )

  