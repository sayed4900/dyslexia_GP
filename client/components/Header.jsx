
// import homeImg from '../public/imgs/home.png';
// import gameImg from '../public/imgs/games.png'
// import testsImg from '../public/imgs/tests.png' 
// import communityImg from '../public/imgs/comm.png'
import './Header.css'
const Header = () => {
  return (
    <div className="header">
      <div>
        <p>lexilearn</p>
      </div>
      <div className="icons">
        <img src="../public/imgs/home.png" alt="home" />
        <img src="../public/imgs/games.png" alt="" />
        <img src="../public/imgs/tests.png" alt="icon4" />
        <img src="../public/imgs/comm.png" alt="icon5" />
        <img src="../public/imgs/comm.png" alt="icon5" />
      </div>
      <div>
        <button>Signup</button>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Header