interface Props {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, actions }: Props) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-ink-3">{eyebrow}</p>
        )}
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-3">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
