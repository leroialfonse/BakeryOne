import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {/* Set the main content of the page to 80 of the vh, pushing the footer to the last 20. */}
            <main style={{ minHeight: "80vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout