import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";



export const getMentors = async (req, res, next) => {
  try {
    const { search } = req.query;

    let query = { role: 'mentor' };

    if (search) {
      const searchRegex = new RegExp(`^${search}`, 'i');
      query = {
        ...query,
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { phone: { $regex: searchRegex } }
        ]
      };
    }

    const mentors = await User.find(query);
    res.status(200).json(mentors);
  } catch (error) {
    next(error);
  }
};



export const addMentor = async (req, res, next) => {
  try {
    const mentorData = req.body;

    
    if (mentorData.password) {
      mentorData.password = bcryptjs.hashSync(mentorData.password, 10);
    }

    mentorData.role = "mentor";

    const mentor = new User(mentorData);

    await mentor.save();

    return res.status(201).json({
      message: "Mentor created successfully.",
      mentor,
    });
  } catch (error) {
    next(error);
  }
};