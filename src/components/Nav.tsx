import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    const navColorHex = 'bg-[#0E86D4]'
    const [ isVisible, setIsVisible ] = useState(false)

    function toggleMenu() {
        setIsVisible(!isVisible)
    }

    function closeMenu() {
        setIsVisible(false)
    }

    const signUp = async () => {

    }

    const signIn = async () => {

    }

    const signOut = async () => {

    }

    const loggedIn = false

    return (
        <nav className={`flex flex-row items-center justify-between flex-wrap w-full fixed p-3 text-white z-10 ` + navColorHex}>
            <div className='mr-3 text-2xl h-8'>
                Seer Weather App
            </div>
            <div className='md:hidden'>
                <button 
                    onClick={toggleMenu}
                    className={`flex items-center justify-center text-gray-400 border rounded hover:text-white hover:border-white py-1 px-2 text-xl ` + navColorHex}
                >
                    <i className='fas fa-bars'></i>
                </button>
            </div>

                    <div className={`w-full ${isVisible? 'block' : 'hidden'} md:w-auto md:block`}>
                        <div className="flex flex-col md:flex-row justify-center items-end md:justify-end md:items-center">
                            <button className="py-3 px-2 md:py-0 text-gray-400 hover:text-white">
                                <Link to='/' onClick={closeMenu}>
                                    Home
                                </Link>
                            </button>
                            <button className="py-3 px-2 md:py-0 text-gray-400 hover:text-white">
                                <Link to='/profile' onClick={closeMenu}>
                                    Profile
                                </Link>
                            </button>
                            {
                                !loggedIn? (
                                    <>
                                        <button className="py-3 px-2 md:py-0 text-gray-400 hover:text-white">
                                            <Link to='/' onClick={signUp}>
                                                Sign Up
                                            </Link>
                                        </button>
                                        <button className="py-3 px-2 md:py-0 text-gray-400 hover:text-white">
                                            <Link to='/' onClick={signIn}>
                                                Login
                                            </Link>
                                        </button>
                                    </>
                                                
                                ) : (
                                    <button className="py-3 px-2 md:py-0 text-gray-400 hover:text-white">
                                            <Link to='/' onClick={signOut}>
                                                Sign Out
                                            </Link>
                                            </button>
                                        )
                                    }
                            
                        </div>
                    </div>
        </nav>
    )
}
