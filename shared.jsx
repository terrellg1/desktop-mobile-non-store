// Shared icons + placeholder for the Nonchalant web kit. Attaches to window.
const NclIcon = {
  search: (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>),
  user:   (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/></svg>),
  bag:    (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>),
  heart:  (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.6 12 20 12 20Z"/></svg>),
  close:  (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>),
  chevron:(p) => (<svg width={p?.s||18} height={p?.s||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 6 6 6-6 6"/></svg>),
  menu:   (p) => (<svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  minus:  (p) => (<svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14"/></svg>),
  plus:   (p) => (<svg width={p?.s||16} height={p?.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg>),
};

// Placeholder image tile — warm neutral fill standing in for photography.
function Ph({ fill, label, ratio = '3 / 4', style }) {
  return (
    <div style={{
      width: '100%', aspectRatio: ratio, background: fill || 'var(--n-200)',
      position: 'relative', overflow: 'hidden', ...style,
    }}>
      {label && <span style={{
        position: 'absolute', bottom: 12, left: 14, font: 'var(--text-eyebrow)',
        letterSpacing: '.16em', textTransform: 'uppercase', fontSize: 10,
        color: 'rgba(255,255,255,.7)',
      }}>{label}</span>}
    </div>
  );
}

Object.assign(window, { NclIcon, Ph });

// Product shot — a garment cutout centered on a warm fill tile.
function Shot({ img, fill, ratio = '3 / 4', pad = '8%', style }) {
  return (
    <div style={{
      width: '100%', aspectRatio: ratio,
      background: `radial-gradient(120% 120% at 50% 30%, ${fill || 'var(--n-200)'}, color-mix(in oklab, ${fill || 'var(--n-200)'} 72%, #8a7458))`,
      position: 'relative', overflow: 'hidden', ...style,
    }}>
      <img src={img} alt="" loading="lazy" style={{
        position: 'absolute', inset: pad, width: `calc(100% - ${pad} * 2)`, height: `calc(100% - ${pad} * 2)`,
        objectFit: 'contain', filter: 'drop-shadow(0 18px 26px rgba(38,30,22,.22))',
      }} />
    </div>
  );
}
Object.assign(window, { Shot });
