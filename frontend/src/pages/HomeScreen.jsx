import React, { useEffect, useState } from 'react';
import Profile from '../assets/profile.png';
import Rating from '../components/Rating';
import Button from '../components/Button';
import mentor1 from '../assets/Mentor.png';
import Partners from '../components/Partners';
import Topfooter from '../components/TopFooter';

const HomeScreen = () => {
    const [mentors, setMentors] = useState([]); // State to hold the fetched mentors
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        // Fetch mentors data
        const fetchMentors = async () => {
            try {
                const response = await fetch("/api/mentor/mentors"); // Replace with your actual API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch mentors");
                }
                const data = await response.json();
                const filteredMentors = data.filter((mentor) => mentor.role === "mentor"); // Optional: Filter if needed
                setMentors(filteredMentors); // Set mentors state
            } catch (error) {
                setError(error.message); // Handle error
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchMentors();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show loading message while fetching
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error message if fetching fails
    }

    return (
        <div className="w-full">
            <p className="text-4xl font-caprasimo text-blackish mb-4 ml-14 mt-14">Our mentors</p>
            <p className="text-xl text-[#2C3439] font-medium font-montserrat mt-6 mx-14">
                With Bright, you can now schedule an in-person course with our trusted mentors and 
                meet them whether in your school, seminars, or any event of your agreement.
            </p>
            <button className="relative w-60 h-14 py-1 px-4 border bg-white mt-6 ml-14">
                <span className="absolute inset-0 border-[0.5px] border-black transform -translate-x-1 translate-y-1 bg-purp z-0"></span>
                <span className="absolute inset-0 border-[0.5px] border-black bg-white z-10 flex items-center justify-center"></span>
                <span className="relative z-20 font-caprasimo text-lg text-blackish">In-Person Course</span>
            </button>

            <p className="text-xl font-medium font-montserrat text-[#2C3439] mt-10 ml-14">Get to Know Our Mentors</p>

            <div className="grid grid-cols-5 gap-2">
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="bg-white h-[420px] flex flex-col justify-between items-center mx-auto w-44">
                        <div className="relative w-32 h-32 mb-2 mt-8">
                            <span className="absolute inset-0 w-full h-full border border-black rounded-full transform -translate-x-1 translate-y-1 bg-[#a19ef7] z-0"></span>
                            <span className="absolute inset-0 w-full h-full border border-black rounded-full bg-white z-10"></span>
                            <img  src={mentor.avatar || Profile} alt={mentor.username} className="relative z-20 h-full w-full object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col flex-grow items-center">
                            <h2 className="font-semibold text-xl font-montserrat">{mentor.username}</h2>
                            
                            <div className="flex items-center mt-2">
                                <Rating rate={mentor.rate || 4} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='mt-64'>
                <Partners />
                <Topfooter />
            </div>
        </div>
    );
};

export default HomeScreen;
