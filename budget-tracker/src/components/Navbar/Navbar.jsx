import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to="/" >Home</Link>
        <Link to="profile">Profile</Link>
        <Link to="transactions">New transaction</Link>
        <Link to="/transactionsList">Your list</Link>
        <Link to="/filteredTransactions">Filter</Link>
        <Link to="about">About the app</Link>
        </nav>
  )
};

export default Navbar;
