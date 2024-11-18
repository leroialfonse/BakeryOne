import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import orderModel from "../models/orderModel.js";
import fs from 'fs'
import slugify from "slugify";
// import braintree for payment(sandbox).
import braintree from "braintree";
// import env for access to env vars
import dotenv from 'dotenv'
// and use the dotenv config method to expose the vars to intreperter access...
dotenv.config();

//payment gateway vars. Use the proc.env. so as not to expose my keys to public use.

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
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
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error with creating product.',
            error,
        });
    }
};


export const getProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(30).sort({ createdAt: -1 });
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
};

// Filter products by price or category

export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error with filtering products',
            error,
        })
    }
};

// Count products

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })

    } catch (error) {
        console.log(error),
            res.status(400).send({
                succsess: false,
                message: 'Error counting the products for display.',
                error
            })
    };
};

// List a certain number of products on the page.
export const productListContoller = async (req, res) => {
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: - 1 });

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                success: false,
                message: 'Error with the perPage contoller.',
                error
            })
    }
};

// Search for a product

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        // use a regex to search for a thing based on keywords for names or descriptions
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },


            ]
        }).select('-photo');
        res.json(results);

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in search controller; could not search for a product.',
            error
        })
    }
};

// Similar products controller
export const similarProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }

        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Could not get the related products.",
            error
        })
    }
};

// Show products by category

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error with getting products.",
            error
        })
    }
};

// Payment gateway API controller..
// ...token 
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response);

            }
        });

    } catch (error) {
        console.log(error);
    }

};

//...and payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map((item) => { total += item.price });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            },
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        product: cart,
                        payment: result,
                        buyer: req.user._id

                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }

};