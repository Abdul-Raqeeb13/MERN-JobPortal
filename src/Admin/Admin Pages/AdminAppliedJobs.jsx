import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function AdminAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchadminAppliedJobs = async () => {
      const token = localStorage.getItem('Token');
      const userId = localStorage.getItem('UserID');

      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/admin/adminappliedjobs`,
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.success) {
          setJobs(response.data.data);
        } else {
          setError('No any job yet');
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching jobs");
      }
    };

    fetchadminAppliedJobs();
  }, []);

  return (
    <Background>
      <Heading>Users Applied Jobs</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Container>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job._id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobDetails>
                <DetailItem><strong>Location : </strong> {job.location}</DetailItem>
                <DetailItem><strong>Experience : </strong> {job.experience}</DetailItem>
                <DetailItem><strong>Salary : </strong> {job.salary}</DetailItem>
                <DetailItem><strong>Status : </strong> {job.status}</DetailItem>
                <small>Applied At : {new Date(job.appliedAt).toLocaleDateString()}</small>
              </JobDetails>
            </JobCard>
          ))
        ) : (
          !error && <NoJobsMessage>No jobs available</NoJobsMessage>
        )}
      </Container>
    </Background>
  );
}

// Styled components for styling job cards

const Background = styled.div`
  background-color: #000000; /* Black background */
  min-height: 100vh;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: #FFD700; /* Gold color for the heading */
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.p`
  color: #FF6347; /* Light red for error message */
  text-align: center;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const JobCard = styled.div`
  background-color: #1A1A1A; /* Dark gray background */
  border: 1px solid #FFD700; /* Gold border */
  border-radius: 8px;
  padding: 20px;
  width: 45%;
  max-width: 500px;
  color: #FFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 50%, #FFD700 50%);
    opacity: 0.05; /* Thin gold accent line */
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFD700; /* Gold color for title */
  margin-bottom: 5px;
`;

const CompanyName = styled.h4`
  font-size: 1.1rem;
  color: #CCCCCC; /* Light gray for company name */
  margin-bottom: 15px;
`;

const JobDetails = styled.div`
  font-size: 0.9rem;
  color: #E0E0E0; /* Light gray for details */
  line-height: 1.6;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #E0E0E0; /* Light gray color for individual detail items */
`;

const NoJobsMessage = styled.p`
  color: #AAAAAA;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;
