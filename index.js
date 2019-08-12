const express = require('express');
const server = express();
const db = require('./data/db')

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then (posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error:  "The posts information could not be retrieved." 
            })
        })
})

server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
        if (!title || !contents) {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post." 
            })
        }
        else {
            db.add(req.body)
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    res.status(500).json({
                        error: "There was an error while saving the post to the database" 
                    })
                })
        }
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(post => {
            if (post){
                res.status(200).json({post});
            }
            else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const {title, contents} = req.body;
    
    if (!title || !contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post." 
        })
    }
    else{
        posts.update(req.params.id, req.body)
        .then(post => {
            if(post){
                res.status(200).json(post);
            }
            else{
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const {id}= req.params;

    db.remove(id)
        .then(deletedPost => {
            if (deletedPost) {
                res.status(200).json({
                    message: 'Post deleted'
                })
            }
            else{
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be removed" 
            })
        })
    
})