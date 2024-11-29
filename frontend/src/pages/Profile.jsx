import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile from '../assets/profile.png';
import certif from '../assets/certification.jpeg';
import course1 from '../assets/course1.png';
import Rating from '../components/Rating';
import { useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  console.log('Profile component rendered');
  const [activeSlide, setActiveSlide] = useState(0);
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null)

  const profiles = [
    {
      id: 1,
      title: 'Introduction to Web Development 101',
      subtitle: 'Jane Doe',
      image: profile,
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'Received on 16-06-2023',
      image: certif,
    },
    {
      id: 2,
      title: 'Received on 16-06-2023',
      image: certif,
    },
    {
      id: 3,
      title: 'Received on 16-06-2023',
      image: certif,
    },
  ];

  const progressCards = [
    {
      id: 1,
      title: 'Introduction to Web Development 101',
      subtitle: 'Jane Doe',
      image: course1,
      progress: 75
    },
    {
      id: 2,
      title: 'Introduction to Web Development 101',
      subtitle: 'Jane Doe',
      image: course1,
      progress: 50
    }
  ];

  const cards = [
    {
      id: 1,
      title: 'Leadership, Team and Project Management',
      subtitle: 'John Blake Doe',
      description: 'Learn about leadership, team dynamics, and project management essentials with John Blake Doe.',
      image: course1,
      rate: 4,
      price: '80.000',
    },
    {
      id: 2,
      title: 'Leadership, Team and Project Management',
      subtitle: 'John Blake Doe',
      description: 'Learn about leadership, team dynamics, and project management essentials with John Blake Doe.',
      image: course1,
      rate: 4,
      price: '80.000',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '70px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index) => setActiveSlide(index),
  };

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !sliderRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offset = e.clientX - rect.left;

      if (offset > rect.width * 0.8) {
        sliderRef.current.slickNext();
      } else if (offset < rect.width * 0.2) {
        sliderRef.current.slickPrev();
      }
    };

    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };

  //firebase rules 
  /*   allow read;
       allow write: if
       request.resource.size < 2 * 1024 * 1024 &&
       request.resource.contentType.matches('image/.*')*/

       const containerRef = useRef(null);
       const sliderRef = useRef(null);
       const [file, setFile] = useState(undefined);
       const [filePerc, setFilePerc] = useState(0);
       const [fileUploadError, setFileUploadError] = useState(false);
       const [formData, setFormData] = useState({});
       console.log(file);
     


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };



  return (
    <div className='w-full'>
      <div className="font-caprasimo text-4xl leading-[55.05px] font-normal ml-12 mt-10">
        Welcome back {currentUser.username}
      </div>

      {profiles.map((profile) => (
        <div key={profile.id} className="flex justify-between items-center w-[100%] h-[800px]">
          <div className="flex justify-center items-center w-1/2 h-full">
            <div className="w-[390px] h-[650px] border flex flex-col justify-center items-center">
              <div className="relative w-52 h-52 mb-12 mt-4 items-center mx-auto">
                <span className="absolute inset-0 w-full h-full border border-black rounded-full transform -translate-x-1 translate-y-1 bg-[#FDEE6D] z-0"></span>
                <span className="absolute inset-0 w-full h-full border border-black rounded-full bg-white z-10"></span>
                <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
                <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="relative z-20 h-full w-full object-cover rounded-full" />
                <p className='text-sm self-center'>
                  {fileUploadError ? (
                    <span className='text-red-700'>
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span className='text-green-700'>Image successfully uploaded!</span>
                  ) : (
                    ''
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-1 bg-blue-500" style={{ width: '60%' }}></div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  className="border border-grey px-4 shadow-shdInset max-lg:mb-4 mb-4 h-16 font-monteserrat text-[20px] focus:outline-none placeholder-gray-500 placeholder-opacity-50 w-[90%]"
                  defaultValue={currentUser.username}
                  placeholder="Moatez Saii"
                  type="text"
                  id="username"
                  onChange={handleChange}
                />
                <input
                  className="border border-grey px-4 shadow-shdInset max-lg:mb-4 mb-4 h-16 font-monteserrat text-[20px] focus:outline-none placeholder-gray-500 placeholder-opacity-50 w-[90%]"
                  placeholder="Moatezsaii@gmail.com"
                  defaultValue={currentUser.email}
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
                <input
                  className="border border-grey px-4 shadow-shdInset max-lg:mb-4 mb-8 h-16 font-monteserrat text-[20px] focus:outline-none placeholder-gray-500 placeholder-opacity-50 w-[90%]"
                  placeholder="+216 55 456 521"
                  defaultValue={currentUser.phone}
                  type="tel"
                  id="tel"
                  onChange={handleChange}
                />

                <div className="flex justify-between items-center w-full">
                  <button disabled={loading} className="relative w-[90%] h-14 py-1 px-auto mx-auto border border-grey text-black font-semibold bg-white">
                    <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-[#FDEE6D] z-0"></span>
                    <span className="absolute inset-0 border border-black bg-white z-10"></span>
                    <span className="relative z-20 font-caprasimo text-xl font-normal">{loading ? 'Loading...' : 'Update'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>



          <div className="flex flex-col items-center w-1/2 h-full pt-9">
            <div className="font-caprasimo text-4xl font-normal mt-28 mb-7">Badges</div>
            <div className="relative w-[350px] h-[350px] flex justify-center items-center rounded-full border border-black my-2">
              <div className="relative w-[270px] h-[270px] flex justify-center items-center rounded-full border border-black bg-blueBadge">
                <div className="font-caprasimo text-5xl text-white text-center">
                  Level <br /> 16
                </div>
              </div>
            </div>
            <div className="font-caprasimo text-4xl mb-4 text-[#2C3439] py-auto">Rank:005</div>
          </div>
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative">
        <div className="font-caprasimo text-5xl pl-16 leading-10 font-normal mb-8">
          Your Progress
        </div>
        <div ref={containerRef} className="relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Slider ref={sliderRef} {...settings}>
            {progressCards.map((card) => (
              <div key={card.id} className="px-1">
                <div className="bg-white p-4 w-[370px] h-[450px] flex flex-col justify-between">
                  <div className="relative">
                    <img src={card.image} alt={card.title} className="h-40 w-full object-cover mb-4" />
                    <div className="absolute bottom-0 left-0 w-full">
                      <div className="relative -top-4 w-full h-3 bg-gray-200 bg-opacity-30">
                        <div className="absolute -top-0 h-full bg-[#A19EF780] bg-opacity-30" style={{ width: `${card.progress}%` }}></div>
                      </div>
                      <span className="absolute right-0 font-bright -top-12 text-white text-3xl">{card.progress}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow mt-4">
                    <h2 className="font-semibold text-xl">{card.title}</h2>
                    <h3 className="text-md text-gray-500">{card.subtitle}</h3>
                    <div className="flex justify-between items-center mt-6">
                      <button className="relative w-34 h-12 py-1 px-3 border border-black text-black font-semibold bg-white">
                        <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-[#a19ef7] z-0"></span>
                        <span className="absolute inset-0 border border-black bg-white z-10"></span>
                        <span className="relative z-20 font-caprasimo text-2xl font-normal">Continue</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="font-caprasimo text-5xl pl-16 leading-10 font-normal mb-8">
          Certificates
        </div>
        <div ref={containerRef} className="relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Slider ref={sliderRef} {...settings}>
            {certificates.map((certificate) => (
              <div key={certificate.id} className="px-1">
                <div className="bg-white p-4 w-[370px] h-[420px] flex flex-col justify-between">
                  <img src={certificate.image} alt={certificate.title} className="h-65 w-full object-cover mb-4" />
                  <div className="flex flex-col flex-grow">
                    <h2 className="font-oleo text-xl text-[#171717B8] text-center">{certificate.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="font-caprasimo text-5xl pl-16 leading-10 font-normal mb-8">
          Your Wishlist
        </div>
        <div ref={containerRef} className="relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Slider ref={sliderRef} {...settings}>
            {cards.map((card, index) => (
              <div key={card.id} className={`px-1 ${index === activeSlide ? 'active' : ''}`}>
                <div className="bg-white p-4 w-[370px] h-[450px] flex flex-col justify-between">
                  <img src={card.image} alt={card.title} className="h-40 w-full object-cover mb-4" />
                  <div className="flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h2 className="font-semibold text-xl">{card.title}</h2>
                      <h3 className="text-md text-gray-500">{card.subtitle}</h3>
                      <p className="text-gray-600 mt-2">{card.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="relative w-32 h-12 py-1 px-3 border border-black text-black font-semibold bg-white">
                        <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-[#a19ef7] z-0"></span>
                        <span className="absolute inset-0 border border-black bg-white z-10"></span>
                        <span className="relative z-20 font-caprasimo text-2xl font-normal">Enroll</span>
                      </button>
                      <div className="flex items-center ml-4 flex-col">
                        <p className="font-caprasimo text-gray-800 mt-2 text-2xl">{card.price}DT</p>
                        <Rating rate={card.rate} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="flex justify-between items-center ml-12 mb-16 mt-24">
        <button onClick={handleSignOut} className="relative w-96 h-16 py-1 px-3 border border-black text-black font-semibold bg-white">
          <span className="absolute inset-0 border border-black transform -translate-x-1 translate-y-1 bg-[#CF1F30] z-0"></span>
          <span className="absolute inset-0 border border-black bg-white z-10"></span>
          <span className="relative z-20 font-caprasimo text-2xl font-normal">LOG OUT</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
