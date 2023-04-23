import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";


export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validate the form submit:
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'A product name is required.' });
            case !description:
                return res.status(500).send({ error: 'A product description is required.' });
            case !price:
                return res.status(500).send({ error: 'A product price is required.' });
            case !category:
                return res.status(500).send({ error: 'A product category is required.' });
            case !quantity:
                return res.status(500).send({ error: 'A product quantity is required.' });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'A product photo is required, and must be less that 1MB in size.' });

        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        // navigate the interpreter to where it can find the photo
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            // Tell the interperter what the photo type should be.
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created!',
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error with creating product.',
            error,
        })
    }
};


export const getProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: 'All available Products',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Could not get all products.",
            error
        })
    }
};

export const getOneProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: "Here's this specific product...",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Could not find that product.",
            error,
        })
    }

};

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            succsess: false,
            message: 'Could not find the image for this product.',
            error
        })
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product deleted!',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Could not delete this product.',
            error,
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validate the form submit:
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'A product name is required.' });
            case !description:
                return res.status(500).send({ error: 'A product description is required.' });
            case !price:
                return res.status(500).send({ error: 'A product price is required.' });
            case !category:
                return res.status(500).send({ error: 'A product category is required.' });
            case !quantity:
                return res.status(500).send({ error: 'A product quantity is required.' });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'A product photo is required, and must be less that 1MB in size.' })



        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true })
        // navigate the interpreter to where it can find the photo
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            // Tell the interperter what the photo type should be.
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product updated',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error with updataing product.',
            error
        })
    }
}