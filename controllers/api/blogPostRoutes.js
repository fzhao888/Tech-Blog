const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post('/', async (res, req) => {
    try {
        const blogPostData = await BlogPost.create(req.body);

        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (res, req) => {
    try{
        const blogPostData = await BlogPost.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(blogPostData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', async (res, req) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!blogPostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;