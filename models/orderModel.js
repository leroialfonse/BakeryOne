import mongoose from 'mongoose';
import productModel from './productModel.js';


const orderSchema = new mongoose.Schema({
    product: [
        {
            type: mongoose.ObjectId,
            ref: "products",

        }
    ]
    ,
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'user',
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"],

    },
},
    { timestamps: true }


);

export default mongoose.model("orders", orderSchema)