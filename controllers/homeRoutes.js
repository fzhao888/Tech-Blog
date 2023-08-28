
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// renders homepage
router.get('/', async (req, res) => {
    try {

        // Get all blogPosts and JOIN with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serializes data  
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        // renders homepage
        res.render('homepage', {  
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });   

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// renders blog post by id
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User

                },
                {
                    model: Comment
                }
            ]
        }) 
       
        const blogPost = blogPostData.get({plain: true}); 

        res.render('blogPost', {
            ...blogPost,
            logged_in: req.session.logged_in
        })

    } catch(err){
        res.status(500).json(err);
    }
});


// renders create post
router.get('/create', withAuth, (req,res) => {
    res.render('create');
});

// renders login
router.get('/login', (req, res) => {
    // Check if user is logged in, if true - redirect the request to /profile
    if (req.session.logged_in) {
        res.redirect('/profile'); 
        return;
    }

    res.render('login');
});

// renders signup
router.get('/signup', (req,res) => {
    res.render('signup');
});



module.exports = router;