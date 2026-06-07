const quotes = [
  {
    q: "Lumen replaced a chief of staff hire we were about to make. We're six months ahead of plan because of it.",
    name: "Maya Rajan",
    role: "CEO, Folio",
    company: "Fintech · YC W25",
    avatar: { initials: "MR", grad: "from-[#FF7AB6] to-[#9B7BFF]" },
  },
  {
    q: "The first AI product where I actually trust the output enough to hit send. The approval gates are perfect.",
    name: "Jordan Keller",
    role: "Founder, Stack-IDE",
    company: "Developer tools · Seed",
    avatar: { initials: "JK", grad: "from-[#5F7DFF] to-[#9B7BFF]" },
  },
  {
    q: "Our weekly investor update went from 3 hours to 12 minutes. It even nails my voice. Slightly unsettling, mostly amazing.",
    name: "Priya Shah",
    role: "COO, Loopworks",
    company: "Marketplace · Series A",
    avatar: { initials: "PS", grad: "from-[#9B7BFF] to-[#FF7AB6]" },
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">
            Loved by early users
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            Founders are getting their evenings back.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-line-1 bg-bg-1 p-7 transition-all hover:-translate-y-0.5 hover:border-line-2"
            >
              <blockquote className="flex-1 text-[15px] leading-relaxed text-ink-1">
                <span className="mr-1 select-none text-2xl leading-none text-accent-400">“</span>
                {t.q}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line-1 pt-5">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${t.avatar.grad} text-sm font-semibold text-white shadow-md`}
                >
                  {t.avatar.initials}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-ink-1">{t.name}</div>
                  <div className="text-ink-3">
                    {t.role} · <span className="text-ink-4">{t.company}</span>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
