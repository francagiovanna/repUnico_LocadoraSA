export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl bg-panel border border-neon rounded-xl p-6 shadow-[0_0_40px_rgba(0,255,231,0.25)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <h2 className="font-display text-lg text-neon tracking-widest uppercase">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-dim hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}