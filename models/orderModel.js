import mongoose from 'mongoose'
// Bringing slugify in to handle string formatting for category items.
//  Need to download slugify still.

// TODO 
// /: go get slugify.
// Download and install. 


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
        enum: ["Not processed", "Processing payment", "Shipped", "Delivered", "Canceled"],

    },
},
    { timestamps: true }
);

export default mongoose.model("order", orderSchema)