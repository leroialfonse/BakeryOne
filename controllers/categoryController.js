import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';


// TODO: 

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

// update a category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Category updated!',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating the category.'
        })
    }
};

// get all categories

export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories available...",
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error with showing all categories.'
        })
    }
};

// get one specific category

export const oneCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Here's this specific category...",
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error with showing this single category request.'
        })
    }
};


// delete a category.
export const deleteCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category Deleted!',

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Could not delete the category.',
            error
        })
    }
};
