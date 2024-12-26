import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    Category: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    Mentor: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    Experience: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    Description: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    price: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    skills: {
      type: String,
      required: true,  // You can make it required if necessary
    },
    image: {  // New image attribute
      type: String,  // You can store the image URL or path as a string
      default: "https://images.ctfassets.net/63bmaubptoky/4kg3HnPTXf2nNRtcPeHeX7_NSpSySwVxtc-FWUJpKYI/be40d928319bc71df63fae3e0f842cac/Capterra-creation-cours-en-ligne.png",  // Optional default image if none provided
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
