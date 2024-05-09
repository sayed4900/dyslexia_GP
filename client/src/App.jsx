/* eslint-disable no-unused-vars */
import HandwritingResult from "../components/HandwritingResult";
import HandwritingTest from "../components/HandwritingTest"
import Main from "../components/Main"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import RecordUpload from "../components/RecordUpload";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/"  element={<Main/>} />
        {/* <Route path="/hand-written" element={<HandwritingTest/>} /> */}
        <Route path="/hand-written" element={<HandwritingResult/>} />
        {/* <Route path="/hand-written" element={<RecordUpload/>} /> */}
      </Routes>
    </>
  )
}

export default App
