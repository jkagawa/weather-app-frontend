import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import HandleDB from '../custom-hooks/HandleDB'
import Loader from '../components/Loader'

interface Props {
  loggedIn: boolean,
  setLoggedIn: any,
  firstName: string,
  email: string,
  token: string,
  setFirstName: any
}

export default function Profile(props: Props) {
    const { savedLocations, handleGetSavedLocations } = HandleDB()
    const [ showTextBox, SetShowTextBox ] = useState(false)
    const [ showToast, setShowToast ] = useState<boolean>(false)
    const [ showError, setShowError ] = useState<boolean>(false)
    const [ showLoader, setShowLoader ] = useState(false)

    const { register, handleSubmit } = useForm({})
    const { userInfo, handleUpdateUserInfo, handleDeleteSavedLocation } = HandleDB()

    const toggleShowTextBox = () => {
      SetShowTextBox(!showTextBox)
    }

    const onSubmit = (data: any, event: any) => {
      handleUpdateUserInfo(data.first_name, props.token)
      event.target.reset()
      SetShowTextBox(!showTextBox)
    }

    const closeToast = () => {
      setShowToast(false)
      setShowError(false)
    }

    const deleteItem = async (name: string, location_id: string) => {
      const response = confirm(`Are you sure you want to delete ${name}?`)
      if(response) {
        handleDeleteSavedLocation(props.token, location_id)
        const output = await handleGetSavedLocations(props.token)
        if(output) {
          setTimeout(() => window.location.reload(), 500)
        }
      }
    }

    useEffect(() => {
        if(props.token) {
          const fetchData = async () => {
            const data = await handleGetSavedLocations(props.token)
            return data
          }

          setShowLoader(true)

          fetchData()
          .then(() => {
            setShowLoader(false)
          })
        }
    }, [props.token])

    useEffect(() => {
        if(Object.hasOwn(userInfo, 'first_name')) {
            props.setFirstName(userInfo.first_name)
            localStorage.setItem('first_name', userInfo.first_name)
            setShowToast(true)
        } else if(Object.hasOwn(userInfo, 'message')) {
            setShowError(true)
        }
    }, [userInfo])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">

            {/* Toast */}
            {showToast && (
                <div className="w-full pt-14 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm text-white fixed z-40 animate-fade-in">
                    <div className="w-full flex items-center justify-center text-sm font-medium py-1">
                        Your info was updated successfully
                    </div>
                    <button
                        className="flex items-center justify-center p-3 cursor-pointer hover:text-white/70 transition-colors"
                        onClick={closeToast}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {/* Error toast */}
            {showError && (
                <div className="w-full pt-14 flex items-center justify-center bg-red-500/90 backdrop-blur-sm text-white fixed z-40 animate-fade-in">
                    <div className="w-full flex items-center justify-center text-sm font-medium py-1">
                        Update failed — please try again
                    </div>
                    <button
                        className="flex items-center justify-center p-3 cursor-pointer hover:text-white/70 transition-colors"
                        onClick={closeToast}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            <div className="flex-1 flex flex-col items-center pt-24 pb-12 px-4">

                {!props.loggedIn ? (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="glass rounded-2xl p-10 text-center shadow-glass">
                            <i className="fa-solid fa-lock text-white/30 text-4xl mb-4"></i>
                            <div className="text-2xl font-light text-white">Sign in to view your profile</div>
                            <div className="text-sm text-white/50 mt-2">Log in or create an account to save locations</div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md flex flex-col gap-4">

                        {/* Greeting card */}
                        <div className="glass rounded-2xl p-6 shadow-glass text-center">
                            <div className="text-4xl font-light text-white tracking-tight">Hi, {props.firstName}</div>
                            <div className="text-sm text-white/50 mt-1">{props.email}</div>
                        </div>

                        {/* Saved locations card */}
                        <div className="glass rounded-2xl p-5 shadow-glass">
                            <div className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">Saved Locations</div>

                            {showLoader ? (
                                <div className="flex justify-center py-4">
                                    <Loader />
                                </div>
                            ) : savedLocations.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {savedLocations.map((location: any, index: number) => (
                                        <div key={index} className="flex flex-row items-center justify-between glass-dark rounded-xl py-3 px-4 group">
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-star text-sky-400 text-xs"></i>
                                                <span className="text-white/90 text-sm font-medium">{location.name}</span>
                                            </div>
                                            <button
                                                className="w-7 h-7 rounded-full bg-red-500/0 hover:bg-red-500 flex items-center justify-center text-white/30 hover:text-white transition-all duration-200 text-xs"
                                                onClick={() => deleteItem(location.name, location.id)}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-white/30 text-sm">
                                    No saved locations yet
                                </div>
                            )}
                        </div>

                        {/* Edit name card */}
                        <div className="glass rounded-2xl p-5 shadow-glass">
                            <button
                                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors duration-200"
                                onClick={toggleShowTextBox}
                            >
                                <i className={`fa-solid fa-chevron-right text-xs transition-transform duration-200 ${showTextBox ? 'rotate-90' : ''}`}></i>
                                Edit first name
                            </button>

                            {showTextBox && (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className='flex flex-col gap-4 mt-4 animate-fade-in'
                                >
                                    <Input
                                        {...register('first_name', { required: true })}
                                        name="first_name"
                                        type="text"
                                        label="New first name"
                                        dark
                                    />
                                    <button className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-200 text-sm">
                                        Save Changes
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}
