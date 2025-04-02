import React from 'react';
import Clients from '../components/Clients';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Products from '../components/Products';
import Services from '../components/Services';
import "../App.css";

const Landing = () => {
    return (
        <>
            <Hero className="bg-slate-800" />
            <Intro className="bg-slate-800" />
            <Services  className="bg-slate-800" />
            {/* <Products className="bg-slate-800" /> */}
            {/* <Clients className="bg-slate-800" /> */}
            <Cta className="bg-slate-800"/>
            <Footer  className="bg-slate-800"/>
        </>

    )
}

export default Landing;

