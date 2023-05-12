import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product',

    },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Canceled"],

    },
},
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema)