import mongoose from 'mongoose'
// Bringing slugify in to handle string formatting for category items.
//  Need to download slugify still.

// TODO 
// /: go get slugify.
// Download and install. 


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
    },
})

export default mongoose.model("category", categorySchema)