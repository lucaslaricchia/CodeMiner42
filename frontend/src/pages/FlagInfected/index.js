import React from 'react';

import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './styles.css';

export default function FlagInfected(){

    return (
        <div className="flag-infected-container">
            <Header/>
            <section className="content">
                <div className="inner-content">
                    <h2>If you suspect someone is infected, please tell us</h2>
                    <p>A survivor who gets 5 flags as infected will be REMOVED from the community</p>
                    <p>Yes you are right, we don't accept T-Zombies</p>
                    <input type="text"/>
                    <button>Flag as infected</button>
                </div>
            </section>
            <Footer/>
        </div>

    )


}