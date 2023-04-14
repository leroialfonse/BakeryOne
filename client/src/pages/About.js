import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title={"About"}>
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
                    <p className="text-justify mt-2">
                        Whether you need professinal headshots for your acting debut, the best gear to take your photography to the next level, or classes with professionals in the field to help you follow your passion, you can find it all at Light and Shadow!
                    </p>

                </div>
            </div>
        </Layout>
    )
}

export default About