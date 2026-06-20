export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface-2 border border-neon shadow-[0_0_40px_rgba(0,255,231,0.2)] w-[90%] max-w-[480px] p-8">
        <div className="font-display text-sm text-neon tracking-[0.1em] uppercase mb-6 pb-3 border-b border-border [text-shadow:0_0_10px_var(--color-neon)]">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}