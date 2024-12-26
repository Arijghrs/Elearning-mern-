import Layout from '../components/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AddMentor() {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/mentor/addMentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorData),
      });
  
      const data = await res.json();
  
      if (!data.success) {
        console.error('Error:', data.message);
        return;
      }
  
      console.log('Mentor added successfully:', data);
      navigate('/mentors');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  function onClose() {
    navigate('/mentors');
  }

  return (
    <div>
      <Layout>
        <div className="flex bg-neutral-50 ml-5 w-[1100px]">
          <div className="ml-20 mt-8 ">
            <div className="flex">
              <div className="text-3xl text-gray-700 font-montserrat font-normal mr-2">
                Add Mentor
              </div>
            </div>
            <div className="mt-4 flex gap-24 w-[850px] h-[580px] bg-white">
              <div className="pt-6">
                <div className="text-black text-2xl font-montserrat font-normal ml-4">
                  Add info about the new mentor
                </div>
                <form onSubmit={handleSubmit} className="mt-4 ml-8">
                  <div>
                    <input
                      className="border broder-1 p-3 border-gray-400 shadow-shdInsetPurp h-11 w-[320px] mt-4 mb-4 text-sm font-monteserrat outline-none"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={mentorData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="border broder-1 p-3 border-gray-400 shadow-shdInsetPurp h-11 w-[320px] mt-4 mb-4 text-sm font-monteserrat outline-none"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={mentorData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="border broder-1 p-3 border-gray-400 shadow-shdInsetPurp h-11 w-[320px] mt-4 mb-4 text-sm font-monteserrat outline-none"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={mentorData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="border broder-1 p-3 border-gray-400 shadow-shdInsetPurp h-11 w-[320px] mt-4 mb-4 text-sm font-monteserrat outline-none"
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={mentorData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="transform transition duration-300 hover:translate-y-2 pr-2 py-2 border shadow-shdB text-[14px] h-9 ml-20 -mt-28 w-[119px] font-monteserrat text-darkgray"
                  >
                    <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-purp z-0"></span>
                    <span className="absolute inset-0 border border-black bg-white z-10"></span>
                    <span className="relative z-20 text-black">Save</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-base text-violet-400 mt-2 mx-2 font-montserrat font-normal"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
