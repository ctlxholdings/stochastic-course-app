import Link from 'next/link';

const courses = [
  {
    id: 'stochastic',
    title: 'Stochastic Mathematics for Solar Project Finance',
    description: 'Build deep intuition for quantitative risk frameworks through 15 lessons with interactive Monte Carlo simulations.',
    lessons: 15,
    category: 'Quantitative Finance',
    status: 'available',
    external: false,
  },
  {
    id: 'risk-return',
    title: 'Risque & Rendement — Investissements Afrique',
    description: 'Simulateur Monte Carlo pour comprendre le compromis risque-rendement à travers 3 investissements: Immobilier, Bétail, Embouche.',
    lessons: 0,
    category: 'Financial Literacy',
    status: 'available',
    external: false,
    staticPath: '/risk-return/',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            CTLX Learning
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Interactive courses on quantitative finance, risk management, and infrastructure investing.
            Built for professionals in energy, commodities, and real assets.
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-xl font-semibold text-white mb-6">Available Courses</h2>

        <div className="grid gap-6">
          {courses.map((course) => {
            const href = course.status !== 'available'
              ? '#'
              : course.staticPath
                ? course.staticPath
                : `/${course.id}`;

            const linkProps = course.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Link
                key={course.id}
                href={href}
                {...linkProps}
                className={`block bg-zinc-900 rounded-lg p-6 border border-zinc-800 transition-all ${
                  course.status === 'available'
                    ? 'hover:border-zinc-700 hover:bg-zinc-800/50'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  {course.status === 'coming-soon' && (
                    <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                  {course.external && (
                    <span className="text-xs text-zinc-500">
                      ↗
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-zinc-400 mb-4">
                  {course.description}
                </p>
                {course.lessons > 0 ? (
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>{course.lessons} lessons</span>
                    <span>•</span>
                    <span>Interactive simulations</span>
                    <span>•</span>
                    <span>Quizzes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>Interactive simulator</span>
                    <span>•</span>
                    <span>Monte Carlo</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 mt-12">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} CTLX Holdings. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
