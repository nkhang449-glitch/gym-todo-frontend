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
    <section className="space-y-4">
      {/* Thanh Chọn Ngày */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {daysOfWeek.map((d) => {
          const hasLog = logs.some((l) => l.date === d.key);
          const isSelected = selectedDay === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{d.label}</span>
              {hasLog && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            </button>
          );
        })}
      </div>

      {/* Chi Tiết Lịch Tập Của Ngày Được Chọn */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-700/60 pb-4">
          <h2 className="text-base font-bold text-slate-200">
            Lịch tập: <span className="text-emerald-400">{daysOfWeek.find(d => d.key === selectedDay)?.label}</span>
          </h2>
          <button
            onClick={onAssignClick}
            className="text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl transition-all"
          >
            + Áp Dụng Kiểu Tập Vào Ngày Này
          </button>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 space-y-2 border border-dashed border-slate-700/80 rounded-xl">
            <p className="text-xs">Chưa có lịch tập cho ngày này.</p>
            <p className="text-[11px] text-slate-600">Bấm nút "+ Áp Dụng Kiểu Tập" ở trên để chọn bài tập.</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log._id} className="space-y-4">
              <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-sm font-black text-emerald-400 tracking-wide uppercase">{log.name}</span>
                <div className="flex gap-3 text-xs">
                  <button
                    onClick={() => onEditLog(log)}
                    className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    ✏️ Sửa / Thêm / Xóa bài tập hôm nay
                  </button>
                  <button onClick={() => onDeleteLog(log._id)} className="text-red-400 hover:underline">
                    Xóa
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {log.exercises?.map((ex, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-2">
                    <h4 className="text-xs font-bold text-slate-200">{ex.exerciseName}</h4>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      {/* Kiểm tra hiển thị phù hợp từng loại bài */}
                      {ex.type === 'cardio' || ex.duration > 0 || ex.distance > 0 ? (
                        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold px-3 py-1 rounded-lg">
                          🏃 Cardio: {ex.duration ? `${ex.duration} phút` : ''} {ex.distance ? `- ${ex.distance} km` : ''}
                        </span>
                      ) : Array.isArray(ex.sets) && ex.sets.length > 0 ? (
                        ex.sets.map((s, sIdx) => {
                          const weight = Number(s.weight) || 0;
                          const reps = Number(s.reps) || 0;
                          return (
                            <span
                              key={sIdx}
                              className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg font-medium"
                            >
                              Set {s.setNumber || sIdx + 1}:{' '}
                              {weight > 0 ? (
                                <>
                                  <strong className="text-emerald-400">{weight}kg</strong> x {reps} reps
                                </>
                              ) : (
                                <strong className="text-cyan-400">{reps} reps</strong>
                              )}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[11px] text-slate-500">Chưa ghi nhận set tập</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}