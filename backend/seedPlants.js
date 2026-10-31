
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Plant from './src/models/Plant.js';
import { plantCategories } from '../frontend/src/data/plants.js';

dotenv.config();

const seedPlants = async () => {
    try {
        await connectDB();

        const operations = plantCategories.flatMap((category) =>
            category.plants.map((plant) => ({
                updateOne: {
                    filter: { slug: plant.id },
                    update: {
                        $set: {
                            slug: plant.id,
                            name: plant.name,
                            category: category.name,
                            categorySlug: category.id,
                            categoryDescription: category.description,
                            price: plant.price,
                            image: plant.image,
                            tag: plant.tag,
                        },
                    },
                    upsert: true,
                },
            }))
        );

        const result = await Plant.bulkWrite(operations);

        console.log('Plant catalog imported successfully!');
        console.log(`Plants added: ${result.upsertedCount}`);
        console.log(`Plants updated: ${result.modifiedCount}`);

        const totalPlants = await Plant.countDocuments();
        console.log(`Total plants in database: ${totalPlants}`);
    } catch (error) {
        console.error('Plant import failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedPlants();
