import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    product: [{
        type: mongoose.ObjectId,
        ref: "product"
    },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing", "Shipped", "Delivered"]
    },
},
    { timestamps: true })

export default mongoose.model("order", orderSchema)