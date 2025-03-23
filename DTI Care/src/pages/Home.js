import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main>
                <h1>Welcome to the Administrative Services Portal</h1>
                <p>
                    This portal provides various administrative services including managing letters, 
                    accessing simple services, and more. Navigate through the sidebar to explore our offerings.
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Home;