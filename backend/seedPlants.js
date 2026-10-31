
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Plant from './src/models/Plant.js';
import { plantCategories } from '../frontend/src/data/plants.js';

dotenv.config();

const initializeStock = process.argv.includes('--initialize-stock');

const seedPlants = async () => {
    try {
        await connectDB();

        const operations = plantCategories.flatMap((category) =>
            category.plants.map((plant) => {
                const plantData = {
                    slug: plant.id,
                    name: plant.name,
                    category: category.name,
                    categorySlug: category.id,
                    categoryDescription: category.description,
                    price: plant.price,
                    image: plant.image,
                    tag: plant.tag,
                };

                const update = {
                    $set: plantData,
                };

                if (initializeStock) {
                    // Explicitly initialize or update existing inventory.
                    update.$set.stock = plant.stock ?? 0;
                } else {
                    // Only assign initial stock when creating a new plant.
                    update.$setOnInsert = {
                        stock: plant.stock ?? 0,
                    };
                }

                return {
                    updateOne: {
                        filter: { slug: plant.id },
                        update,
                        upsert: true,
                    },
                };
            })
        );

        const result = await Plant.bulkWrite(operations);

        console.log('Plant catalog imported successfully!');
        console.log(`Plants added: ${result.upsertedCount}`);
        console.log(`Plants updated: ${result.modifiedCount}`);

        if (initializeStock) {
            console.log('Initial inventory quantities have been applied.');
        } else {
            console.log('Existing inventory quantities have been preserved.');
        }

        const totalPlants = await Plant.countDocuments();

        console.log(`Total plants in database: ${totalPlants}`);

        const inventory = await Plant.find()
            .select('name slug stock')
            .sort({ categorySlug: 1, name: 1 });

        console.log('\nCurrent inventory:');

        inventory.forEach((plant) => {
            console.log(`${plant.name}: ${plant.stock} units`);
        });

    } catch (error) {
        console.error('Plant import failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedPlants();
