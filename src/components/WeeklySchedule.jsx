export default function WeeklySchedule({
  daysOfWeek,
  selectedDay,
  setSelectedDay,
  logs,
  filteredLogs,
  onAssignClick,
  onEditLog,
  onDeleteLog
}) {
  return (
    <section>
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
        2. Thời Khóa Biểu Hàng Tuần
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-6">
        {daysOfWeek.map((day) => {
          const hasLog = logs.some((log) => log.date === day.key);
          const isSelected = selectedDay === day.key;

          return (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between h-20 ${
                isSelected
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
            >
              <span className="text-xs">{day.label}</span>
              {hasLog ? (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  Có lịch
                </span>
              ) : (
                <span className="text-[10px] opacity-40">Nghỉ</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-slate-200">
            Lịch tập: <span className="text-emerald-400">{daysOfWeek.find((d) => d.key === selectedDay)?.label}</span>
          </h3>
          <button
            onClick={onAssignClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            + Áp Dụng Kiểu Tập Vào Ngày Này
          </button>
        </div>

        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <p className="text-center py-8 text-slate-500 text-xs">
              Chưa chọn kiểu tập nào cho {daysOfWeek.find((d) => d.key === selectedDay)?.label}.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div key={log._id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md uppercase">
                    {log.name}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEditLog(JSON.parse(JSON.stringify(log)))}
                      className="text-xs text-emerald-400 hover:underline font-semibold"
                    >
                      ✏️ Sửa / Thêm / Xóa bài tập hôm nay
                    </button>
                    <button onClick={() => onDeleteLog(log._id)} className="text-xs text-red-400 hover:text-red-300">
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {log.exercises?.map((ex, exIdx) => (
                    <div key={exIdx} className="bg-slate-800 p-3 rounded-lg border border-slate-700/50">
                      <div className="font-semibold text-slate-200 text-xs mb-2">{ex.exerciseName}</div>
                      <div className="flex flex-wrap gap-2">
                        {ex.sets?.map((st, stIdx) => (
                          <div key={stIdx} className="bg-slate-900 px-2 py-1 rounded border border-slate-700 text-[11px] text-slate-300">
                            Set {st.setNumber}: <span className="text-emerald-400 font-bold">{st.weight}kg</span> x {st.reps} reps
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}