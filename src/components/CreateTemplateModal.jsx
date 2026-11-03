import { useState } from 'react';

export default function CreateTemplateModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([
    { exerciseName: '', defaultSets: '3', defaultReps: '10', defaultWeight: '0' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert các ô số về dạng Number trước khi submit
    const formattedExercises = exercises.map(ex => ({
      exerciseName: ex.exerciseName,
      defaultSets: Number(ex.defaultSets) || 1,
      defaultReps: Number(ex.defaultReps) || 0,
      defaultWeight: Number(ex.defaultWeight) || 0
    }));
    onSubmit({ name, exercises: formattedExercises });
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { exerciseName: '', defaultSets: '3', defaultReps: '10', defaultWeight: '0' }
    ]);
  };

  const handleDeleteExercise = (index) => {
    if (exercises.length === 1) return;
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl">
        <h3 className="text-lg font-bold text-emerald-400 mb-4">Tạo Kiểu Tập Mẫu Mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Tên kiểu tập</label>
            <input
              type="text"
              required
              placeholder="VD: Push / Pull / Leg..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {exercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-xl space-y-2 border border-slate-700 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-400">Bài tập #{idx + 1}</span>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteExercise(idx)}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Xóa bài
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Tên bài tập (VD: Bench Press)"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-slate-100"
                  value={ex.exerciseName}
                  onChange={(e) => handleExerciseChange(idx, 'exerciseName', e.target.value)}
                />

                {/* Các ô số kèm Label Đơn Vị Rõ Ràng */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5 text-center">Số Sets</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-center text-emerald-400 font-bold"
                      value={ex.defaultSets}
                      onChange={(e) => handleExerciseChange(idx, 'defaultSets', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5 text-center">Số Reps</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-center text-emerald-400 font-bold"
                      value={ex.defaultReps}
                      onChange={(e) => handleExerciseChange(idx, 'defaultReps', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5 text-center">Mức tạ (kg)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-center text-emerald-400 font-bold"
                      value={ex.defaultWeight}
                      onChange={(e) => handleExerciseChange(idx, 'defaultWeight', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddExercise}
            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl"
          >
            + Thêm Bài Tập
          </button>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 text-xs rounded-xl">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-500 font-bold text-slate-950 text-xs rounded-xl">
              Lưu Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}