const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); 
// Define schema for applied jobs
// const appliedJobsSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },  // Unique user ID
//   jobs: [{ 
//     type: Object,  // Job details will be stored as an object (entire jobData with additional fields)
//     required: true
//   }]
// });

const appliedJobsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },  // Unique user ID
  jobs: [{ 
    type: Object,
    required: true
  }]
});



// Export the model
const AppliedJobs = mongoose.model('AppliedJobs', appliedJobsSchema);

// Find user by userId
exports.findUser = (userId) => AppliedJobs.findOne({ userId });

exports.getall = () => AppliedJobs.find();

// Update user jobs array by pushing the entire job object
exports.updateUserJobs = (userId,useremail, jobdata) => {
    return AppliedJobs.updateOne(
        { userId },
        { $push: { jobs: jobdata } }  // Use $push to append the full job object to the jobs array
    );
};

// Create a new user with the full job object
exports.createUserWithJob = (userId,useremail, jobdata) => {
    const newUser = new AppliedJobs({
        userId,
        jobs: [jobdata]  // Add the first full job object to the array
    });
    return newUser.save();
};


// exports.createUserWithJob = (userId, jobdata) => {
//   // Create a new ObjectId from the provided userId
//   const newUser = new AppliedJobs({
//       userId, // Convert userId to ObjectId
//       jobs: [jobdata]  // Add the first full job object to the array
//   });
//   return newUser.save();
// };