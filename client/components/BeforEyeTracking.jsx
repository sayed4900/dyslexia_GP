import Header from "./Header"
import '../src/style.css'
import { useNavigate } from "react-router-dom"

export const BeforEyeTracking = () => {
  const navigate = useNavigate();
  
   const handleContinue = () => {
    navigate('/test/eye-tracking/continue',{test:"eye"});
  };
  return (
    <div className="container">
      <Header/>
      <div className="before-eye">
        <h1>Eye Tracking</h1>
        <p>Once you open the camera ,a piece of reading will appear, To continue please allow camera permission</p>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}
