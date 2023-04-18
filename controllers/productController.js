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
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        // navigate the interpreter to where it can find the photo
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            // Tell the interperter what the photo type should be.
            products.photo.contentType = photo.type
        }
        await products.save()
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
            error
        })
    }
};
