import { useState } from 'react';

export default function EditDayLogModal({ editingLog, setEditingLog, onClose, onSubmit }) {
  const handleExerciseChange = (exIndex, field, value) => {
    const updatedExercises = [...editingLog.exercises];
    updatedExercises[exIndex][field] = value;
    setEditingLog({ ...editingLog, exercises: updatedExercises });
  };

  const handleSetChange = (exIndex, setIndex, field, value) => {
    const updatedExercises = [...editingLog.exercises];
    const sets = [...(updatedExercises[exIndex].sets || [])];
    sets[setIndex][field] = value;
    updatedExercises[exIndex].sets = sets;
    setEditingLog({ ...editingLog, exercises: updatedExercises });
  };

  const handleAddSet = (exIndex) => {
    const updatedExercises = [...editingLog.exercises];
    const currentSets = updatedExercises[exIndex].sets || [];
    const lastSet = currentSets[currentSets.length - 1] || { weight: 0, reps: 10 };

    updatedExercises[exIndex].sets = [
      ...currentSets,
      { setNumber: currentSets.length + 1, weight: lastSet.weight, reps: lastSet.reps }
    ];
    setEditingLog({ ...editingLog, exercises: updatedExercises });
  };

  const handleDeleteSet = (exIndex, setIndex) => {
    const updatedExercises = [...editingLog.exercises];
    updatedExercises[exIndex].sets = updatedExercises[exIndex].sets.filter((_, i) => i !== setIndex);
    setEditingLog({ ...editingLog, exercises: updatedExercises });
  };

  const handleDeleteExercise = (exIndex) => {
    const updatedExercises = editingLog.exercises.filter((_, i) => i !== exIndex);
    setEditingLog({ ...editingLog, exercises: updatedExercises });
  };

  const handleAddExercise = () => {
    setEditingLog({
      ...editingLog,
      exercises: [
        ...editingLog.exercises,
        { exerciseName: '', type: 'weight', sets: [{ setNumber: 1, weight: 0, reps: 10 }] }
      ]
    });
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-emerald-400">Chỉnh Sửa Bài Tập Hôm Nay</h3>
          <button
            type="button"
            onClick={handleAddExercise}
            className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-500/30"
          >
            + Thêm Bài Tập Mới
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mb-4">(Chỉnh sửa này áp dụng riêng cho hôm nay, không làm đổi Template gốc)</p>

        <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {editingLog.exercises?.map((ex, exIdx) => {
            const exType = ex.type || (ex.duration || ex.distance ? 'cardio' : 'weight');

            return (
              <div key={exIdx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-3">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    placeholder="Tên bài tập"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-100"
                    value={ex.exerciseName}
                    onChange={(e) => handleExerciseChange(exIdx, 'exerciseName', e.target.value)}
                  />

                  <select
                    className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-emerald-400 font-semibold"
                    value={exType}
                    onChange={(e) => handleExerciseChange(exIdx, 'type', e.target.value)}
                  >
                    <option value="weight">🏋️ Tập Tạ</option>
                    <option value="bodyweight">🤸 Thể Lực (No Kg)</option>
                    <option value="cardio">🏃 Cardio / Chạy</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteExercise(exIdx)}
                    className="text-xs text-red-400 hover:text-red-300 p-1"
                  >
                    🗑️
                  </button>
                </div>

                {/* Ô nhập tương ứng với từng loại bài */}
                {exType === 'cardio' ? (
                  <div className="grid grid-cols-2 gap-3 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Thời gian (Phút)</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-center text-amber-400 font-bold"
                        value={ex.duration || 0}
                        onChange={(e) => handleExerciseChange(exIdx, 'duration', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Quãng đường (Km)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-center text-amber-400 font-bold"
                        value={ex.distance || 0}
                        onChange={(e) => handleExerciseChange(exIdx, 'distance', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {ex.sets?.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 bg-slate-800/60 p-2 rounded-lg text-xs">
                        <span className="text-[11px] text-slate-400 font-semibold w-12">Set {sIdx + 1}</span>

                        {exType === 'weight' && (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              className="w-16 bg-slate-900 border border-slate-700 rounded p-1 text-center text-emerald-400 font-bold"
                              value={s.weight}
                              onChange={(e) => handleSetChange(exIdx, sIdx, 'weight', e.target.value)}
                            />
                            <span className="text-[10px] text-slate-400">kg</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            className="w-16 bg-slate-900 border border-slate-700 rounded p-1 text-center text-emerald-400 font-bold"
                            value={s.reps}
                            onChange={(e) => handleSetChange(exIdx, sIdx, 'reps', e.target.value)}
                          />
                          <span className="text-[10px] text-slate-400">reps</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteSet(exIdx, sIdx)}
                          className="ml-auto text-slate-500 hover:text-red-400 text-xs px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddSet(exIdx)}
                      className="text-[11px] text-emerald-400 hover:underline font-semibold pt-1"
                    >
                      + Thêm Set
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 text-xs rounded-xl">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-500 font-bold text-slate-950 text-xs rounded-xl">
              Lưu Lịch Tập Hôm Nay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}