

let express = require('express')
let Sequelize = require('sequelize')
//fetches whatever index.js exports
let db = require('../models')
//reference to student model
let Student = db.Student

// matches requests to functions that can respond to them
let router = express.Router()

// .get is used for fetching data
router.get('/students', function(req, res, next){
    // function acting on Student object, return a promise
    //sorting using order: [whatever you want to sort by]
    Student.findAll( {order: ['starID']} ).then( students => {
        // return json data
        return res.json(students)
    }).catch( err => next(err))
})


router.post('/students', function(req, res, next){
    // used to create new Student object, req.body contains any data that the vue client has sent in the request
    Student.create(req.body).then( (data) => {
        // return status response. Something has to be sent back, status code 201 means all good
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            // 400 = bad request from user
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next){
    //Students.update is a sequelize method
    // id: req.params.id is equal to the /:id on the line above
    Student.update( req.body, { where: { id: req.params.id } })
        .then( rowsModified => {
            if (!rowsModified[0]) {
                //404 = not found, student with this ID not found
                return res.status(404).send('Not found')
            } else {
                return res.send('ok')
            }
        }).catch( err => {
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                //400 = bad request from user
                return res.status(400).json(messages)
            }
            return next(err)
    })
})

router.delete('/students/:id', function(req, res, next){
    //student.destroy with no argument will delete entire database
    Student.destroy({where: { id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        }).catch( err => next(err))
})


module.exports = router