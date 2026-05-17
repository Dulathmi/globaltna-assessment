'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function JobDetail() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${params.id}`);
      setJob(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchJobDetails();
    }
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/jobs/${params.id}`, { status: newStatus });
      setJob(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job request?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${params.id}`);
      router.push('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete job request');
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading details...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!job) return <p className="text-center py-10 text-gray-500">Job not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Board
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm p-6 space-y-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>📍 {job.location}</span>
              <span>📂 {job.category}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              job.status === 'Open' ? 'bg-green-100 text-green-800' :
              job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              Current: {job.status}
            </span>
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="p-1 border border-gray-300 rounded text-sm bg-white text-gray-700"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
        </div>

        <div className="bg-gray-50 p-4 border border-gray-100 rounded">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Contact Details</h2>
          <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Posted By:</span> {job.contactName}</p>
          <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> <a href={`mailto:${job.contactEmail}`} className="text-blue-600 hover:underline">{job.contactEmail}</a></p>
        </div>

        <div className="border-t pt-4 flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition"
          >
            Delete Request
          </button>
        </div>
      </div>
    </main>
  );
}