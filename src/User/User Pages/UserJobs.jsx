import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: 	 #000000; /* Full-page dark background */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 10px;
`;

const JobCard = styled.div`
  background: linear-gradient(135deg, #333333 50%, #FFA500 50%);
  border-radius: 15px;
  padding: 25px;
  width: 350px;
  height: 300px; /* Fixed height for consistent card size */
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  &::before, &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 10px;
    background: #FFA500;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #FFA500;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #CCCCCC;
  margin: 10px 0;
`;

const JobDetails = styled.p`
  font-size: 0.9rem;
  color: #AAAAAA;
  line-height: 1.6;
`;

const ApplyButton = styled.button`
  background-color: #FFA500;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF8C00;
  }
`;

const UserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('Token');
      const userId = localStorage.getItem('UserID');

      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/userViewJobs?userId=${userId}`,
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.success) {
          setJobs(response.data.data);
        } else {
          setError('Jobs not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const userId = localStorage.getItem("UserID");
    const token = localStorage.getItem('Token');

    const jobAndUserID = {
      jobId,
      userId
    };

    try {
      const response = await axios({
        method: "POST",
        url: 'http://localhost:8000/user/applyjob',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
        data: JSON.stringify(jobAndUserID)
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Job applied successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      } else {
        toast.warn("Unexpected response from server. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to apply for the job.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <PageWrapper>
      <ToastContainer />
      <h1 className='text-center my-4' style={{ color: 'white' }}>Available Jobs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Container>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job._id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobDetails>
                <strong>Location : </strong> {job.location} <br />
                <strong>Experience : </strong> {job.experience} <br />
                <strong>Salary : </strong> {job.salary} <br />
              </JobDetails>
              <ApplyButton onClick={() => handleApply(job._id)}>Apply Now</ApplyButton>
            </JobCard>
          ))
        ) : (
          <p style={{ color: 'white' }}>No jobs available</p>
        )}
      </Container>
    </PageWrapper>
  );
};

export default UserJobs;
