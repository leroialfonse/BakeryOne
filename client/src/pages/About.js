import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <Layout title={"About Us - Sweetie Pie Bakery"}>
            <div className="row aboutUs ">
                <div className='col-4'>


                    <img
                        className="About-img"
                        src="/photoGuy.jpg"
                        alt="aboutUs"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-5">
                    {/* Before I changed over to a bakery app! Figure out a new page!  */}
                    <p className="text-justify mt-2">
                        Sweetie Pie has the treats you need!
                        If you're hungry, then
                        <Link to="/contact" className='inText-link' > contact us </Link>today!
                    </p>

                </div>
            </div>
        </Layout>
    )
}

export default About