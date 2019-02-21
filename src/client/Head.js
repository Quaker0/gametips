import React from 'react';
import { Link } from 'react-router-dom';

const SiteScripts = () => (
  <link
    rel='stylesheet'
    href='https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
    integrity='sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS'
    crossOrigin='anonymous'
  />
);

const Head = () => (
  <div>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <SiteScripts/>
    <nav className='navbar fixed-top navbar-dark bg-dark justify-content-between'>
      <Link to='/' className='main-nav-link'>
        <img className='app-logo navbar-brand'/>
        Game Tips
      </Link>
    </nav>
  </div>
);

export default Head;
