import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";
import "../App.css";
import { solve_equation } from "../Equation/generate";
export default function Word() {
  const [text, settext] = useState("");
  const [loading, setloading] = useState(true);
  const [equationformat, setequationformat] = useState("Equation: ");
  const [solvesteps, setsolvesteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchData, setfetchData] = useState(false);

  // Use useEffect to update the currentIndex after each render

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 1000); // Change the duration as needed

    // Clear the timer when the component unmounts or when currentIndex reaches the end
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (fetchData) {
      const fetchDataAsync = async () => {
        setloading(true);
        const textvalue = { text: text };
        
        
          equation_solver = solve_equation(textvalue['text']);
          setsolvesteps(equation_solver);
        
        setloading(false);
      };
      fetchDataAsync();
      setfetchData(false);
    }
  }, [fetchData]);

  let equation_solver;

  const handlechange = (e) => {
    settext(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setequationformat("Equation: ");
    setsolvesteps([]);
    setfetchData(true);
  };
  let height = 300;
  //  console.log("height", height);
  return (
    <div className={`parent h-screen flex flex-col  `}>
      <NavBar></NavBar>

      <div className='text pb-10 word-problem flex flex-col items-center'>
        <h1 className='text-4xl mt-8 lg:text-5xl'> Equation Solver </h1>
        <form onSubmit={handlesubmit}>
          <div>
            <h1 className='text-2xl mt-10 word-problem-h1'>
              What do you want to calculate?
            </h1>
            <div className='textbox flex flex-row items-center gap-10 mt-5'>
              <textarea
                className='text-black w-[60vw] text-lg'
                value={text}
                onChange={handlechange}
              >
                {" "}
              </textarea>
              <button className='bg-[#f1c40f] h-full px-5 py-3' type='submit'>
                CALCULATE IT!
              </button>
            </div>

            <button
              className='bg-[#347ab6] h-[4vh] w-[8vw] mt-5 '
              type='submit'
            >
              Solve
            </button>
          </div>
        </form>

        {loading ? (
          <div className=' flex flex-col gap-4 mt-12 lg:pt-12'>
            <h1 className=' text-2xl font-bold '>
              Example ( Follow the Guidelines)
            </h1>
            <h1 className=' text-xl font-bold '>How to solve your problem</h1>
            <div className='border-2 rounded-none p-3  '>
              To solve your Equation upto Two variable using our solver,Type the problem in
              the box .The solver will  show
              step by step process to solve the equation
            </div>
          </div>
        ) : (
          <div className=' flex flex-col gap-4 mt-12 w-[80vw] lg:w-[70vw] before-extend '>
           
          </div>
        )}
      </div>
      <div className='Last-div w-[100vw] flex flex-col justify-center items-center gap-2'>
        {solvesteps.length > 0 &&
          solvesteps.slice(0, currentIndex).map((step, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 mt-1 w-[80vw] lg:w-[70vw] extended${
                currentIndex > index ? " animate-left-to-right" : ""
              }`}
            >
              <textarea
                className='border-2 rounded-none py-3   text-white text-center bg-slate-900'
                defaultValue={step}
              ></textarea>
            </div>
          ))}
      </div>
    </div>
  );
}
