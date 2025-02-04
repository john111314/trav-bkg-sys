"use client"; 

import React from 'react';
import Link from 'next/link';
import './home.css';

export default function Home() {
    return (
        <div>
            {/*===========Nav Bar=================*/}
            <section className="nav-bar">
                <div className="logo">Go Trip</div>
                <ul className="menu">
                    <li><Link href="/">Home</Link></li> {/* Updated to use Link */}
                    <li><Link href="#">Trip</Link></li>
                    <li><Link href="#">Package</Link></li>
                    <li><Link href="#">About Us</Link></li>
                    <li><Link href="#">Contact Us</Link></li>
                    <li><Link href="/login">Login</Link></li> {/* Updated to use Link */}
                </ul>
            </section>

            {/*===============Banner================*/}
            <section className="banner">
                <div className="banner-text-item">
                    <div className="banner-heading">
                        <h1>Find your Next tour!</h1>
                    </div>
                    <form className="form">
                        <input type="text" list="mylist" placeholder="Where would you like to go?" />
                        <datalist id="mylist">
                            <option>London</option>
                            <option>Canada</option>
                            <option>Monaco</option>
                            <option>France</option>
                            <option>Japan</option>
                            <option>Switzerland</option>
                            <option>Seoul</option>
                        </datalist>
                        <input type="date" className="date" />
                        <a href="#" className="book">book</a>
                    </form>
                </div>
            </section>

            {/*==============Places===================*/}
            <section className="places">
                <div className="places-text">
                    <small>FEATURED TOURS PACKAGES</small>
                    <h2>Favourite Places</h2>
                </div>

                <div className="cards">
                    {/** Card Component */}
                    {[
                        {
                            title: "The Dark Forest Adventure",
                            cost: "$1870 / Per Person",
                            time: "🕓 3 Days",
                            location: "✈ Vancouver, Canada",
                            imgSrc: "C:/Users/atos-/OneDrive/Pictures/canda.jpg"
                        },
                        {
                            title: "The Dark Forest Adventure",
                            cost: "$1870 / Per Person",
                            time: "🕓 3 Days",
                            location: "✈ Paris, France",
                            imgSrc: "C:/Users/atos-/OneDrive/Pictures/paris.jpg"
                        },
                        {
                            title: "The Dark Forest Adventure",
                            cost: "$1870 / Per Person",
                            time: "🕓 3 Days",
                            location: "✈ Bern, Switzerland",
                            imgSrc: "C:/Users/atos-/OneDrive/Pictures/bren.jpg"
                        },
                        {
                            title: "The Dark Forest Adventure",
                            cost: "$1870 / Per Person",
                            time: "🕓 3 Days",
                            location: "✈ Seoul, South Korea",
                            imgSrc: "C:/Users/atos-/OneDrive/Pictures/seoul.jpg"
                        },
                        {
                            title: "The Dark Forest Adventure",
                            cost: "$1870 / Per Person",
                            time: "🕓 3 Days",
                            location: "✈ Tokyo, Japan",
                            imgSrc: "C:/Users/atos-/OneDrive/Pictures/tokyo.jpg"
                        }
                    ].map((tour, index) => (
                        <div className="card" key={index}>
                            <div className="zoom-img">
                                <div className="img-card">
                                    <img src={tour.imgSrc} alt={tour.title} />
                                </div>
                            </div>

                            <div className="text">
                                <h2>{tour.title}</h2>
                                <p className="cost">{tour.cost}</p>
                                <div className="card-box">
                                    <p className="time">{tour.time}</p>
                                    <p className="location">{tour.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/*===========Footer=================*/}
            <div className="footer">
                <div className="links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Offers & Discounts</li>
                        <li>Contact Us</li>
                        <li>About</li>
                    </ul>
                </div>

                <div className="links">
                    <h3>Support</h3>
                    <ul>
                        <li>Frequently Asked Questions</li>
                        <li>Report a Payment Issue</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
