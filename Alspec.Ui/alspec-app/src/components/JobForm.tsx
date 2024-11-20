import { useState } from 'react';
import { Job, SubItem } from '../types';
import { createJob } from '../services/JobManagementService'; // Import the createJob function

interface JobFormProps {
  onAddJob: (newJob: Job) => void;
  onCancel: () => void;
}

const JobForm = ({ onAddJob, onCancel }: JobFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subItems, setSubItems] = useState<SubItem[]>([]);

  const handleAddSubItem = () => {
    setSubItems((prev) => [
      ...prev,
      { itemId: 0, title: '', description: '', status: 'Pending' },
    ]);
  };

  const handleSubItemChange = (
    index: number,
    key: keyof SubItem,
    value: string
  ) => {
    setSubItems((prev) =>
      prev.map((subItem, i) =>
        i === index ? { ...subItem, [key]: value } : subItem
      )
    );
  };

  const handleSubmit = async () => {
    const newJob: Job = {
      id: 0,
      title,
      description,
      subItems,
    };

    try {
      const createdJob = await createJob(newJob); // Call the API to create the job
      onAddJob(createdJob); // Update the job list with the newly created job
      setTitle(''); // Reset form fields
      setDescription('');
      setSubItems([]);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="p-4 border border-black rounded bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Add Job</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">SubItems</h3>
        {subItems.map((subItem, index) => (
          <div key={index} className="mb-2">
            <input
              className="w-1/3 p-2 border border-gray-300 rounded mr-2"
              placeholder="SubItem Title"
              value={subItem.title}
              onChange={(e) =>
                handleSubItemChange(index, 'title', e.target.value)
              }
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded mr-2"
              placeholder="SubItem Description"
              value={subItem.description}
              onChange={(e) =>
                handleSubItemChange(index, 'description', e.target.value)
              }
            />
            <select
              className="p-2 border border-gray-300 rounded"
              value={subItem.status}
              onChange={(e) =>
                handleSubItemChange(index, 'status', e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
        <button
          onClick={handleAddSubItem}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add SubItem
        </button>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JobForm;
