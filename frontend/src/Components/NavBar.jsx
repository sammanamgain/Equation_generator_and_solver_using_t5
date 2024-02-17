import "../App.css";

export default function NavBar() {
  return (
    <nav className='navbar-custom bg-[#333333] flex  justify-around sticky top-0 h-12 items-center text-[#ffffff] font-bold '>
      <div>
        <a href='/'>Math-solver</a>
      </div>
      <div
        className='
      flex  gap-20 nav-subitems'
      >
        <h1>
          <a href='/text-question'>WordProblem solver </a>
        </h1>
        <h1>
          {" "}
          <a href='/Equation'>Equation Solver</a>
        </h1>
      </div>
    </nav>
  );
}
