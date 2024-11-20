import axios from 'axios';
import { Job } from '../types'; // Replace with the correct path to your Job type

const API_URL = 'https://localhost:7092/api/Jobs'; // Replace with your API endpoint

/**
 * Fetches the list of jobs from the server.
 * @returns {Promise<Job[]>} A promise that resolves to an array of Job objects.
 */
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get<Job[]>(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add custom CORS-related headers if necessary (but these are usually set by the server)
        'Access-Control-Allow-Origin': '*',  // This is typically set by the server, not client
        // Add any other headers if needed, like Authorization
      },
    });

    return response.data; // Return the list of jobs
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error; // Rethrow the error for further handling
  }
};


/**
 * Posts a new job to the server.
 * @param {Job} job - The job object to be added.
 * @returns {Promise<Job>} A promise that resolves to the newly created job object.
 */
export const createJob = async (job: Job): Promise<Job> => {
  try {
    const response = await axios.post<Job>(API_URL, job, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // This is typically set by the server
        // Add any other headers if needed, like Authorization
      },
    });

    return response.data; // Return the created job
  } catch (error) {
    console.error('Error creating job:', error);
    throw error; // Rethrow the error for further handling
  }
};