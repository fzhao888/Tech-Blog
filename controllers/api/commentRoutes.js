const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:postid', async (req, res) => { 
    try { 
        const commentData = await Comment.create({
            ...req.body,
            blogpost_id: req.params.postid,            
            user_id: req.session.user_id
        });
     
        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;