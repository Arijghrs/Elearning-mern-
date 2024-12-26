import React from 'react';
import Popup from './Auth';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const buttonText = "Login";
  const buttonAction = "signIn";

  // Check if the current path is the profile page
  const isProfilePage = location.pathname === '/profile';
  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-[#F5F4FF] w-full">
      <div className="container mx-auto px-12 py-3 flex justify-between items-center">
        <div className="font-caprasimo text-5xl leading-[55.05px] font-normal">
          Bright
        </div>
        <ul className="font-caprasimo flex space-x-11 mt-3">
          <li className="text-darkBlue text-[26px]">Home</li>
          <li className="text-darkBlue text-[26px]">Courses</li>
          <li className="text-darkBlue text-[26px]">Mentors</li>
          {!isProfilePage && (
            <li className="px-2 -mt-2 text-darkBlue text-[26px] rounded-none relative">
              {currentUser ? (
                <img
                  src={currentUser.avatar || 'https://via.placeholder.com/150'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full "
                  onClick={handleNavigate}
                />
              ) : (
                <Popup buttonText={buttonText} buttonAction={buttonAction} />
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
