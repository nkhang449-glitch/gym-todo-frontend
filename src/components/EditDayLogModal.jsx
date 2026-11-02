export default function EditDayLogModal({ editingLog, setEditingLog, onClose, onSubmit }) {
  const handleAddExercise = () => {
    const updated = { ...editingLog };
    updated.exercises.push({
      exerciseName: '',
      sets: [{ setNumber: 1, weight: 0, reps: 0 }]
    });
    setEditingLog(updated);
  };

  const handleDeleteExercise = (exIdx) => {
    const updated = { ...editingLog };
    updated.exercises.splice(exIdx, 1);
    setEditingLog(updated);
  };

  const handleAddSet = (exIdx) => {
    const updated = { ...editingLog };
    const currentSets = updated.exercises[exIdx].sets;
    currentSets.push({ setNumber: currentSets.length + 1, weight: 0, reps: 0 });
    setEditingLog(updated);
  };

  const handleDeleteSet = (exIdx, stIdx) => {
    const updated = { ...editingLog };
    updated.exercises[exIdx].sets.splice(stIdx, 1);
    updated.exercises[exIdx].sets.forEach((st, i) => (st.setNumber = i + 1));
    setEditingLog(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-xl border border-slate-700 my-8">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-emerald-400">Chỉnh Sửa Bài Tập Hôm Nay</h3>
          <button
            type="button"
            onClick={handleAddExercise}
            className="text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-bold px-3 py-1 rounded-lg border border-emerald-500/40"
          >
            + Thêm Bài Tập Mới
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">(Chỉnh sửa này áp dụng riêng cho hôm nay, không làm đổi Template gốc)</p>

        <form onSubmit={onSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {editingLog.exercises.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">Chưa có bài tập nào. Bấm nút "+ Thêm Bài Tập Mới" ở góc trên!</p>
          ) : (
            editingLog.exercises.map((ex, exIdx) => (
              <div key={exIdx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-3 relative">
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tên bài tập"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs font-semibold text-emerald-300"
                    value={ex.exerciseName}
                    onChange={(e) => {
                      const updated = { ...editingLog };
                      updated.exercises[exIdx].exerciseName = e.target.value;
                      setEditingLog(updated);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteExercise(exIdx)}
                    className="text-xs text-red-400 hover:bg-red-500/20 px-2 py-1.5 rounded border border-red-500/30 whitespace-nowrap"
                  >
                    🗑️ Xóa Bài
                  </button>
                </div>

                <div className="space-y-1.5 bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
                  {ex.sets.map((st, stIdx) => (
                    <div key={stIdx} className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 w-12 text-[11px]">Set {st.setNumber}</span>
                      <input
                        type="number"
                        className="w-16 bg-slate-800 border border-slate-700 rounded p-1 text-center"
                        value={st.weight}
                        onChange={(e) => {
                          const updated = { ...editingLog };
                          updated.exercises[exIdx].sets[stIdx].weight = Number(e.target.value);
                          setEditingLog(updated);
                        }}
                      />
                      <span className="text-[11px] text-slate-400">kg</span>
                      <input
                        type="number"
                        className="w-16 bg-slate-800 border border-slate-700 rounded p-1 text-center"
                        value={st.reps}
                        onChange={(e) => {
                          const updated = { ...editingLog };
                          updated.exercises[exIdx].sets[stIdx].reps = Number(e.target.value);
                          setEditingLog(updated);
                        }}
                      />
                      <span className="text-[11px] text-slate-400">reps</span>

                      <button
                        type="button"
                        onClick={() => handleDeleteSet(exIdx, stIdx)}
                        className="text-slate-500 hover:text-red-400 text-xs ml-auto px-1"
                        title="Xóa Set"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddSet(exIdx)}
                    className="text-[11px] text-emerald-400 hover:underline font-semibold pt-1 block"
                  >
                    + Thêm Set
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 text-xs rounded-lg">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-500 font-bold text-slate-950 text-xs rounded-lg">
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}