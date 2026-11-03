import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function StatsSection({ userId, refreshTrigger }) {
  const [stats, setStats] = useState(null);
  const [timeframe, setTimeframe] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchStats = async (selectedTimeframe) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosClient.get(`/gym/stats/${userId}?timeframe=${selectedTimeframe}`);
      setStats(res.data);
    } catch (err) {
      console.error('Lỗi khi tải thống kê:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(timeframe);
  }, [userId, timeframe, refreshTrigger]);

  return (
    <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-6">
      {/* Header & Filter Căn Phải Gọn Gàng */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-700/50 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
            🎯 Thống Kê & Hiệu Suất Tập Luyện
          </h2>
          <p className="text-xs text-slate-400">Đánh giá kỷ luật và sự tiến bộ sức mạnh</p>
        </div>

        {/* Filter Căn Phải - Tông Màu Dịu Mắt */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-700/70 text-xs self-end sm:self-auto">
          {[
            { key: 'week', label: 'Tuần này' },
            { key: 'month', label: 'Tháng này' },
            { key: 'all', label: 'Tất cả' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTimeframe(item.key)}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                timeframe === item.key
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Thẻ Chỉ Số Hướng Đối Tượng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Tần Suất Tập */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-semibold">Tần Suất Kỷ Luật</span>
          <div className="my-2">
            <div className="text-2xl font-black text-emerald-400">
              {loading ? '...' : stats?.totalWorkouts || 0}{' '}
              <span className="text-xs font-normal text-slate-400">buổi hoàn thành</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500">Hoàn thành tổng cộng {stats?.totalSets || 0} sets bài tập</span>
        </div>

        {/* 2. Top PR Đỉnh Cao (Mức Tạ + Reps) */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            🏆 Kỷ Lục Đỉnh Cao (Top PR)
          </span>
          {stats?.topPR ? (
            <div className="my-2">
              <div className="text-lg font-black text-white truncate">{stats.topPR.exerciseName}</div>
              <div className="text-sm text-emerald-400 font-bold">
                {stats.topPR.maxWeight} kg <span className="text-xs font-normal text-slate-300">({stats.topPR.reps} reps)</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 my-2">Chưa có dữ liệu bài tập tạ</div>
          )}
          <span className="text-[10px] text-slate-500">Kỷ lục tính theo mức tạ & số reps tối đa</span>
        </div>

        {/* 3. Phân Bổ Bài Tập & Tổng Reps Bodyweight */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Phân Bổ Bài Tập</span>
          <div className="space-y-1 text-xs pt-1">
            <div className="flex justify-between">
              <span className="text-slate-300">🏋️ Kháng lực (Tạ):</span>
              <span className="font-bold text-emerald-400">{stats?.weightExercisesCount || 0} sets</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">🤸 Thể lực (Bodyweight):</span>
              <span className="font-bold text-cyan-400">
                {stats?.totalBodyweightReps || 0} <span className="text-[10px] font-normal text-slate-400">reps</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">🏃 Cardio / Tim mạch:</span>
              <span className="font-bold text-amber-400">{stats?.cardioExercisesCount || 0} bài</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danh Sách PR Theo Bài Tập (Hiện cả Tạ & Reps) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
          💪 Kỷ Lục Mức Tạ Nặng Nhất Theo Bài Tập
        </h3>

        {loading ? (
          <p className="text-xs text-slate-500 text-center py-4">Đang tải...</p>
        ) : !stats?.prList || stats.prList.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4 border border-dashed border-slate-700 rounded-xl">
            Chưa có kỷ lục bài tập tạ nào trong khoảng thời gian này.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stats.prList.map((pr, idx) => (
              <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-200 truncate pr-2">{pr.exerciseName}</span>
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs px-2.5 py-1 rounded-lg shrink-0">
                  {pr.maxWeight} kg <span className="text-[10px] text-slate-400 font-normal">x {pr.reps}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}