
import { useNavigate } from "react-router-dom";
import Summary from "../components/summary";


export default function QuizFinish() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/QuizFinishFail'); 
  };
  return (
    <div className="flex flex-col">
    <div className="flex justify-between">
    <div className="p-36 text-center w-[70%] ">
        <h3 className="text-blak text-[24px] font-montserrat font-semibold tracking-[.36px]">
          Chapter One: Evaluation Quiz
        </h3>
        <p className="text-darkBlue opacity-50 text-[24px] font-montserrat font-semibold tracking-[.36px] my-8 ">
          Finished: 08/10
        </p>
       <p className="text-darkBlue opacity-[0.6] text-[16px] font-montserrat font-normal tracking-[.24px] my-4">
            Quiz passed, proceed to the next chapter!
          </p>
       <button onClick={handleNavigation}
       className="relative  w-45 h-9 py-1 px-5 border border-black text-black font-semibold bg-white cursor-pointer shadow-purple-400 hover:transform hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-purple-500">
          <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-purp z-0"></span>
          <span className="absolute inset-0 border border-black bg-white z-10"></span>
          <span className="relative z-20   text-black">Continue</span>
        </button> 
        
        
      </div>
    <Summary/>
   </div>

    </div>

  )
}
