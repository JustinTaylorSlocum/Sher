const express = require('express');
const router = express.Router();

// Item Model
const Message = require('../models/message');

// @route   GET api/messages
// @desc    Get all messages
// @access  Public
router.get('/getMessages', (req, res) => {
    Message.find()
    .then(messages => res.json(messages))
});

// @route   POST api/messages
// @desc    Create a Message
// @access  Public
router.post('/sendMessage', (req, res) => {
    const newMessage = new Message({
        user: "User",
        messageText: req.body.messageText
    });
    console.log(req.body);
    newMessage.save().then(message => res.json(message));
});

/* // @route   DELETE api/messages/:id
// @desc    Delete a Message
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
}) */



module.exports = router;