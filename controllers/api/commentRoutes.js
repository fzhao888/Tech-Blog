const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            blogPost_id: req.params.id,            
            user_id: req.session.user_id
        });
     
        res.status(200).json(commentDataData);

    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;