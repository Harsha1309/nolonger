import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

import { forgotPassword} from '../redux/actions/authAction'
import { FormSubmit,RootStore} from '../utils/TypeScript'

const ForgotPassword = () => {
  const [account, setAccount] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(forgotPassword(account))
  }
  const { darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className={`my-4 text-${isdarkMode?'white':'black'}`} style={{maxWidth: '500px'}}>
      <h2 >Forgot Password?</h2>

      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="account">Email / Phone Number</label>

        <div className="d-flex align-items-center my-2">
          <input type="text" className="form-control" id="account"
          name="account" onChange={e => setAccount(e.target.value)}  />

          <button className="btn btn-primary mx-2 d-flex align-items-center"
          type="submit">
            <i className="fas fa-paper-plane me-2" /> Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
