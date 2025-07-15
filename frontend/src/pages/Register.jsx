import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../services/Api_Endpoint';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function Register() {

      const navigate = useNavigate()
    
      const [user,setUser] =useState({
        name:"",
        email:"",
        password:"",
        profile:null,
      })

      const handlechange=(e)=>{
            const {name, value ,files} = e.target;
            if (name === "profile") {
              setUser((prev)=>({ ...prev, [name]: files[0]}));
            } else {
              setUser((prev)=> ({ ...prev,[name]: value}))
            }
             
      }
  
  const handleSubmit= async(e) =>{
    e.preventDefault()
    try {
     
       const formdata = new FormData();
       formdata.append('name',user.name) 
       formdata.append('email',user.email) 
       formdata.append('password',user.password) 
       formdata.append('profile',user.profile)
       
       const res = await axios.post(`${BaseUrl}/api/auth/register`,formdata)
       const data =res.data
       console.log('data',data);
       if (data.success) {
        toast.success(data.message)
        
        setUser({
        name:"",
        email:"",
        password:"",
        profile:null,
        })

        navigate('/login')
       }
       
      
    } catch (error) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.message)
      }
      console.log("error submitting form", error);
      
    }
    
  }
    

  return (
   <>
     
     <section className="bg-gray-100 dark-bg-gray-900 "  >
      <div className="flex flex-col item-center justify-center px-6 py-7 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:boader md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:boarder-gray-700 ">
          <div className="p-6 space-y-2 md:space-y-0 sm:p-8">
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white '>Register</h1>
              
              <form className="space-y-2 md:space-y-0" onSubmit={handleSubmit}  >
                <div>
                  <label 
                    htmlFor="profile"
                  className="flex text-white text-base px-5 py-0 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                   
                    <img src=
                       {
                        user.profile ?
                        URL.createObjectURL(user.profile)
                       : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkY36XkesV2esKBb7ds9iQinTHYG9R8pOGqQ&s"} alt="profile" 
                    className='rounded-[50%] w-[95px] h-[95px] object-cover '
                    />
                    <input 
                    type="file"
                    id='profile'
                    name='profile'
                    onChange={handlechange}
                    className='hidden'
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="text" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white"></label>
                  <input type="text" name='name' id='name' value={user.name}   onChange={handlechange}
                   className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your name' required="" />
                </div>
                  <div>
                  <label htmlFor="email" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white"></label>
                  <input type="email" name='email' id='email' value={user.email}  onChange={handlechange}
                   className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your Email' required=""  />
                </div>
                  <div>
                  <label htmlFor="password" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white"></label>
                  <input type="password" name='password' id='password' value={user.password}  onChange={handlechange}
                   className='bg-gray-50 border-gray-300 text-gray--900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your Password' required="" />
                </div>
                <div>
                  <button type='submit' className='mt-4 w-full bg-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-primry-300 font-medium rounded-lg text-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primry-700 dark:ring-primry-800'>Register</button>
                </div>
                <p className="text-gray-800 text-sm !mt-8 text-center">Already Register <Link to="/Login" className='text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold'   >Login here</Link> </p>
              </form>

          </div>
        </div>
      </div>
     </section>

   </>
  )
}
