
import { useContext } from 'react';
import './SignUpForm.css';
import '../src/style.css'
import Header from './Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function SignUpForm() {

  const { registerInfo, updateRegisterInfo,registerUser, registerError, 
    isRegisterLoading } = useContext(AuthContext)

  return (
    <div className="container">
      <Header/>
      <h2>Welcome</h2>
      <form onSubmit={registerUser} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={registerInfo.name}
            onChange={(e)=>updateRegisterInfo({...registerInfo, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={registerInfo.phoneNumber}
            onChange={(e)=>updateRegisterInfo({...registerInfo, phoneNumber: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerInfo.email}
            onChange={(e)=>updateRegisterInfo({...registerInfo, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerInfo.password}
            onChange={(e)=>updateRegisterInfo({...registerInfo, password: e.target.value})}
          />
        </div>
        <div className='auth-buttons'>
          <button type="submit" className="signup-button"> { isRegisterLoading ? "Creating you account" : "Sign up"}</button>
          {
            registerError?.error &&  
            <alert>
              <p>{registerError?.message}</p>
            </alert>
          }
          <button type="button" className="google-signup-button">Sign up with Google</button>
        </div>
        <Link to={'/login'}>
          <p>Don`t have an account?</p>
        </Link>
      </form>
    </div>
  );
}

export default SignUpForm;
