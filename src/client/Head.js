import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';

const Head = () => (
  <div>
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no'
    />
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
    />
    <Navbar dark className='fixed-top bg-dark justify-content-between'>
      <Link to='/' className='btn btn-sm btn-outline-primary'>Game Tips</Link>
    </Navbar>
  </div>
);

export default Head;
