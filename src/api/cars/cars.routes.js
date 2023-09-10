const express = require('express');
const router = express.Router();
const { Cars } = require('./models'); // Import your Cars model

// Create a new car
router.post('/', async (req, res) => {
    try {
        const car = await Cars.create(req.body);
        res.status(201).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create car' });
    }
});

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Cars.findAll();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

// Get a specific car by car_id
router.get('/:car_id', async (req, res) => {
    const car_id = req.params.car_id;
    try {
        const car = await Cars.findByPk(car_id);
        if (!car) {
            res.status(404).json({ error: 'Car not found' });
        } else {
            res.json(car);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
});

// Update a specific car by car_id
router.put('/:car_id', async (req, res) => {
    const car_id = req.params.car_id;
    try {
        const [updated] = await Cars.update(req.body, {
            where: { car_id },
        });
        if (updated) {
            res.json({ message: 'Car updated successfully' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update car' });
    }
});

// Delete a specific car by car_id
router.delete('/:car_id', async (req, res) => {
    const car_id = req.params.car_id;
    try {
        const deleted = await Cars.destroy({
            where: { car_id },
        });
        if (deleted) {
            res.json({ message: 'Car deleted successfully' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

// Search for cars by make or model
router.get('/search', async (req, res) => {
    const { make, model } = req.query;

    try {
        let cars;

        if (make && model) {
            // Search by both make and model
            cars = await Cars.findAll({
                where: {
                    make,
                    model,
                },
            });
        } else if (make) {
            // Search by make only
            cars = await Cars.findAll({
                where: {
                    make,
                },
            });
        } else if (model) {
            // Search by model only
            cars = await Cars.findAll({
                where: {
                    model,
                },
            });
        } else {
            // No search parameters provided
            return res.status(400).json({ error: 'Please provide make or model for search' });
        }

        if (cars.length === 0) {
            return res.status(404).json({ message: 'No matching cars found' });
        }

        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search for cars' });
    }
});

module.exports = router;
