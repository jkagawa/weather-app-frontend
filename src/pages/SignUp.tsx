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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">

            {/* Toast */}
            {showToast && (
                <div className="w-full pt-14 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm text-white fixed z-40 animate-fade-in">
                    <div className="w-full flex items-center justify-center text-sm font-medium py-1">
                        Account created successfully!
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
                        Sign up failed — please try again
                    </div>
                    <button
                        className="flex items-center justify-center p-3 cursor-pointer hover:text-white/70 transition-colors"
                        onClick={closeToast}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {/* Form card */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-12">
                <div className="w-full max-w-sm glass rounded-2xl shadow-glass-lg p-8">
                    <div className="text-center mb-8">
                        <div className="text-3xl font-light text-white tracking-tight">Create account</div>
                        <div className="text-sm text-white/50 mt-1">Start forecasting with Seer</div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <Input
                            {...register('first_name', { required: true })}
                            name="first_name"
                            type="text"
                            label="First name"
                            dark
                        />
                        <Input
                            {...register('email', { required: true })}
                            name="email"
                            type="email"
                            label="Email"
                            dark
                        />
                        <Input
                            {...register('password', { required: true })}
                            name="password"
                            type="password"
                            label="Password"
                            dark
                        />
                        <button className="w-full mt-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-200 shadow-sm hover:shadow-sky-400/30 text-sm tracking-wide">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
