const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    user.getAllUsers((err, users) => {
        if (err) {
            res.json({success: false, message: `Failed to load all users. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, users: users},null,2));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.createUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, message: `Failed to create a new user. Error: ${err}`});
        } else {
            res.json({success: true, message: "Added successfully."});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    user.deleteUserById(id, (err, user) => {
        if (err) {
            res.json({success: false, message: `Failed to delete the user. Error: ${err}`});
        } else if(user) {
            res.json({success: true, message: "Deleted successfully"});
        } else {
            res.json({success: false});
        }
    });
});

module.exports = router;