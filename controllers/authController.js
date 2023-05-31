import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
import orderModel from "../models/orderModel.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, phone, address, answer, password } = req.body;
        // Validation
        if (!name) {
            return res.send({ message: 'A valid Name is required.' })
        }
        if (!email) {
            return res.send({ message: 'A valid Email address is required.' })
        }
        if (!phone) {
            return res.send({ message: 'A valid Phone number is required.' })
        }
        if (!address) {
            return res.send({ message: 'A valid Address is required.' })
        }
        if (!password) {
            return res.send({ message: 'A valid Password is required.' })
        }
        if (!answer) {
            return res.send({ message: 'A valid answer is required.' })
        }
        // Check for an existing user
        const existingUser = await userModel.findOne({ email })
        // if there is already that user:
        if (existingUser) {
            return res.status(200).send({
                succes: false,
                message: 'That user is already registered. Please login.'
            });
        }
        // hash password for a user 
        const hashedPassword = await hashPassword(password)

        // create and save a user 
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();
        // console.log(user)

        res.status(201).send({
            success: true,
            message: 'Registration succesful!',
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong...',
            error,
        });
    }
};

// POST for Login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Validation for logins

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password. Please try again.'
            });
        }
        // Check if the user email matches db.
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'That email address was not found. Do you need to register?'
            });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'That password does not match our records.'
            });
        }
        // JWT token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });
        res.status(200).send({
            success: true,
            message: 'Login successful!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error with your login.',
            error
        });
    }
};

// Forgot password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Your email address is required." })
        }
        if (!answer) {
            res.status(400).send({ message: "Please answer your security question." })
        }
        if (!newPassword) {
            res.status(400).send({ message: "Please enter your  new password." })
        }



        // check the user data.

        const user = await userModel.findOne({ email, answer })

        // validation

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or security answer. Please try again.'
            })
        }
        // create a new password and update the user upon completion of recovery
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        console.log(user._id)
        res.status(200).send({
            success: true,
            message: 'Password reset!',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Bad exposure, please try again.',
            error
        })
    }
};


// Update user profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModel.findById(req.user.id)

        // Password length requirement
        if (password && password.length < 6) {
            return res.json({ error: 'Password must be at least 6 characters long; please try again.' })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address

        }, { new: true });
        res.status(200).send({
            success: true,
            message: 'User Profile updated!',
            updatedUser
        });

    } catch (error) {
        console.log(error),
            res.status(400).send({
                sucess: false,
                message: 'Could not update the profile. Please try again...',
                error

            })
    }
};


// //////////////////


//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate('products')
            // .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
// ////////////////////
// get Past orders

export const getPastOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate('products', '-photo').populate('buyer', "name");
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: 'Could not get the past orders.',
            error
        })
    }
}

// Show all orders....
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('products', '-photo').populate('buyer', "name").sort({ createdAt: '-1' });
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: 'Could not get the past orders.',
            error
        })
    }
}

// update Order Status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while updating the order status.',
            error
        })
    }
}




// test contorller
export const testController = (req, res) => {
    res.send('protected Route');
}