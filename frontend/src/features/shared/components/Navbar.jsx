import React from 'react'
import { useNavigate } from 'react-router'
import '../navbar.scss'

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav className='nav-bar'>
            <p>Isolence</p>
            <button
            onClick={() => navigate('/create-post')}
            className='button primary-button'
            >Create Post</button>
        </nav>
    )
}

export default Navbar
