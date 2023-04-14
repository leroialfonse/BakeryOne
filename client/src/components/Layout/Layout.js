import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

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
            <main style={{ minHeight: "70vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Light and Shadow - Get the Picture!',
    description: 'MERN Stack Ecommerce App',
    keywords: "mern , react, node, mongodb",
    author: 'Brandon White'
}
export default Layout