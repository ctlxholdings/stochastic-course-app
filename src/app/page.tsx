import Link from 'next/link';

const courses = [
  {
    id: 'stochastic',
    title: 'Stochastic Mathematics for Solar Project Finance',
    description: 'Build deep intuition for quantitative risk frameworks through 15 lessons with interactive Monte Carlo simulations.',
    lessons: 15,
    category: 'Quantitative Finance',
    status: 'available',
    color: 'blue',
  },
  {
    id: 'risk-return',
    title: 'Risque & Rendement — Investissements Afrique',
    description: 'Simulateur Monte Carlo pour comprendre le compromis risque-rendement à travers 3 investissements: Immobilier, Bétail, Embouche.',
    lessons: 0,
    category: 'Financial Literacy',
    status: 'available',
    staticPath: '/risk-return/',
    color: 'coral',
  },
  {
    id: 'chad-2030',
    title: 'Chad 2030 Pipeline Simulator',
    description: 'Decision support tool for Vision 2030 fiscal planning. Model project delivery scenarios within IMF ECF constraints.',
    lessons: 0,
    category: 'Infrastructure Planning',
    status: 'available',
    staticPath: '/chad-2030/',
    color: 'burgundy',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            CTLX Learning
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Interactive courses on quantitative finance, risk management, and infrastructure investing.
            Built for professionals in energy, commodities, and real assets.
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <h2 className="text-lg md:text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Available Courses
        </h2>

        <div className="grid gap-4 md:gap-6">
          {courses.map((course) => {
            const href = course.status !== 'available'
              ? '#'
              : course.staticPath
                ? course.staticPath
                : `/${course.id}`;

            const borderColor = course.color === 'coral' ? 'var(--coral)' : course.color === 'burgundy' ? '#C1272D' : 'var(--blue)';

            return (
              <Link
                key={course.id}
                href={href}
                className="block rounded-xl p-5 md:p-6 transition-all hover:shadow-lg"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderLeft: `4px solid ${borderColor}`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: borderColor }}
                  >
                    {course.category}
                  </span>
                </div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {course.title}
                </h3>
                <p className="mb-4 text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
                  {course.lessons > 0 ? (
                    <>
                      <span>{course.lessons} lessons</span>
                      <span className="hide-mobile">•</span>
                      <span>Interactive simulations</span>
                      <span className="hide-mobile">•</span>
                      <span>Quizzes</span>
                    </>
                  ) : (
                    <>
                      <span>Interactive simulator</span>
                      <span>•</span>
                      <span>Monte Carlo</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)' }} className="mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-6 md:py-8">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} CTLX Holdings. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
