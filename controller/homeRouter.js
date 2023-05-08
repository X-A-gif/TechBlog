const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET all posts by user
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post to edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            ...post,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

// GET all comments for one post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [{ model: User }],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('single-post', { comments, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('signup');

  });

module.exports = router;