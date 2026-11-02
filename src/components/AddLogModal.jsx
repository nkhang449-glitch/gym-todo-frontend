import { useState } from 'react';

export default function AddLogModal({ onClose, onSave }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [name, setName] = useState('Push Day');
  const [exercises, setExercises] = useState([
    { exerciseName: 'Bench Press', sets: [{ setNumber: 1, reps: 10, weight: 60 }] }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { exerciseName: '', sets: [{ setNumber: 1, reps: 0, weight: 0 }] }]);
  };

  const addSet = (exIndex) => {
    const updated = [...exercises];
    const setNum = updated[exIndex].sets.length + 1;
    updated[exIndex].sets.push({ setNumber: setNum, reps: 0, weight: 0 });
    setExercises(updated);
  };

  const handleExChange = (index, field, val) => {
    const updated = [...exercises];
    updated[index][field] = val;
    setExercises(updated);
  };

  const handleSetChange = (exIndex, setIndex, field, val) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = Number(val);
    setExercises(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, name, exercises });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-xl shadow-2xl border border-slate-700 my-8">
        <h2 className="text-xl font-bold mb-4 text-emerald-400">Thêm Buổi Tập Mới</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ngày tập</label>
              <input
                type="date"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tên ngày tập</label>
              <input
                type="text"
                placeholder="Legs, Push, Pull..."
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {exercises.map((ex, exIdx) => (
              <div key={exIdx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <input
                  type="text"
                  placeholder="Tên bài tập (VD: Squat, Bench Press)"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm font-semibold mb-2"
                  value={ex.exerciseName}
                  onChange={(e) => handleExChange(exIdx, 'exerciseName', e.target.value)}
                />

                <div className="space-y-2">
                  {ex.sets.map((st, stIdx) => (
                    <div key={stIdx} className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400 w-12">Set {st.setNumber}</span>
                      <input
                        type="number"
                        placeholder="Kg"
                        className="w-20 bg-slate-800 border border-slate-700 rounded p-1.5 text-center"
                        value={st.weight}
                        onChange={(e) => handleSetChange(exIdx, stIdx, 'weight', e.target.value)}
                      />
                      <span>kg</span>
                      <input
                        type="number"
                        placeholder="Reps"
                        className="w-20 bg-slate-800 border border-slate-700 rounded p-1.5 text-center"
                        value={st.reps}
                        onChange={(e) => handleSetChange(exIdx, stIdx, 'reps', e.target.value)}
                      />
                      <span>reps</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addSet(exIdx)}
                  className="mt-2 text-xs text-emerald-400 font-medium hover:underline"
                >
                  + Thêm Set
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addExercise}
            className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-semibold text-slate-200"
          >
            + Thêm Bài Tập Mới
          </button>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 font-bold rounded-lg text-sm"
            >
              Lưu Buổi Tập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}