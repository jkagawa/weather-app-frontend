import { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../components/Input"

export default function LogIn() {
    const [ showToast, setShowToast ] = useState<boolean>(false)
    const { register, handleSubmit } = useForm({})

    const onSubmit = (data: any, event: any) => {
        console.log(data)
        event.target.reset()
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center pt-14">
                <div className="text-4xl font-semibold p-4">Log In</div>
                <div className="max-w-4/5 w-96">
                    <form onSubmit={handleSubmit(onSubmit)} >

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
