import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
    return (
        <Layout title={"Contact Us"}>
            <div className="row contactUs ">
                <div className="col-md-6">
                    <img
                        className="contact-img"
                        src="/callCenterPoint.jpg"
                        alt="contactUs"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
                    <p className="text-justify mt-2">
                        Are you ready to schedule a shoot? Did you have problems with your order?
                        Don't hesitate to Contact Us!
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : help@lightShadow.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 810-1SHADOW
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-548-7423 (Toll Free)
                    </p>
                </div>
            </div>
        </Layout>
    );
};


export default Contact