const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Load Models
const User = require('../models/User');
const Game = require('../models/Game');


// @route POST api/stores
// @desc Create or join Game
// @access Private
router.post('/', auth, async (req, res) => {

        const {
            language
        } = req.body;

        // Get fields
        const gameFields = {};
        gameFields.language = language;
        
        try {
            console.log('USER ID HERE');
            console.log(req.user.id);

            gameFields.user_1 = req.user.id;

            // Create
            const newGame = new Game(gameFields);

            const game = await newGame.save();

            res.json(game);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/games/:id
// @desc    Get Game by ID
// @access  Private 
router.get('/find/:id', auth, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('user_1', ['username']).populate('user_2', ['username'])

        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        res.json(game);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Game not found'});
        }

        res.status(500).send('Server Error')
    }
})

// @route GET api/products
// @desc Find all Games waiting (w/o a user_2)
// @access private
router.get('/matching', auth, async (req, res) => {
    try {
        const games = await Game.find({ user_2: null }).populate('user_1', ['username'])

        console.log('GAMES HERE');
        console.log(games);

        res.json(games);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


// @route POST api/games/join
// @desc Update Game
// @access Private
router.post('/join/:game_id', auth, async (req, res) => {
    console.log('JOINING GAME');

    // Get fields
    const gameFields = {};

    try {
        console.log('USER ID HERE');
        console.log(req.user.id);

        console.log('GAME ID HERE');
        console.log(req.params.game_id);

        gameFields.user_2 = req.user.id;

        let game = await Game.findById(req.params.game_id);

        if(!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Update
        await Game.findOneAndUpdate(
            { _id: req.params.game_id }, 
            { $set: gameFields }, 
            { new: true }
        );

        const newGame = await Game.findById(req.params.game_id);

        return res.json(newGame);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

// @route POST api/games/join
// @desc Update Game - Ready Up Player 1
// @access Private
router.post('/ready_1/:game_id', auth, async (req, res) => {
    console.log('UPDATING GAME READY 1');

    // Get fields
    const gameFields = {};
    gameFields.ready_1 = true;

    try {

        console.log('GAME ID HERE');
        console.log(req.params.game_id);

        let game = await Game.findById(req.params.game_id);

        if(!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Update
        await Game.findOneAndUpdate(
            { _id: req.params.game_id }, 
            { $set: gameFields }, 
            { new: true }
        );

        const newGame = await Game.findById(req.params.game_id);

        return res.json(newGame);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

// @route POST api/games/join
// @desc Update Game - Ready Up Player 2
// @access Private
router.post('/ready_2/:game_id', auth, async (req, res) => {
    console.log('UPDATING GAME READY 2');

    // Get fields
    const gameFields = {};
    gameFields.ready_2 = true;

    try {

        console.log('GAME ID HERE');
        console.log(req.params.game_id);

        let game = await Game.findById(req.params.game_id);

        if(!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Update
        await Game.findOneAndUpdate(
            { _id: req.params.game_id }, 
            { $set: gameFields }, 
            { new: true }
        );

        const newGame = await Game.findById(req.params.game_id);

        return res.json(newGame);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

module.exports = router;

