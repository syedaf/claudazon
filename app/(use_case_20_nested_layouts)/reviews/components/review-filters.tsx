'use client';

import { useState } from 'react';

export function ReviewFilters() {
  const [filters, setFilters] = useState({
    rating: 'all',
    timeframe: 'all',
    verified: false,
  });

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-slate-700">Rating:</label>
        <select
          value={filters.rating}
          onChange={e => setFilters({ ...filters, rating: e.target.value })}
          className="border border-slate-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-slate-700">Time:</label>
        <select
          value={filters.timeframe}
          onChange={e => setFilters({ ...filters, timeframe: e.target.value })}
          className="border border-slate-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={filters.verified}
          onChange={e => setFilters({ ...filters, verified: e.target.checked })}
          className="rounded border-slate-300"
        />
        <span className="text-sm font-medium text-slate-700">
          Verified Only
        </span>
      </label>

      <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
}