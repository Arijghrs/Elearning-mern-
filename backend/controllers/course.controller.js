import Course from "../models/Course.model.js";

export const addCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    const course = new Course({ ...courseData });

    await course.save();

    return res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};


export const getCourses = async (req, res, next) => {
  try {
    const { search } = req.query; 
    let query = {};

    // If there's a search query, search in title and description fields
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } }, // Search in title
          { description: { $regex: search, $options: 'i' } }, // Search in description
        ],
      };
    }

    // Fetch all courses without populating the 'createdBy' field
    const courses = await Course.find(query);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses', details: error.message });
  }
};
