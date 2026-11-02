export default function TemplateSection({ templates, onCreateClick, onDeleteTemplate }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          1. Kiểu Tập Mẫu Của Bạn (Templates)
        </h2>
        <button
          onClick={onCreateClick}
          className="text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-transform active:scale-95"
        >
          + Tạo Kiểu Tập Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.length === 0 ? (
          <p className="text-xs text-slate-500 col-span-3 py-4 text-center border border-dashed border-slate-800 rounded-xl">
            Chưa có kiểu tập mẫu nào. Bấm "+ Tạo Kiểu Tập Mới" để lưu sẵn Leg, Push, Pull...
          </p>
        ) : (
          templates.map((tpl) => (
            <div key={tpl._id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-emerald-400 text-sm">{tpl.name}</h3>
                <button onClick={() => onDeleteTemplate(tpl._id)} className="text-[10px] text-red-400 hover:underline">
                  Xóa
                </button>
              </div>
              <ul className="text-xs text-slate-400 space-y-1">
                {tpl.exercises?.map((ex, idx) => (
                  <li key={idx}>• {ex.exerciseName} ({ex.defaultSets} sets x {ex.defaultReps} reps)</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  );
}