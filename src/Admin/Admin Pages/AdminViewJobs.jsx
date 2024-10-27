import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #f8f9fa;
`;

const JobCard = styled.div`
  background: linear-gradient(135deg, #6DD5FA, #FFFFFF);
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #007BFF;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
`;

const JobDetails = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.6;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const AdminViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('Token');
      
      try {
        const response = await axios({
          method: "GET",
          url: 'http://localhost:8000/admin/adminviewjobs',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.success) {
          setJobs(response.data.data); // Assuming the jobs are returned in `data`
        } else {
          setError('Jobs not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem('Token');
    
    // try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8000/admin/admindeletejobs/?id=${jobId}`, // Send ID as a query parameter
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
      });
  
      if (response.data.success) {
        // Filter out the deleted job from the state
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId)); // Ensure you're comparing the correct field (`_id`)
      } else {
        setError('Failed to delete job');
      }
    // } catch (error) {
    //   console.error(error);
    //   setError('An error occurred while deleting');
    // }
  };
  


  return (
    <>
      <h1>Admin View Jobs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Container>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job.id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobDetails>
                <strong>Location:</strong> {job.location} <br />
                <strong>Experience:</strong> {job.experience} <br />
                <strong>Salary:</strong> {job.salary} <br />
              </JobDetails>
              <DeleteButton onClick={() => handleDelete(job._id)}>Delete Job</DeleteButton>
            </JobCard>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </Container>
    </>
  );
};

export default AdminViewJobs;
