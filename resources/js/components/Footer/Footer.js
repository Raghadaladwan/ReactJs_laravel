import React from "react";

const Footer = () => {
    return (
        <div color="blue" className="font-small pt-4 mt-4 fixed-bottom navbar-dark bg-dark">
            <div  className="text-center text-md-left">
                <div>
                    <div md="2">
                        <h5 className="title text-light">Footer Content</h5>
                   
                    </div>
                    <div md="6">
                        <h5 className="title text-light">Links</h5>
                        <ul>
                            <li className="list-unstyled text-light">
                                <a href="#!">Link 1</a>
                            </li>
                            <li className="list-unstyled text-light">
                                <a href="#!">Link 2</a>
                            </li>
                        </ul>
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
