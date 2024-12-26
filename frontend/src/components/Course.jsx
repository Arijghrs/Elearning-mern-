import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating'; // Ensure this component exists and is correctly implemented
import Button from './Button'; // Ensure this component exists and is correctly implemented

const Course = () => {
  const navigate = useNavigate();

  // State to store courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/course/getcourses'); // Replace with your actual API endpoint
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();

      console.log(data); // Debug API response

      // Ensure data is an array; handle unexpected formats
      if (!Array.isArray(data)) {
        console.error('Unexpected data format:', data);
        throw new Error('Unexpected data format');
      }

      setCourses(data); // Update state with the fetched courses
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnrollClick = () => {
    navigate(`/CourseDiscussion`); // Navigate to the course discussion page
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;
  if (courses.length === 0) return <div>No courses available at the moment.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 w-full h-auto flex flex-col justify-between shadow-lg rounded-lg"
          >
            {course.image && (
              <img
                src={course.image}
                alt={course.title || 'Course Image'}
                className="h-40 w-full object-cover mb-4 rounded"
              />
            )}
            <div className="flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="font-semibold text-lg sm:text-xl">{course.title || 'No Title'}</h2>
                <h3 className="text-sm sm:text-md text-gray-500">{course.subtitle || 'No Subtitle'}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  {course.description || 'No description available.'}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button name="Enroll" color="purp" onClick={() => handleEnrollClick(course)} />
                <div className="flex flex-col items-start sm:ml-4">
                  <p className="text-darkBlue text-lg sm:text-[22px] font-caprasimo font-normal mt-1 ml-7">
                    {course.price ? `${course.price} 000 DT` : 'Price not available'}
                  </p>
                  {course.rate !== undefined && <Rating rate={course.rate} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
