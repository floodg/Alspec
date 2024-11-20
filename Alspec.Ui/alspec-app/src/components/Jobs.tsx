import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/JobManagementService';
import { Job } from '../types';
import JobForm from './JobForm'; // Import the JobForm component

const Jobs = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false); // State to toggle the form

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      const res = await fetchJobs();
      setJobs(res);
      setIsDataFetched(true);
    } catch (err) {
      console.error(err);
    }
  }

  function handleAddJob(newJob: Job) {
    setJobs((prevJobs) => (prevJobs ? [...prevJobs, newJob] : [newJob]));
    setIsAddingJob(false); // Hide the form after adding the job
  }

  if (!isDataFetched && !jobs) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddingJob(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Job
        </button>
      </div>
      {isAddingJob ? (
        <JobForm onAddJob={handleAddJob} onCancel={() => setIsAddingJob(false)} />
      ) : (
        <div className="grid grid-cols-3 gap-0 border border-black">
          {/* Header Row */}
          <div className="font-bold border border-black p-2">JobId</div>
          <div className="font-bold border border-black p-2">Title</div>
          <div className="font-bold border border-black p-2">Description</div>

          {/* Job Rows */}
          {jobs?.map((job) => (
            <>
              <div className="border border-black p-2">{job.id}</div>
              <div className="border border-black p-2">{job.title}</div>
              <div className="border border-black p-2">{job.description}</div>

              {/* Subitems */}
              {job.subItems && job.subItems.length > 0 && (
                <div className="col-start-2 col-span-2 border border-black">
                  {job.subItems.map((subItem) => (
                    <div
                      key={subItem.itemId}
                      className={`p-2 rounded ${
                        subItem.status === 'Pending'
                          ? 'bg-green-100'
                          : subItem.status === 'In Progress'
                          ? 'bg-yellow-100'
                          : ''
                      }`}
                    >
                      <div className="text-sm font-medium">{subItem.title}</div>
                      <div className="text-xs text-gray-500">
                        {subItem.description}
                      </div>
                      <div className="text-xs text-gray-700 font-semibold">
                        Status: {subItem.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
