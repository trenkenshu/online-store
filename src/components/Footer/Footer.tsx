import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__authors">
                <a className="footer__github-link" href="https://github.com/ViktorMinkov" target="_blank">
                    Viktor Minkov
                </a>
                <a className="footer__github-link" href="https://github.com/trenkenshu" target="_blank">
                    Oleg Trenkenshu
                </a>
            </div>
            <div className="footer__year">© 2022 — {new Date().getFullYear()}</div>
            <a className="footer__rs-logo" href="https://rs.school/js/" target="_blank"></a>
        </footer>
    );
};

export default Footer;
