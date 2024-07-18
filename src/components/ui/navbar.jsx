import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    return ( 
    <>
    <Link className='m-3' to={'/'}>Main</Link>
    <Link className='m-3'to={'/login'}>Login</Link>
    <Link to="/users">Users</Link>
    </>
     );
}
 
export default NavBar;