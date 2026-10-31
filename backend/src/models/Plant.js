
import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        categorySlug: {
            type: String,
            required: true,
        },
        categoryDescription: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: '',
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
