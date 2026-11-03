import { useState } from 'react';

export default function StatsSection({ stats, onFilterChange }) {
  const [timeframe, setTimeframe] = useState('all');

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    if (onFilterChange) onFilterChange(tf);
  };

  return (
    <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-6">
      {/* Header & Bộ lọc thời gian */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-200 uppercase tracking-wide">
            📊 Tổng Quan & Tiến Độ Tập Luyện
          </h2>
          <p className="text-xs text-slate-400">Theo dõi sự phát triển sức mạnh của bạn</p>
        </div>

        {/* Tab Lọc Thời Gian */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => handleTimeframeChange('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 'week' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tuần này
          </button>
          <button
            onClick={() => handleTimeframeChange('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 'month' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tháng này
          </button>
          <button
            onClick={() => handleTimeframeChange('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tất cả
          </button>
        </div>
      </div>

      {/* 3 Thẻ Chỉ Số Chính */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 font-semibold">Tổng Số Buổi Tập</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {stats?.totalWorkouts || 0} <span className="text-xs font-normal text-slate-400">buổi</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 font-semibold">Khối Lượng Tải (Volume)</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {(stats?.totalVolume || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 font-semibold">Tổng Số Sets Hoàn Thành</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {stats?.totalSets || 0} <span className="text-xs font-normal text-slate-400">sets</span>
          </div>
        </div>
      </div>

      {/* Danh Sách Kỷ Lục Mức Tạ (PRs) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
          🏆 Kỷ Lục Mức Tạ Nặng Nhất (PR Theo Bài Tập)
        </h3>

        {!stats?.prList || stats.prList.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4 border border-dashed border-slate-700 rounded-xl">
            Chưa có dữ liệu bài tập dùng tạ trong khoảng thời gian này.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stats.prList.map((pr, idx) => (
              <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-200">{pr.exerciseName}</div>
                  <div className="text-[10px] text-slate-400">Tổng Vol: {pr.totalVol.toLocaleString()} kg</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm px-2.5 py-1 rounded-lg">
                  {pr.maxWeight} kg
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}