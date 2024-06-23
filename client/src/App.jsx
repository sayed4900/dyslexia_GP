/* eslint-disable no-unused-vars */
import HandwritingResult from "../components/HandwritingResult";
import HandwritingTest from "../components/HandwritingTest"
import Main from "../components/Main"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from "../components/SignUpForm";
import LogInFrom from "../components/LogInForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DyslexiaTests from "../components/DyslexiaTests";
import TestResult from "../components/TestResult";
// import RecordUpload from "../components/RecordUpload";

function App() {
  const {user} = useContext(AuthContext) ; // get user data
  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/"  element={<Main/>} />
        <Route path="/test/hand-writing" element={<HandwritingTest/>} />
        <Route path="/test/hand-writing/continue" element={<HandwritingResult/>} />
        <Route path="/result" element={<TestResult />} />

        {/* <Route path="/hand-written" element={<RecordUpload/>} /> */}
        <Route path="/signup"  element={!user?<SignUpForm/> : <HandwritingResult/>} />
        <Route path="/login"  element={!user ? <LogInFrom/> : <HandwritingResult/>} />
        <Route path="/tests" element={<DyslexiaTests/>}/>
      </Routes>
    </>
  )
}

export default App
