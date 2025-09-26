const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Get all services
router.get('/', async (req, res) => {
    const services = await Service.find();
    res.send(services);
});

// Add service
router.post('/', async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.send({ message: 'Service added' });
});

module.exports = router;
