import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;
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
        // Check for an existing user
        const existingUser = await userModel.findOne({ email })
        // if there is already that user:
        if (existingUser) {
            return res.status(200).send({
                succes: false,
                message: 'That user is already registered. Please login.'
            });
        }
        // has password for a user 
        const hashedPassword = await hashPassword(password)

        // create and save a user 
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
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
                message: 'That password does not our records.'
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

// test contorller
export const testController = (req, res) => {
    res.send('protected Route');
}