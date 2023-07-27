import { Schema, model } from 'mongoose';
import { IProduct } from './Product.types';

// Creating Item Model
const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    ns: {
        type: Number,
        default: 0,
        alias: 'numberSold',
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
