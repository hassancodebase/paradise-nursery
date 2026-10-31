
import mongoose from 'mongoose';
import Plant from '../models/Plant.js';

// Get all plants
export const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: plants.length,
            plants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve plants',
        });
    }
};

// Get one plant by ID
export const getPlantById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid plant ID',
            });
        }

        const plant = await Plant.findById(id);

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found',
            });
        }

        res.status(200).json({
            success: true,
            plant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve plant',
        });
    }
};
