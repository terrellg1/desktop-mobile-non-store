// Local reconstruction of the Nonchalant Design System component bundle.
// Provides window.NonchalantDesignSystem_440cc0 for the web UI kit.
(function () {
  const React = window.React;

  function Button({ variant = 'primary', size = 'md', fullWidth = false, disabled = false, type = 'button', as = 'button', href, children, style, ...rest }) {
    const sizes = {
      sm: { padding: '9px 18px', fontSize: 'var(--fs-2xs)', letterSpacing: 'var(--ls-wider)' },
      md: { padding: '14px 28px', fontSize: 'var(--fs-xs)', letterSpacing: 'var(--ls-wider)' },
      lg: { padding: '18px 40px', fontSize: 'var(--fs-sm)', letterSpacing: 'var(--ls-wide)' },
    };
    const variants = {
      primary: { background: 'var(--n-900)', color: 'var(--n-50)', border: '1px solid var(--n-900)' },
      secondary: { background: 'transparent', color: 'var(--n-900)', border: '1px solid var(--n-400)' },
      ghost: { background: 'transparent', color: 'var(--n-900)', border: '1px solid transparent' },
      accent: { background: 'var(--sienna)', color: 'var(--n-50)', border: '1px solid var(--sienna)' },
    };
    const base = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      width: fullWidth ? '100%' : 'auto', fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
      transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      whiteSpace: 'nowrap', ...sizes[size], ...variants[variant], ...style,
    };
    const Tag = href ? 'a' : as;
    return React.createElement(Tag, {
      type: href ? undefined : type, href, disabled, style: base,
      onMouseDown: (e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'; },
      onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
      onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
      ...rest,
    }, children);
  }

  function IconButton({ variant = 'ghost', size = 'md', round = false, disabled = false, 'aria-label': ariaLabel, children, style, ...rest }) {
    const dims = { sm: 34, md: 42, lg: 50 };
    const d = dims[size];
    const variants = {
      ghost: { background: 'transparent', color: 'var(--n-900)', border: '1px solid transparent' },
      outline: { background: 'transparent', color: 'var(--n-900)', border: '1px solid var(--n-300)' },
      solid: { background: 'var(--n-900)', color: 'var(--n-50)', border: '1px solid var(--n-900)' },
    };
    return React.createElement('button', {
      'aria-label': ariaLabel, disabled,
      style: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: d, height: d, padding: 0,
        borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
        ...variants[variant], ...style,
      },
      onMouseEnter: (e) => { if (variant === 'ghost' && !disabled) e.currentTarget.style.background = 'var(--n-100)'; },
      onMouseLeave: (e) => { if (variant === 'ghost') e.currentTarget.style.background = 'transparent'; },
      ...rest,
    }, children);
  }

  function Badge({ children, tone = 'neutral', style, ...rest }) {
    const tones = {
      neutral: { background: 'var(--n-100)', color: 'var(--n-700)' },
      solid: { background: 'var(--n-900)', color: 'var(--n-50)' },
      accent: { background: 'var(--sand)', color: 'var(--umber)' },
      success: { background: '#E6EAE0', color: 'var(--success)' },
      error: { background: '#F3E2DF', color: 'var(--error)' },
    };
    return React.createElement('span', {
      style: {
        display: 'inline-flex', alignItems: 'center', padding: '5px 10px', font: 'var(--text-eyebrow)',
        letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', borderRadius: 'var(--radius-sm)',
        ...tones[tone], ...style,
      }, ...rest,
    }, children);
  }

  function ColorSwatch({ color, name, selected = false, size = 'md', onClick, style, ...rest }) {
    const dims = { sm: 18, md: 24, lg: 30 };
    const d = dims[size];
    return React.createElement('button', {
      onClick, 'aria-label': name, 'aria-pressed': selected, title: name,
      style: {
        width: d + 8, height: d + 8, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%', border: `1px solid ${selected ? 'var(--n-900)' : 'transparent'}`, background: 'transparent',
        cursor: 'pointer', transition: 'border-color var(--dur-fast) var(--ease-standard)', ...style,
      }, ...rest,
    }, React.createElement('span', {
      style: { width: d, height: d, borderRadius: '50%', background: color, boxShadow: 'inset 0 0 0 1px rgba(38,30,22,0.12)', display: 'block' },
    }));
  }

  function SizeSwatch({ label, selected = false, disabled = false, onClick, style, ...rest }) {
    return React.createElement('button', {
      onClick: disabled ? undefined : onClick, disabled, 'aria-pressed': selected,
      style: {
        minWidth: 48, height: 44, padding: '0 12px', font: 'var(--text-body-sm)', fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-medium)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
        color: disabled ? 'var(--n-400)' : selected ? 'var(--n-50)' : 'var(--n-900)',
        background: selected ? 'var(--n-900)' : 'transparent',
        border: `1px solid ${selected ? 'var(--n-900)' : 'var(--n-300)'}`, borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: disabled ? 'line-through' : 'none',
        transition: 'all var(--dur-fast) var(--ease-standard)', ...style,
      },
      onMouseEnter: (e) => { if (!disabled && !selected) e.currentTarget.style.borderColor = 'var(--n-900)'; },
      onMouseLeave: (e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--n-300)'; },
      ...rest,
    }, label);
  }

  function Tag({ children, selected = false, onRemove, onClick, style, ...rest }) {
    return React.createElement('span', {
      onClick,
      style: {
        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', font: 'var(--text-body-sm)',
        color: selected ? 'var(--n-50)' : 'var(--n-800)', background: selected ? 'var(--n-900)' : 'var(--n-0)',
        border: `1px solid ${selected ? 'var(--n-900)' : 'var(--n-300)'}`, borderRadius: 'var(--radius-pill)',
        cursor: onClick ? 'pointer' : 'default', transition: 'all var(--dur-fast) var(--ease-standard)', ...style,
      }, ...rest,
    }, children, onRemove && React.createElement('button', {
      onClick: (e) => { e.stopPropagation(); onRemove(e); }, 'aria-label': 'Remove',
      style: { border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', padding: 0, fontSize: '13px', lineHeight: 1, opacity: 0.7 },
    }, '✕'));
  }

  function Divider({ label, vertical = false, style, ...rest }) {
    if (vertical) return React.createElement('div', { style: { width: 1, alignSelf: 'stretch', background: 'var(--border-default)', ...style }, ...rest });
    if (label) return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', ...style }, ...rest },
      React.createElement('span', { style: { flex: 1, height: 1, background: 'var(--border-default)' } }),
      React.createElement('span', { style: { font: 'var(--text-eyebrow)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--n-500)' } }, label),
      React.createElement('span', { style: { flex: 1, height: 1, background: 'var(--border-default)' } }));
    return React.createElement('hr', { style: { border: 'none', height: 1, background: 'var(--border-default)', margin: 0, ...style }, ...rest });
  }

  function Accordion({ title, children, defaultOpen = false, style, ...rest }) {
    const [open, setOpen] = React.useState(defaultOpen);
    return React.createElement('div', { style: { borderBottom: '1px solid var(--border-subtle)', ...style }, ...rest },
      React.createElement('button', {
        onClick: () => setOpen((o) => !o), 'aria-expanded': open,
        style: {
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          font: 'var(--text-eyebrow)', fontSize: 'var(--fs-sm)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--n-900)',
        },
      }, title, React.createElement('span', { style: { fontSize: '18px', fontWeight: 300, transition: 'transform var(--dur-base) var(--ease-standard)', transform: open ? 'rotate(45deg)' : 'rotate(0)' } }, '+')),
      React.createElement('div', { style: { overflow: 'hidden', maxHeight: open ? '400px' : '0', transition: 'max-height var(--dur-slow) var(--ease-standard)' } },
        React.createElement('div', { style: { padding: '0 0 20px', font: 'var(--text-body-sm)', color: 'var(--n-600)', lineHeight: 'var(--lh-relaxed)' } }, children)));
  }

  function Checkbox({ label, checked, defaultChecked, disabled, onChange, style, ...rest }) {
    return React.createElement('label', {
      style: { display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, font: 'var(--text-body-sm)', color: 'var(--n-800)', ...style },
    },
      React.createElement('input', { type: 'checkbox', checked, defaultChecked, disabled, onChange, style: { position: 'absolute', opacity: 0, width: 0, height: 0 }, ...rest }),
      React.createElement('span', {
        'aria-hidden': 'true',
        style: {
          width: 18, height: 18, flexShrink: 0, border: '1px solid var(--n-400)', borderRadius: 'var(--radius-xs)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: (checked ?? defaultChecked) ? 'var(--n-900)' : 'transparent',
          borderColor: (checked ?? defaultChecked) ? 'var(--n-900)' : 'var(--n-400)',
          transition: 'all var(--dur-fast) var(--ease-standard)',
        },
      }, React.createElement('svg', { width: 11, height: 11, viewBox: '0 0 12 12', fill: 'none', style: { opacity: (checked ?? defaultChecked) ? 1 : 0 } },
        React.createElement('path', { d: 'M2.5 6.2L4.8 8.5L9.5 3.5', stroke: 'var(--n-50)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
      label && React.createElement('span', null, label));
  }

  function ProductCard({ name, price, compareAt, image, swatchColor = 'var(--n-200)', colors = [], badge, style, ...rest }) {
    return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', ...style }, ...rest },
      React.createElement('div', { style: { position: 'relative', aspectRatio: '3 / 4', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: swatchColor } },
        image, badge && React.createElement('div', { style: { position: 'absolute', top: 12, left: 12 } }, React.createElement(Badge, { tone: 'neutral' }, badge))),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' } },
          React.createElement('span', { style: { font: 'var(--text-body-sm)', color: 'var(--n-900)', fontWeight: 'var(--fw-medium)' } }, name),
          React.createElement('span', { style: { display: 'flex', gap: '8px', alignItems: 'baseline', whiteSpace: 'nowrap' } },
            compareAt && React.createElement('span', { style: { font: 'var(--text-caption)', color: 'var(--n-500)', textDecoration: 'line-through' } }, compareAt),
            React.createElement('span', { style: { font: 'var(--text-body-sm)', color: 'var(--n-900)' } }, price))),
        colors.length > 0 && React.createElement('div', { style: { display: 'flex', gap: '2px', marginTop: '2px' } },
          colors.map((c, i) => React.createElement(ColorSwatch, { key: i, color: c.color, name: c.name, size: 'sm', selected: i === 0 })))));
  }

  window.NonchalantDesignSystem_440cc0 = { Button, IconButton, Badge, ColorSwatch, SizeSwatch, Tag, Divider, Accordion, Checkbox, ProductCard };
})();
