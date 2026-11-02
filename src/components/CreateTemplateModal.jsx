import { useState } from 'react';

export default function CreateTemplateModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([{ exerciseName: '', defaultSets: 3, defaultReps: 10, defaultWeight: 0 }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, exercises });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md border border-slate-700">
        <h3 className="text-lg font-bold text-emerald-400 mb-4">Tạo Kiểu Tập Mẫu Mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Tên kiểu tập</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {exercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-900 p-2.5 rounded-lg space-y-2 border border-slate-700">
                <input
                  type="text"
                  placeholder="Tên bài tập"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs"
                  value={ex.exerciseName}
                  onChange={(e) => {
                    const updated = [...exercises];
                    updated[idx].exerciseName = e.target.value;
                    setExercises(updated);
                  }}
                />
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <input
                    type="number"
                    placeholder="Số Set"
                    className="bg-slate-800 border border-slate-700 rounded p-1 text-center"
                    value={ex.defaultSets}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].defaultSets = Number(e.target.value);
                      setExercises(updated);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Số Reps"
                    className="bg-slate-800 border border-slate-700 rounded p-1 text-center"
                    value={ex.defaultReps}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].defaultReps = Number(e.target.value);
                      setExercises(updated);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Kg"
                    className="bg-slate-800 border border-slate-700 rounded p-1 text-center"
                    value={ex.defaultWeight}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].defaultWeight = Number(e.target.value);
                      setExercises(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setExercises([...exercises, { exerciseName: '', defaultSets: 3, defaultReps: 10, defaultWeight: 0 }])}
            className="w-full py-1.5 bg-slate-700 text-xs rounded hover:bg-slate-600"
          >
            + Thêm Bài Tập
          </button>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-700 text-xs rounded">
              Hủy
            </button>
            <button type="submit" className="px-3 py-1.5 bg-emerald-500 font-bold text-slate-950 text-xs rounded">
              Lưu Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}