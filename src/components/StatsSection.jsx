import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import HistoryModal from './HistoryModal'; // Import Modal mới

export default function StatsSection({ userId, refreshTrigger }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // State mở Modal

  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId, refreshTrigger]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/gym/stats/${userId}`);
      setStats(res.data);
    } catch (err) {
      console.error('Lỗi tải thống kê:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-6 text-xs text-slate-500">Đang tải thông số thống kê...</div>;
  }

  if (!stats) return null;

  return (
    <>
      <section className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            3. Tổng Quan & Thống Kê Tiến Độ
          </h2>
          {/* Nút Xem Chi Tiết Kho Lưu Trữ */}
          <button
            onClick={() => setShowHistoryModal(true)}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/40 transition-transform active:scale-95 flex items-center gap-1.5"
          >
            📜 Xem Kho Lưu Trữ Chi Tiết
          </button>
        </div>

        {/* 3 Thẻ Chỉ số chính */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">Tổng Số Buổi Tập</span>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              {stats.totalWorkouts} <span className="text-xs text-slate-400 font-normal">buổi</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">Tổng Khối Lượng Tạ (Volume)</span>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              {stats.totalVolume.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">Tổng Số Set Đã Tập</span>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              {stats.totalSets} <span className="text-xs text-slate-400 font-normal">sets</span>
            </div>
          </div>
        </div>

        {/* Bảng Kỷ Lục Cá Nhân (PR) */}
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
            Kỷ Lục Mức Tạ Nặng Nhất (PR theo bài tập)
          </h3>
          
          {stats.exerciseStats.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">Chưa có dữ liệu bài tập nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {stats.exerciseStats.map((ex, idx) => (
                <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-700/60 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{ex.name}</div>
                    <div className="text-[10px] text-slate-400">Tổng Vol: {ex.totalVolume.toLocaleString()} kg</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      {ex.maxWeight} kg
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hiển thị Modal Lưu Trữ Chi Tiết */}
      {showHistoryModal && (
        <HistoryModal userId={userId} onClose={() => setShowHistoryModal(false)} />
      )}
    </>
  );
}