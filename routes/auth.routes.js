const { Router } = require('express')
const bcryptPass = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// Register
router.post('/register',
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Password must have min. 8 characters').isLength( {min: 8} )
    ],
    async (req, res) => {

        try {
            
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Email or password is not correct'
                })
            }

            const {email, password} = req.body

            const newUser = await User.findOne({ email })

            if(newUser) {
            return res.status(400).json({ message: `User with email ${email} already exists.` })
            }

            const hashedPass = await bcryptPass.hash(password, 12)
            console.log('hashedPass', hashedPass)

            const user = new User({
                email,
                password: hashedPass
            })
            await user.save()

            res.status(201).json({ message: `User with email ${email} has been created.` })

        } catch (e) {
            res.status(500).json({ message: 'Somthing is wrong...Please try again!'})
        }

}) 

// Login

router.post('/login',
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Password is not correct').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
    
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Email or password is not correct'
                })
            }
    
            const {email, password} = req.body
    
            const user = await User.findOne({ email })
            
                if(!user) {
                    return res.status(400).json({message: `User with email ${email} is not created.`})
                } 
            const rightPass = await bcryptPass.compare(password, user.password)
            
                if (!rightPass) {
                    return res.status(400).json({message: `Password is not correct! Please try again.`})
                }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            console.log('token', token)

            res.json({ token, userId: user.id })
    
        } catch (e) {
            res.status(500).json({ message: 'Somthing is wrong...Please try again!'})
        }

}) 

module.exports = router