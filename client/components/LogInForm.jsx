
import { useContext} from 'react';
import './SignUpForm';
import '../src/style.css'
import Header from './Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LogInFrom() {
  
  const {updateLoginInfo, loginUser,
    loginInfo, loginError,isLoginLoading} = useContext(AuthContext)

  return (
    <div className="container">
      <Header/>
      <h2>Welcome Back</h2>
      <form onSubmit={loginUser} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={(e) => updateLoginInfo({
                ...loginInfo, email:e.target.value
              }) }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={(e) => updateLoginInfo({
                ...loginInfo, password:e.target.value
              }) }
          />
        </div>
        <div className='auth-buttons'>
          <button type="submit" className="signup-button">
            {isLoginLoading ? "Logining in...":"Log in"}</button>
          <button type="button" className="google-signup-button">Sign up with Google</button>
        </div>
        {
          loginError?.error &&  
            <alert>
              <p>{loginError?.message}</p>
            </alert>
        }
        <Link to={'/signup'}>
          <p>Have an account?</p>
        </Link>
        
      </form>
    </div>
  );
}

export default LogInFrom;
