import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';



const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />
            {/* Set the main content of the page to 80 of the vh, pushing the footer to the last 20. */}
            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Sweetie Pie - A taste of Home!',
    description: 'MERN Stack Bakery Ecommerce App',
    keywords: "mern , react, node, mongodb, express",
    author: 'Brandon White'
}
export default Layout