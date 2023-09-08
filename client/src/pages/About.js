import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <Layout title={"About Us - Sweetie Pie Bakery"}>
            <div className="row aboutUs ">
                <div className="col-5">
                    <h3>About Us</h3>

                    <p className="text-justify mt-2">
                        Welcome to Sweetie Pie, where delicious memories are baked with love! I'm Tiffiany, the proud owner and operator of this sweet haven. In my 30s, with two adorable little ones by my side, I embarked on a journey to bring the cherished recipes of my great grandma, Sweetie, to life. It all began as a heartfelt tribute to the woman who filled our home with the warmest hugs and the most irresistible treats.</p>
                    <p className="text-justify mt-2">
                        Sweetie Pie came to life in the cozy corner of our small town three years ago. It's more than just a bakery; it's a labor of love and a dream realized. I find immense joy in starting my day with the sweet aroma of freshly baked pastries, knowing that my babies are nearby, sharing in the magic of this family legacy. Every bite of our treats carries the essence of tradition, and I'm excited to share these time-honored recipes with you. Join us at Sweetie Pie, where love and deliciousness collide in every delightful bite!
                    </p>

                    <p className="text-justify mt-2">
                        Sweetie Pie has the treats you need!
                        If you're hungry, then
                        <Link to="/contact" className='inText-link' > contact us </Link>today!
                    </p>

                </div>

                <div className='col-3'>


                    <img
                        className='aboutImg'
                        src="/maybeTiffiany.jpg"
                        alt="aboutUs"
                    />
                </div>
            </div>
        </Layout>
    )
}

export default About