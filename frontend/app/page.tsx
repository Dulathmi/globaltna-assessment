'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('');

  const fetchJobs = async () => {
    try {
      let url = 'http://localhost:5000/api/jobs';
      if (category) {
        url += `?category=${category}`;
      }
      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <main className="max-w-4xl mx-auto px-6">
      
      {/* High-Vibrancy Glow Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl p-8 shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-10 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-indigo-400/30">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-1 bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
            Service Request Board
          </h1>
          <p className="text-indigo-100 font-medium text-sm max-w-md leading-relaxed">
            Review live client requests, track project statuses, or post a new request instantly.
          </p>
        </div>
        <Link href="/new-job" className="relative z-10 bg-cyan-400 text-slate-950 px-6 py-3.5 rounded-xl font-extrabold shadow-[0_4px_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300 hover:scale-[1.02] active:scale-[0.98] transition transform whitespace-nowrap text-sm tracking-wide">
          ✨ Post a Request
        </Link>
      </div>

      {/* Styled Filter Control */}
      <div className="mb-10 max-w-xs">
        <label className="block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2.5">
          Filter by Category
        </label>
        <div className="relative">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3.5 border border-slate-800 rounded-xl bg-slate-900 text-slate-200 font-semibold focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition cursor-pointer appearance-none shadow-inner"
          >
            <option value="">📁 All Categories</option>
            <option value="Plumbing">🔧 Plumbing</option>
            <option value="Electrical">⚡ Electrical</option>
            <option value="Painting">🎨 Painting</option>
            <option value="Joinery">🪚 Joinery</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {jobs.length === 0 ? (
        <div className="border border-slate-800 rounded-2xl p-12 text-center bg-slate-900/50 backdrop-blur-md max-w-md mx-auto my-8 shadow-xl">
          <div className="text-5xl mb-4 animate-bounce">📭</div>
          <h3 className="text-xl font-bold text-slate-200 mb-1">No requests active</h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            There are currently no active service requests listed under this category.
          </p>
          <Link href="/new-job" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition underline tracking-wide">
            Create a request now →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="border border-slate-800/80 rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-slate-950 hover:border-slate-700 shadow-md hover:shadow-[0_0_20px_rgba(51,65,85,0.2)] transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition duration-200 line-clamp-1">{job.title}</h2>
                  <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border whitespace-nowrap shadow-sm ${
                    job.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    job.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed font-normal">{job.description}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 border-t border-slate-900 pt-4 mb-4">
                  <span className="flex items-center gap-1.5 text-slate-300">📍 {job.location}</span>
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300 text-[11px]">{job.category}</span>
                </div>
                
                <Link href={`/jobs/${job._id}`} className="block text-center text-xs font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 py-3 rounded-xl hover:bg-cyan-400 hover:text-slate-950 transition duration-200 tracking-wide">
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}