import Layout from '../components/Layout';
import AddCourseList from "../components/addCourseList";
import AddVideoPopup from "../components/addVideoPopup";
import AddQuizPopup from "../components/addQuizPopup";
import AddCertificatePopup from "../components/addCertificatePopup";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AddCourse() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [imageInput, setImageInput] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    mentor: '',
    category: '',
    experience: '',
    description: '',
    price: '',
    skills: '',
    duration: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/mentor/mentors`);
        const data = await response.json();
        const mentors = data.filter(user => user.role === 'mentor');
        setUsers(mentors);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageInput(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocumentName(file.name);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageInput(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Course data saved:', courseData);
    // Add API call to save the course data
  };

  const handleCancel = () => navigate('/coursesdash');

  return (
    <div>
      <Layout>
        <div className="flex bg-neutral-50 ml-5 w-[1100px]">
          <div className="ml-20 mt-8">
            <div className="flex items-center">
              <h1 className="text-3xl text-gray-700 font-montserrat">Add Course</h1>
              <button
                onClick={handleCancel}
                className="text-base text-violet-400 ml-4 font-montserrat"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 flex gap-8 w-full bg-white p-6">
              {/* Left Section */}
              <div className="w-1/2">
                <h2 className="text-2xl font-montserrat mb-4">Course Info</h2>
                <input
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  className="border p-3 w-full mt-4 text-sm"
                  placeholder="Course title"
                />
                <select
                  name="mentor"
                  value={courseData.mentor}
                  onChange={handleInputChange}
                  className="border p-3 w-full mt-4 text-sm"
                >
                  <option value="">Select Mentor</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="border p-3 w-full mt-4 text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <input
                  name="experience"
                  value={courseData.experience}
                  onChange={handleInputChange}
                  className="border p-3 w-full mt-4 text-sm"
                  placeholder="Experience level"
                />
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="border p-3 w-full mt-4 text-sm resize-none"
                  placeholder="Description"
                ></textarea>
                <input
                  name="skills"
                  value={courseData.skills}
                  onChange={handleInputChange}
                  className="border p-3 w-full mt-4 text-sm"
                  placeholder="Skills you will learn"
                />
                <div className="flex gap-2 mt-4">
                  <input
                    name="duration"
                    value={courseData.duration}
                    onChange={handleInputChange}
                    className="border p-3 w-full text-sm"
                    placeholder="Duration"
                  />
                  <span>Minutes</span>
                </div>
                <button
                  onClick={handleSave}
                  className="mt-6 px-6 py-2 bg-purple-500 text-white font-montserrat"
                >
                  Save
                </button>
              </div>
              {/* Right Section */}
              <div className="w-1/2">
                <div
                  className="border w-full h-60 bg-gray-100 flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('imageFileInput').click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    id="imageFileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  {imageInput ? (
                    <img src={imageInput} alt="Uploaded" className="h-full w-full object-contain" />
                  ) : (
                    <div>Drag and drop or click to upload an image</div>
                  )}
                </div>
                <div className="mt-4">
                  <input
                    id="documentFileInput"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={handleDocumentChange}
                  />
                  <button
                    className="w-full border p-3 text-sm"
                    onClick={() => document.getElementById('documentFileInput').click()}
                  >
                    {documentName || 'Upload document'}
                  </button>
                </div>
                <div className="mt-4">
                  <input
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    className="border p-3 w-full text-sm"
                    placeholder="Price"
                  />
                  <span>TND</span>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl mb-4">Course Elements</h2>
                  <div className="flex gap-4">
                    <AddVideoPopup />
                    <AddQuizPopup />
                    <AddCertificatePopup />
                  </div>
                  <div className="mt-6">
                    <AddCourseList category="video" title="Introduction" />
                    <AddCourseList category="video" title="Chapter 1" />
                    <AddCourseList category="quiz" title="Quiz 1" />
                    <AddCourseList category="certificate" title="Completion Certificate" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
