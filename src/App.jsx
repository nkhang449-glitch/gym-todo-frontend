import { useState, useEffect } from 'react';
import axiosClient from './api/axiosClient';
import LoginModal from './components/LoginModal';
import TemplateSection from './components/TemplateSection';
import WeeklySchedule from './components/WeeklySchedule';
import StatsSection from './components/StatsSection'; // Import thêm Stats
import CreateTemplateModal from './components/CreateTemplateModal';
import EditDayLogModal from './components/EditDayLogModal';

const DAYS_OF_WEEK = [
  { key: 'Monday', label: 'Thứ 2' },
  { key: 'Tuesday', label: 'Thứ 3' },
  { key: 'Wednesday', label: 'Thứ 4' },
  { key: 'Thursday', label: 'Thứ 5' },
  { key: 'Friday', label: 'Thứ 6' },
  { key: 'Saturday', label: 'Thứ 7' },
  { key: 'Sunday', label: 'Chủ Nhật' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [refreshStats, setRefreshStats] = useState(0); // Trigger để reload thống kê

  useEffect(() => {
    const savedUser = localStorage.getItem('gym_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchLogs();
      fetchTemplates();
    }
  }, [user]);

  const fetchLogs = async () => {
    try {
      const res = await axiosClient.get(`/gym/${user._id}`);
      setLogs(res.data);
      setRefreshStats(prev => prev + 1); // Cập nhật lại thống kê mỗi khi log thay đổi
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await axiosClient.get(`/templates/${user._id}`);
      setTemplates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('gym_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gym_user');
    setLogs([]);
    setTemplates([]);
  };

  const handleCreateTemplate = async (data) => {
    try {
      await axiosClient.post('/templates', { ...data, userId: user._id });
      setShowCreateTemplateModal(false);
      fetchTemplates();
    } catch (err) {
      alert('Không thể tạo kiểu tập!');
    }
  };

  const handleAssignWorkoutToDay = async (template) => {
    try {
      const formattedExercises = template.exercises.map(ex => ({
        exerciseName: ex.exerciseName,
        sets: Array.from({ length: ex.defaultSets }, (_, i) => ({
          setNumber: i + 1,
          weight: ex.defaultWeight,
          reps: ex.defaultReps
        }))
      }));

      await axiosClient.post('/gym', {
        userId: user._id,
        date: selectedDay,
        name: template.name,
        exercises: formattedExercises
      });
      setShowAssignModal(false);
      fetchLogs();
    } catch (err) {
      alert('Không thể gán lịch tập!');
    }
  };

  const handleUpdateDayLog = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/gym/${editingLog._id}`, {
        name: editingLog.name,
        exercises: editingLog.exercises
      });
      setEditingLog(null);
      fetchLogs();
    } catch (err) {
      alert('Không thể cập nhật bài tập!');
    }
  };

  const handleDeleteLog = async (id) => {
    if (confirm('Xóa lịch tập ngày này?')) {
      try {
        await axiosClient.delete(`/gym/${id}`);
        fetchLogs();
      } catch (err) {
        alert('Lỗi khi xóa!');
      }
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (confirm('Xóa kiểu tập mẫu này?')) {
      try {
        await axiosClient.delete(`/templates/${id}`);
        fetchTemplates();
      } catch (err) {
        alert('Lỗi khi xóa template!');
      }
    }
  };

  const filteredLogs = logs.filter((log) => log.date === selectedDay);

  if (!user) return <LoginModal onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
          <div>
            <h1 className="text-2xl font-black text-emerald-400">GYM TO-DO LIST</h1>
            <p className="text-xs text-slate-400">Xin chào, <span className="text-emerald-300 font-semibold">{user.username}</span></p>
          </div>
          <button onClick={handleLogout} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-slate-300">
            Đăng xuất
          </button>
        </header>

        {/* 1. Phần Quản Lý Templates */}
        <TemplateSection
          templates={templates}
          onCreateClick={() => setShowCreateTemplateModal(true)}
          onDeleteTemplate={handleDeleteTemplate}
        />

        {/* 2. Phần Thời Khóa Biểu Hàng Tuần */}
        <WeeklySchedule
          daysOfWeek={DAYS_OF_WEEK}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          logs={logs}
          filteredLogs={filteredLogs}
          onAssignClick={() => setShowAssignModal(true)}
          onEditLog={setEditingLog}
          onDeleteLog={handleDeleteLog}
        />

        {/* 3. Phần Thống Kê Tiến Độ (Mới) */}
        <StatsSection userId={user._id} refreshTrigger={refreshStats} />
      </div>

      {/* Modals */}
      {showCreateTemplateModal && (
        <CreateTemplateModal
          onClose={() => setShowCreateTemplateModal(false)}
          onSubmit={handleCreateTemplate}
        />
      )}

      {editingLog && (
        <EditDayLogModal
          editingLog={editingLog}
          setEditingLog={setEditingLog}
          onClose={() => setEditingLog(null)}
          onSubmit={handleUpdateDayLog}
        />
      )}

      {showAssignModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md border border-slate-700">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              Gán Kiểu Tập Cho {DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label}
            </h3>
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {templates.length === 0 ? (
                <p className="text-xs text-slate-400">Bạn chưa có kiểu tập mẫu nào trong DB. Hãy tạo mới ở phần 1!</p>
              ) : (
                templates.map((tpl) => (
                  <button
                    key={tpl._id}
                    onClick={() => handleAssignWorkoutToDay(tpl)}
                    className="w-full text-left bg-slate-900 hover:bg-slate-700 p-3 rounded-xl border border-slate-700 flex justify-between items-center"
                  >
                    <span className="text-xs font-bold text-slate-200">{tpl.name}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">+ Áp dụng</span>
                  </button>
                ))
              )}
            </div>
            <button onClick={() => setShowAssignModal(false)} className="w-full py-2 bg-slate-700 rounded text-xs">
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}