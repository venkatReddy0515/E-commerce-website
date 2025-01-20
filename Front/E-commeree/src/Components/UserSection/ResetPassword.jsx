import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Axios from "axios"
import Message from "../../Message";
function ResetPassword(){
    const  navigate=useNavigate();
    const [verified,setVerified]=useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [repassword,setRePassword]=useState('');
    const [issuccess,setSuccess]=useState(null);
    const [message,setMessage]=useState('')
    const [otp,setOtp]=useState('');
    const sendOtp=()=>{

        Axios.post("https://e-commerce-website-zt25.onrender.com/api/forget",{email})
        .then((response)=>{
            setSuccess(true);
            setMessage("otp send successfully");
            setVerified(true);
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
            setSuccess(false);
            setMessage("failed to send otp");
        })
    }
    const upper=/[A-Z]/
    const special=/[!@#$%^&*()_+]/
    const handleResetPassword=()=>{

      if(password<8){
        setSuccess(false);
        setMessage("password must be 8 character");
        return ;
      }
      if(password!==repassword){
        setSuccess(false);
        setMessage("password is not matched");
        return ;
      }

      Axios.post("https://e-commerce-website-zt25.onrender.com/api/reset",{email,password,otp})
      .then((response)=>{
        setSuccess(true);
        setMessage("Password change successfully!,please login");
          navigate("/sign-in");
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
        setSuccess(false);
        setMessage("error occured");
      })
    }
    return(
        <>
          <div className="reset-password-container">
        <div className="login-form">
          <h1>Reset Password</h1>
          {issuccess !== null && <Message success={issuccess} message={message} />}
          {!verified ? (
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <button className="otp" onClick={sendOtp}>
                Send OTP
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="otp"
                id="otp"
                className="otp-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
              <input
                type="password"
                name="password"
                id="password1"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <input
                type="password"
                name="password"
                id="password2"
                className="password"
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Re-enter new password"
                required
              />
              <button className="submit" onClick={handleResetPassword}>
                Confirm
              </button>
              <div className="additional">
                <button className="exist" onClick={() => navigate("/sign-in")}>
                  Return to <span>Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
    )
}
export default ResetPassword
