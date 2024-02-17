// eslint-disable-next-line no-unused-vars
import { useState, useRef, useEffect } from "react";
//import { Link } from 'react-router-dom'
import "../App.css";
import NavBar from "../Components/NavBar";

("../Components/Question.jsx");
export default function Home() {
  // const [css,setcss]=useState('custom')

  return (
    <>
      <NavBar></NavBar>
      <div className=' customcss  flex flex-col items-center justify-center '>
        <div className='flex flex-col items-center justify-center h-[100vh]  Home'>
          <h1 className='text-5xl text-center p-3 '>
            {" "}
            Get Instant Equation for Any Math Problems
          </h1>
          <h2 className='p-3 text-xl text-center'>
            {" "}
            Enter your question and let our AI generate the equation you need
          </h2>
          <a href='/text-question'>
            {" "}
            <button className='border-2 border-solid border-red-600 bg-black p-3 rounded-lg'>
              Try Now
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
