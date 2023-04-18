import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';


// TODO: 
// Check function with postman.

export const categoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Please enter your name.' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: 'That category already exists.'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: 200,
            message: 'New category created!',
            category
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: 'Error in Category.'
        })
    }
};
