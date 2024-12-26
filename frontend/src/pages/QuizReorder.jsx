import { useNavigate } from "react-router-dom";
import Summary from "../components/summary";



export default function QuizReorder() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/Quiz'); 
  };
  return (
    <div className="flex flex-col">
    <div className="flex justify-between">
    <div className='mt-10 ml-10'>
  <p className='text-2xl font-montserrat font-semibold'>
    Re-order these sentences 
    <span className='text-darkblue ml-4 font-semibold opacity-50'>3 min</span> 
  </p>
  <p className='mt-8 text-[16px] font-montserrat'>
    Put the sentences in the right order to define web development
  </p>

  <div className="flex items-center mt-1">
    <input
      type="number"
      className=" w-[31px] h-10 bg-[#F5F4FF] text-center text-[16px] font-montserrat mr-4"
      min="1"
      max="3"
      placeholder="01"
    />
    <div className="bg-[#F5F4FF] p-3 text-[16px] font-montserrat h-10 w-[677px]">
      Web development is the creation, maintenance
    </div>
  </div>

  <div className="flex items-center mt-4">
    <input
      type="number"
      className=" w-[31px] h-10 bg-[#F5F4FF]  text-center mr-4"
      min="1"
      max="3"
      placeholder="02"
    />
    <div className="bg-[#F5F4FF] p-3 text-[16px] font-montserrat h-10 w-[677px]">
      and security of websites and web applications,
    </div>
  </div>

  <div className="flex items-center mt-4">
  <input
  type="number"
  className="bg-[#F5F4FF] w-[31px] h-10 text-center mr-4 text-[16px] font-[400] leading-[19.5px] tracking-[0.015em]  font-montserrat"
  min="1"
  max="3"
  placeholder="03"
/>

    <div className="bg-[#F5F4FF] p-3 text-[16px] font-montserrat h-10 w-[677px]">
      involving design, functionality implementation, and database management.
    </div>
  </div>
  <p className='mt-8 text-[16px] font-montserrat opacity-60 text-darkblue'>Check your answers, once you submit your choice it cannot be edited!</p>
  <button  onClick={handleNavigation}
  className="relative w-36 h-12 py-1 px-4 border border-grey my-8  bg-white">
            <span className="absolute inset-0 border-[0.5px] border-blackish transform -translate-x-1 translate-y-1 bg-purp z-0"></span>
            <span className="absolute inset-0 border-[0.5px] border-blackish bg-white z-10 flex items-center justify-center"></span>
            <span className="relative z-20 font-montserrat text-lg font-semibold text-blackish">Finish</span>
          </button><span className='ml-6 text-xl text-darkblue opacity-60 font-montserrat'>02/10</span>
</div>
   <Summary/>
   </div>

    </div>

  )
}
