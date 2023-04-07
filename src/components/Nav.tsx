import { useEffect, useState } from 'react'
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
    const bgColorHex = 'bg-[#0E86D4]'
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
        <nav className={`flex flex-row items-center justify-between flex-wrap w-full fixed p-3 text-white z-50 ` + bgColorHex}>
            <div className='mr-3 text-2xl h-8 flex flex-row items-center justify-center'>
                <div className='w-12 mr-2'><img src={cloudIconWhite} alt="Cloud Icon" /></div>
                <div>Seer</div>
            </div>
            <div className='md:hidden'>
                <button 
                    onClick={toggleMenu}
                    className={`flex items-center justify-center text-white rounded border border-[#0E86D4] hover:text-white hover:border-white py-1 px-2 text-xl ` + bgColorHex}
                >
                    <i className='fas fa-bars'></i>
                </button>
            </div>

                    <div className={`w-full ${isVisible? 'block' : 'hidden'} md:w-auto md:block`}>
                        <div className="flex flex-col md:flex-row justify-center items-end md:justify-end md:items-center">
                            <button className="py-3 px-2 md:py-0 text-gray-300 hover:text-white">
                                <Link to='/' onClick={closeMenu}>
                                    Home
                                </Link>
                            </button>
                            <button className="py-3 px-2 md:py-0 text-gray-300 hover:text-white">
                                <Link to='/profile' onClick={closeMenu}>
                                    Profile
                                </Link>
                            </button>
                            {
                                !props.loggedIn? (
                                    <>
                                        <button className="py-3 px-2 md:py-0 text-gray-300 hover:text-white">
                                            <Link to='/signup' onClick={signUp}>
                                                Sign Up
                                            </Link>
                                        </button>
                                        <button className="py-3 px-2 md:py-0 text-gray-300 hover:text-white">
                                            <Link to='/login' onClick={signIn}>
                                                Log In
                                            </Link>
                                        </button>
                                    </>
                                                
                                ) : (
                                    <button className="py-3 px-2 md:py-0 text-gray-300 hover:text-white">
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
