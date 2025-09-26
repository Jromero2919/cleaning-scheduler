const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Get bookings (optional filter by user)
router.get('/', async (req, res) => {
    const userId = req.query.user_id;
    let bookings;
    if(userId){
        bookings = await Booking.find({ $or: [{customer_id: userId}, {cleaner_id: userId}] });
    } else {
        bookings = await Booking.find();
    }
    res.send(bookings);
});

// Create booking
router.post('/', async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.send({ message: 'Booking created' });
});

// Update booking status
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.send({ message: 'Booking updated', booking });
});

module.exports = router;
