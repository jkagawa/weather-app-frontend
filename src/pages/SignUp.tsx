import { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../components/Input"
import HandleAuth from "../custom-hooks/HandleAuth"

export default function SignUp() {
    const [ showToast, setShowToast ] = useState<boolean>(false)
    const [ showError, setShowError ] = useState<boolean>(false)
    const { register, handleSubmit } = useForm({})
    const { signUpData, handleSignUp } = HandleAuth()

    const onSubmit = (data: any, event: any) => {
        handleSignUp(data.first_name, data.email, data.password)
        event.target.reset()
        if(Object.hasOwn(signUpData, 'email')) {
            setShowToast(true)
        } else {
            setShowError(true)
        }
        console.log(signUpData)
    }

    const closeToast = () => {
        setShowToast(false)
        setShowError(false)
    }

    return (
        <>
            {/* Toast */}
            {
                showToast? (
                    <div className="w-full pt-14 flex items-center justify-center bg-green-400 text-white fixed">
                        <div className="w-full flex items-center justify-center">You have successfully signed up</div>
                        <button 
                            className="flex items-center justify-center p-2 cursor-pointer text-xl"
                            onClick={closeToast}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ) : (<></>)
            }
            {/* Error Message */}
            {
                showError? (
                    <div className="w-full pt-14 flex items-center justify-center bg-red-500 text-white fixed">
                        <div className="w-full flex items-center justify-center">Sign up failed</div>
                        <button 
                            className="flex items-center justify-center p-2 cursor-pointer text-xl"
                            onClick={closeToast}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ) : (<></>)
            }

            <div className="flex flex-col items-center justify-center text-center pt-14">
                <div className="text-4xl font-semibold p-4">Sign Up</div>
                <div className="max-w-4/5 w-96">
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="flex flex-col items-start justify-center my-6">
                            <Input
                                {...register('first_name', { required: true })} 
                                name="first_name"
                                type="text"
                                label="First name"
                            />
                        </div>

                        <div className="flex flex-col items-start justify-center my-6">
                            <Input
                                {...register('email', { required: true })} 
                                name="email"
                                type="email"
                                label="Email"
                            />
                        </div>
                        
                        <div className="flex flex-col items-start justify-center my-6">
                            <Input
                                {...register('password', { required: true })} 
                                name="password" 
                                type="password"
                                label="Password"
                            />
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <button className="m-1 p-2 rounded bg-gray-200 text-black hover:bg-[#0E86D4] hover:text-white">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}
