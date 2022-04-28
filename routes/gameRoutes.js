const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//gridfs
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

// Load Models
const Game = require('../../models/Game');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Ge current user's store
// @access Private
router.get('/me', auth, async (req, res) => {
    let storesArray = [];
    let newStore;
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        console.log('PROFILE');
        console.log(profile);

        for(var i = 0; i < profile.stores.length; i++) {
            console.log('STORE ID');
            console.log(profile.stores[i].store);
            newStore = await Store.findById(profile.stores[i].store);
            console.log(newStore);
            storesArray.push(newStore);
            console.log('STORESS ARRAY');
            console.log(storesArray);
        }

        console.log('FETCHED STORESSSSSS');
        console.log(storesArray);
    

        // let store = await Store.findOne({ profile: profile.id });

        if(!storesArray.length === 0) {
            return res.status(400).json({ msg: 'There is no store for this user' });
        }

        res.json(storesArray);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

//@route GET /:id
//@desc Get single store by id
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/stores
// @desc Create or join Game
// @access Private
router.post('/', async (req, res) => {

        // Get fields
        const storeFields = {};
        if(name) storeFields.name = name;
        if(req.file) storeFields.img = req.file.id;
        if(req.file) storeFields.img_name = req.file.filename;
        if(description) storeFields.description = description;
        if(email) storeFields.email = email;
        if(phone) storeFields.phone = phone;
        if(department) storeFields.department = department;
        if(zipcode) storeFields.zipcode = zipcode;
        // return address
        if(return_placeId) storeFields.return_placeId = return_placeId;
        if(area) storeFields.area = area;
        if(coordinates) storeFields.coordinates = coordinates;
        if(formatted_return_address) storeFields.formatted_return_address = formatted_return_address;

        // Build return location obj
        storeFields.return_location = {};
        if(coordinates) {
            storeFields.return_location.coordinates = coordinates.split(',').map(coordinate => coordinate.trim());
        }

        // Build address component obj
        storeFields.return_address = {};
        if(postalcode) storeFields.return_address.postalcode = postalcode;
        if(street_name) storeFields.return_address.street_name = street_name;
        if(street_number) storeFields.return_address.street_number = street_number;
        if(city) storeFields.return_address.city = city;
        if(state) storeFields.return_address.state = state;
        if(country) storeFields.return_address.country = country;
        if(area) storeFields.return_address.area = area;
        
        // Tags - Split into array
        if(tags) {
            storeFields.tags = tags.split(',').map(tag => tag.trim());
        }

        // Build variant array
        storeFields.social = {};
        if(youtube) storeFields.social.youtube = youtube;
        if(instagram) storeFields.social.instagram = instagram;
        if(facebook) storeFields.social.facebook = facebook;
        if(twitter) storeFields.social.twitter = twitter;
        if(website) storeFields.social.website = website;

        storeFields.profiles = [];
        
        try {
            const profile = await User.findById(req.user.id);

            storeFields.profiles.push({
                profile: profile.id
            });

            // let store = await Store.findOne({ profile: profile.id });

            // if(store) {
            //     // Update
            //     store = await Store.findOneAndUpdate(
            //         { profile: profile.id }, 
            //         { $set: storeFields }, 
            //         { new: true }
            //     );

            //     return res.json(store);
            // }
            
            // Create
            const newStore = new Store(storeFields);
        
            await newStore.save();

            // Update profile
            profile.stores.unshift({ store: newStore._id });

            profile.recent_store = newStore._id;

            await profile.save();
            
            res.json(newStore);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/stores
// @desc Edit A Store
// @access Public
router.post('/edit/:id/', upload.single('file'),[ auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {
        name, 
        description,
        tags,
        youtube,
        instagram,
        facebook,
        twitter,
        website,
        show_banner,
        privacy,
        passcode,
        taxes_in_prod,
        delivery_cost_customers
    } = req.body;

    // Get fields
    const storeFields = {};
    if(name) storeFields.name = name;
    if(show_banner) storeFields.show_banner = show_banner;
    if(privacy) storeFields.privacy = privacy;
    if(passcode) storeFields.passcode = passcode;
    if(taxes_in_prod) storeFields.taxes_in_prod = taxes_in_prod;
    if(delivery_cost_customers) storeFields.delivery_cost_customers = delivery_cost_customers;
    if(req.file) storeFields.img = req.file.id;
    if(req.file) storeFields.img_name = req.file.filename;
    if(description) storeFields.description = description;
    
    // Tags - Split into array
    if(tags) {
        storeFields.tags = tags.split(',').map(tag => tag.trim());
    }

    // Build variant array
    storeFields.social = {};
    if(youtube) storeFields.social.youtube = youtube;
    if(instagram) storeFields.social.instagram = instagram;
    if(facebook) storeFields.social.facebook = facebook;
    if(twitter) storeFields.social.twitter = twitter;
    if(website) storeFields.social.website = website;
    
    try {
        console.log('EDIT STORE')
        
        let store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        // Update
        store = await Store.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: storeFields }, 
            { new: true }
        );

        return res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route GET api/stores/subscriptions/:id
// @desc Get stores current user is subscribed too
// @access Private
router.get('/subscriptions/:id', auth, async (req, res) => {
    try {
        const stores = await Store.find({favorites: {$elemMatch: {user:req.params.id}}});

        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;

