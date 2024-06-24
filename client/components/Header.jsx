import { Link } from 'react-router-dom'
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Header = () => {
  const {user , logoutUser} = useContext(AuthContext) ; // get user data
  return (
    <div className="header">
      <div>
        <p>lexilearn</p>
      </div>
      <div className="icons">
        <img src="../public/imgs/home.png" alt="home" />
        <img src="../public/imgs/games.png" alt="games" />
        <Link to={'/tests'}>
          <img src="../public/imgs/tests.png" alt="icon4" />
        </Link>
        <img src="../public/imgs/comm.png" alt="icon5" />
        <img src="../public/imgs/comm.png" alt="icon5" />
      </div>
      <div>
        {!user &&
        <>
          <Link to={'/signup'}>
            <button>Signup</button>
          </Link>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </>
        }
        {user &&
          <Link onClick={() => logoutUser()} to="/login">
            <button>Logout</button>
          </Link>
          }
      </div>
    </div>
  )
}

export default Header