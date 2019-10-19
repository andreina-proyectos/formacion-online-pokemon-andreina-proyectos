import React from 'react';
import './Footer.scss';
import github_logo from '../images/github_logo.png';

const Footer = () => {
  return(
    <footer className="footer">
    <img src={github_logo} alt="Git hub logo"
    className="logo__github"/>
    <p className="footer__text">
    Open Source project created with
      <span aria-label="Heart" className="span__heart">❣️
      </span> by
      <a className="link__github" rel="noopener noreferrer" href="https://github.com/andreina-proyectos" target="_blank"> <br/>
      @andreina-proyectos </a>
    </p>
  </footer>
  )
}

export default Footer;