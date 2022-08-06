import { useState } from "react";
import isEmail from 'validator/lib/isEmail'

const Form = () => {
const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return({
        ...prev,
        [e.target.name]: e.target.value
      })
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!isEmail(formData.email)) {
      setFormData({...formData, error: "This is not a valid email."})
    } else if (formData.password.length < 5) {
      setFormData({...formData, error: "The password should be minimum 5 characters long."})
    } else if (formData.confirmPassword !== formData.password) {
      setFormData({...formData, error: "Confirm Password didn't match."})
    } else {
      setFormData({...formData, error: ""})
    }
   }

  return (
    <div className='container my-5'>
      <form>
          {/* Email */}
          <div className='mb-3'>
            <label 
              htmlFor='email' 
              className='form-label'
            >  
              Email Address  
            </label>

            <input 
              type='email'
              // type='text' 
              id='email' 
              name='email' 
              className='form-control' 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className='mb-3'>
            <label 
              htmlFor='password' 
              className='form-label'
            >  
              Password  
            </label>
            <input 
              type='password' 
              id='password' 
              name='password' 
              className='form-control' 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className='mb-3'>
            <label 
              htmlFor='confirm-password' 
              className='form-label'
            > 
              Confirm Password  
            </label>
            <input 
              type='password' 
              id='confirm-password' 
              name='confirmPassword' 
              className='form-control' 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {formData.error && (
            <p className='text-danger'> 
              {formData.error} 
            </p>
          )}
          <button 
            type='submit' 
            className='btn btn-primary' 
            onClick={handleSubmit}
          > 
              Submit 
          </button>
      </form>
    </div>
  );
}
export default Form;