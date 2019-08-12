const router = express.Router();
const PostsRouter = require('./posts-router');

router.get('/', (req, res) => {
    db.find()
        .then (posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error:  "The post information could not be retrieved." 
            })
        })
})

router.post('/', (req, res) => {
    const {title, contents} = req.body;
        if (!title || !contents) {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post." 
            })
        }
        else {
            db.insert(req.body)
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

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.get('/:id/comments', (req, res) => {
    db.findPostComments()
    .then(comments => {
        res.status(200).json(comments);
    })
    .catch(err => 
        res.status(500).json({
            errorMessage: 'The comment could not be retrieved.'
        }))
})

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment." 
        })
    }
    else {
        db.insertComment(req.body) 
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(err => {
                res.status(500).json({
                    error: "There was an error while saving the comment to the database" 
                })
            })
    }
})