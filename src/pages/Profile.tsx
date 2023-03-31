import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import HandleDB from '../custom-hooks/HandleDB'

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
          handleGetSavedLocations(props.token)
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
        console.log(userInfo)
    }, [userInfo])

    return (
        <>
         {/* Toast */}
         {
              showToast? (
                  <div className="w-full pt-14 flex items-center justify-center bg-green-400 text-white fixed">
                      <div className="w-full flex items-center justify-center">Your info successfully updated</div>
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
                      <div className="w-full flex items-center justify-center">Update failed</div>
                      <button 
                          className="flex items-center justify-center p-2 cursor-pointer text-xl"
                          onClick={closeToast}
                      >
                          <i className="fa-solid fa-xmark"></i>
                      </button>
                  </div>
              ) : (<></>)
          }

        {
          !props.loggedIn? (
            <div className="flex flex-col items-center justify-center text-center pt-14">
              <div className="text-4xl font-semibold p-4">Please log in</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center pt-14">
              <div className="text-4xl font-semibold p-4">Hi, {props.firstName}</div>
              <div>
                <div className='text-xl'>Your saved locations</div>
                {
                  savedLocations.length>0? (
                    savedLocations.map((location: any, index) => (
                        <div className='flex flex-row items-center justify-center m-3 group'>
                          <div className='mx-2'>
                            {location.name}
                          </div>

                          <button 
                            className='bg-red-500 text-white h-6 w-6 rounded-full hidden group-hover:block'
                            onClick={() => deleteItem(location.name, location.id)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        
                      )
                    )
                  ) : (
                    <>EMPTY</>
                  )
                }
              </div>
              <button 
                className='flex justify-start m-3 p-2 rounded text-[#0E86D4] underline'
                onClick={toggleShowTextBox}  
              >
                Edit first name
              </button>
              {
                showTextBox? (<>
                    {/* Form */}
                    <form 
                      onSubmit={handleSubmit(onSubmit)} 
                      className='flex flex-col items-center justify-center max-w-xl'
                    >
                    <div className="flex flex-col items-start justify-center my-6">
                        <Input
                            {...register('first_name', { required: true })} 
                            name="first_name"
                            type="text"
                            label="First name"
                        />
                    </div>
                    <button className='flex justify-start m-3 p-2 rounded bg-gray-200 text-black hover:bg-[#0E86D4] hover:text-white'>
                      Submit
                    </button>
                  </form>
                </>) : (<></>)
              }
            </div>
          )
        }
        </>
    )
}