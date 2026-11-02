import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function HistoryModal({ userId, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/gym/history/${userId}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Lỗi tải kho lưu trữ:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lọc theo từ khóa tìm kiếm (Tên kiểu tập hoặc tên bài tập)
  const filteredHistory = history.filter((item) => {
    const matchName = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchExercise = item.exercises?.some((ex) =>
      ex.exerciseName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchName || matchExercise;
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-2xl border border-slate-700 shadow-2xl my-8 flex flex-col max-h-[85vh]">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-emerald-400">📜 Kho Lưu Trữ Nhật Ký Tập Luyện</h3>
            <p className="text-xs text-slate-400">Xem lại lịch sử chi tiết tất cả các buổi tập đã hoàn thành</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Ô Tìm Kiếm */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Tìm theo bài tập (VD: Bench Press, Squat, Push Day...)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Danh Sách Lịch Sử Chi Tiết */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <p className="text-center py-8 text-xs text-slate-500">Đang tải lịch sử tập luyện...</p>
          ) : filteredHistory.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-500">Không tìm thấy nhật ký tập luyện nào phù hợp.</p>
          ) : (
            filteredHistory.map((item) => (
              <div key={item._id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md uppercase">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({item.date})</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.exercises?.map((ex, exIdx) => (
                    <div key={exIdx} className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                      <div className="text-xs font-semibold text-slate-200 mb-1.5">{ex.exerciseName}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {ex.sets?.map((st, stIdx) => (
                          <span key={stIdx} className="bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-300 border border-slate-700">
                            Set {st.setNumber}: <b className="text-emerald-400">{st.weight}kg</b> x {st.reps}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Modal */}
        <div className="pt-4 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}