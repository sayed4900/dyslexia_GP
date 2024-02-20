/* eslint-disable no-unused-vars */
import ImageUpload from "../components/ImageUploader"
import Main from "../components/Main"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecordUpload from "../components/RecordUpload";

function App() {
  
  return (
    <>
      <Routes>
        
        <Route path="/"  element={<Main/>} />
        {/* <Route path="/hand-written" element={<ImageUpload/>} /> */}
        <Route path="/hand-written" element={<RecordUpload/>} />
        
      </Routes>
    </>
  )
}

export default App
