const adminAddJobFormValidator = require("../validators/adminAddJobValidator");
const { postJob, getAllJobs, deleteJobs } = require('../models/adminModel');

exports.adminAddJobs = (async (req, res) => { 
    try {
        const { error, value } = adminAddJobFormValidator.validate(req.body);
        
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        } else {
            const jobResponse = await postJob(req.body);  // Avoid naming conflict by using 'jobResponse'
            
            if (jobResponse) {
                return res.status(201).send({  // 201: Created
                    message: "Job Posted Successfully"
                });
            } else {
                return res.status(500).send({  // 500: Internal Server Error
                    message: "Something went wrong"
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });  // Catch block with status 500 for server errors
    }
});


exports.adminViewJobs = async (req, res) => {
    try {
        const allJobs = await getAllJobs();
        
        if (allJobs && allJobs.length > 0) {
            return res.status(200).json({
                success: true,
                data: allJobs
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No jobs found."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching jobs.",
            error: error.message
        });
    }
};


exports.adminDeleteJobs = async (req, res) => {
    try {
        const { id } = req.query; // Extract job ID from query parameters

        // Check if the job ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Job ID is required',
            });
        }

        const deleteJob = await deleteJobs({ _id: id }); // Call deleteJobs function

        if (deleteJob) {
            return res.status(200).json({
                success: true,
                message: 'Job deleted successfully',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }
    } catch (error) {
        console.error(`Error deleting job ID ${req.query.id}: ${error.message}`); // Log error details
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the job',
            error: error.message, // Return error message for debugging
        });
    }
};


exports.adminAppliedJobs = async (req, res) => {
    try {

        
        
    } catch (error) {
        
    }
};