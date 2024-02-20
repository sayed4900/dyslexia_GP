
import { Link } from 'react-router-dom'
import './Main.css'
const Main = () => {
  return (
    <div className='main'>
      <div className='main-page'>
        <div className='content'>
          <p>let’s LEARN</p>
          <h1>LEXI LEARN</h1>
          <span>Use our app for dyslexia</span>
        </div>
        <div className='main-img'>
          <img src='../public/main.png'/>
        </div>
      </div>
      <div className='main-btn'>
        <Link to={"/hand-written"}>
        <button className="btn">
          <i className="animation"></i>Get Started<i className="animation"></i>
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Main