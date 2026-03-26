import { useState } from 'react'
import { Link } from 'react-router-dom'
import cloudIconWhite from '../assets/cloud_icon_white.png'

interface Props {
    loggedIn: boolean,
    setLoggedIn: any,
    firstName: string,
    email: string,
    token: string
}

export default function Nav(props: Props) {
    const [ isVisible, setIsVisible ] = useState<boolean>(false)

    function toggleMenu() {
        setIsVisible(!isVisible)
    }

    function closeMenu() {
        setIsVisible(false)
    }

    const signUp = async () => {
        toggleMenu()
    }

    const signIn = async () => {
        toggleMenu()
    }

    const signOut = async () => {
        toggleMenu()
        localStorage.setItem('cookie_token', "")
        props.setLoggedIn(false)
    }

    return (
        <nav className="flex flex-row items-center justify-between flex-wrap w-full fixed p-4 text-white z-50 glass-nav">
            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="mr-3 flex flex-row items-center gap-2 group">
                <div className="w-7 opacity-90 group-hover:opacity-100 transition-opacity">
                    <img src={cloudIconWhite} alt="Cloud Icon" />
                </div>
                <span className="text-lg font-semibold tracking-widest text-white/90 group-hover:text-white transition-colors">
                    SEER
                </span>
            </Link>

            {/* Mobile hamburger */}
            <div className='md:hidden'>
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center text-white/70 hover:text-white py-1 px-2 text-lg hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                    <i className='fas fa-bars'></i>
                </button>
            </div>

            {/* Nav links */}
            <div className={`w-full ${isVisible ? 'block animate-slide-down' : 'hidden'} md:w-auto md:block`}>
                <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-1 pt-2 md:pt-0">
                    <button className="nav-link">
                        <Link to='/' onClick={closeMenu}>Home</Link>
                    </button>
                    <button className="nav-link">
                        <Link to='/profile' onClick={closeMenu}>Profile</Link>
                    </button>
                    {
                        !props.loggedIn ? (
                            <>
                                <button className="nav-link">
                                    <Link to='/signup' onClick={signUp}>Sign Up</Link>
                                </button>
                                <button className="py-2 px-4 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-all duration-200 rounded-lg shadow-sm hover:shadow-sky-400/30">
                                    <Link to='/login' onClick={signIn}>Log In</Link>
                                </button>
                            </>
                        ) : (
                            <button className="py-2 px-4 border border-white/20 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 rounded-lg">
                                <Link to='/' onClick={signOut}>Sign Out</Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
