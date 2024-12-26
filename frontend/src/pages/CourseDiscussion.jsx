import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Summary from "../components/summary.jsx";
import  courseVideo  from '../assets/Node.js Ultimate Beginner’s Guide in 7 Easy Steps.mp4'; 
import Discussion from '../components/Discussion';
import About from '../components/About';

const CourseDiscussion = () => {
  const [activeTab, setActiveTab] = useState('about'); 
  const navigate = useNavigate(); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = () => {
    navigate('/payment'); // Redirect to the checkout page
  };

  return (
    <div className="flex justify-between">
      <div className="w-[70%]">
        <div className='h-[569px] bg-blur'>
          <div className="relative w-full h-[569px]">
          <video
         src={courseVideo}  // Remplacez `courseVideo` par l'URL de la vidéo
         alt="Course Video"
         className="w-full h-full object-cover"
         controls  // Ajoute les contrôles pour lire/pause, volume, etc.
              >
             </video>
          </div>
          <div className="absolute top-20 pt-20 pl-10 w-[65%] h-28">
            <div className="flex items-center mt-80">
              <button 
                onClick={handleClick} 
                className="relative w-52 h-12 py-1 px-5 border border-blackish border-0.5 bg-white cursor-pointer shadow-purple-400 hover:transform hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-purple-500"
              >
                <span className="absolute inset-0 border border-blackish transform -translate-x-1 translate-y-1 bg-purp z-0"></span>
                <span className="absolute inset-0 border border-blackish bg-white z-10"></span>
                <span className="relative z-20 text-lg font-caprasimo text-black">Enroll Now</span>
              </button> 
            </div>
          </div>
        </div>
        <div className="h-28 flex items-center">
          <ul className="font-caprasimo flex space-x-20 ml-16">
            <li
              className={`text-[23px] cursor-pointer ${activeTab === 'about' ? 'text-darkBlue font-bold' : 'text-gray-500'}`}
              onClick={() => handleTabClick('about')}
            >
              About
            </li>
            <li
              className={`text-[23px] cursor-pointer ${activeTab === 'discussion' ? 'text-darkBlue font-bold' : 'text-gray-500'}`}
              onClick={() => handleTabClick('discussion')}
            >
              Discussion
            </li>
          </ul>
        </div>

        {/* Conditionally render components based on activeTab */}
        {activeTab === 'about' && <About />}
        {activeTab === 'discussion' && <Discussion />}
      </div>
      <Summary />
    </div>
  );
};

export default CourseDiscussion;
