const BooksModel = require('../models/books.model');
const express = require('express');
const router = express.Router();

// Create a bew customer , POST => localhost:8080/books
router.post('/books',(req,res)=>{
    // req.body
    if(!req.body) return res.status(400).send('Request body is missing');

    if(!req.body.isbn){
        // ...
    }

    let model = new BooksModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length ===0){
            return res.status(500).send(doc);
        }
        res.status(200).send(doc);
    })
    .catch(err=>{
        res.status(500).json(err);
    })


});

router.get('/books', (req,res)=>{
    if(!req.query.isbn) return res.status(400).send('Missing URL parameter: isbn');

    BooksModel.findOne({isbn: req.query.isbn})
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/books', (req,res)=>{
    if(!req.query.isbn) return res.status(400).send('Missing URL parameter: isbn');

    BooksModel.findOneAndUpdate({
        isbn: req.query.isbn
    }, req.body, {
        new :true
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.delete('/books', (req,res)=>{
    if(!req.query.isbn) return res.status(400).send('Missing URL parameter: isbn');

    BooksModel.findOneAndRemove({
        isbn: req.query.isbn
    }, req.body)
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

module.exports = router;