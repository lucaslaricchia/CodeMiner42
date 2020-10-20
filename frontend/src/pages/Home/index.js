import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import './styles.css'


export default function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">

                <main>
                    <h1>Need help surviving this plague?</h1>
                </main>
                <Link to="/register" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>


            </div>
        </div>
    )

}