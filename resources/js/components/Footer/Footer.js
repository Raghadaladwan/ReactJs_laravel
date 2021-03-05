import React from "react";

const Footer = () => {
    return (
        <div color="blue" className="font-small pt-4 mt-4 fixed-bottom navbar-dark bg-dark">
            <div  className="text-center text-md-left">
                <div>
                    <div md="2">
                        <h5 className="title text-light pl-5">Footer Content</h5>
                   
                    </div>
                   
                </div>
            </div>
            <div className="footer-copyright text-center py-3 text-light " >
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a href="https://www.abc.com "> ABC.com </a>
            </div>
        </div>
    );
};

export default Footer;
