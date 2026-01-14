import { Lesson, PhaseInfo } from '@/types';

export const phases: PhaseInfo[] = [
  {
    id: 'A',
    title: 'Phase A',
    subtitle: 'Random Variables & Distributions',
    lessons: [1, 2, 3, 4],
  },
  {
    id: 'B',
    title: 'Phase B',
    subtitle: 'Combining Random Variables',
    lessons: [5, 6, 7, 8],
  },
  {
    id: 'C',
    title: 'Phase C',
    subtitle: 'Building a Project',
    lessons: [9, 10, 11, 12, 13],
  },
  {
    id: 'D',
    title: 'Phase D',
    subtitle: 'Portfolio & Structure',
    lessons: [14, 15],
  },
];

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'One Random Variable',
    phase: 'A',
    concept: 'A random variable is not a single number—it\'s a distribution of possible outcomes. When we say "annual irradiance is 1,500 kWh/kWp," we mean that 1,500 is the center of a distribution, not a fixed value.',
    context: 'In solar project finance, every key parameter is uncertain: irradiance, equipment degradation, O&M costs. Understanding that these are distributions—not point estimates—is the foundation of quantitative risk.',
    simulation: {
      type: 'single-normal',
      defaultParams: { mean: 1500, stdDev: 100, samples: 1000 },
      description: 'Draw 1,000 samples from N(1500, 100) and visualize the histogram. Notice: you never get exactly 1,500.',
    },
    keyInsight: 'You never get the mean. Every realization is a draw from a distribution.',
    rcQuestions: [
      'What is the expected annual production?',
      'What assumptions drive your base case?',
      'How confident are you in these projections?',
    ],
    quiz: {
      questions: [
        {
          id: 'l1q1',
          type: 'multiple-choice',
          question: 'If annual irradiance follows N(1500, 100), what does "1500" represent?',
          options: [
            'The exact value we will observe',
            'The center of the distribution (expected value)',
            'The minimum possible value',
            'The P90 estimate',
          ],
          correctAnswer: 'The center of the distribution (expected value)',
          explanation: 'The mean (1500) is the center of the distribution—the expected value. But any single realization will almost certainly be different from 1500.',
        },
        {
          id: 'l1q2',
          type: 'true-false',
          question: 'When modeling a solar project, using a single "base case" number ignores the inherent uncertainty in the parameter.',
          correctAnswer: true,
          explanation: 'True. A single point estimate doesn\'t capture the range of possible outcomes. We need to model the full distribution.',
        },
        {
          id: 'l1q3',
          type: 'multiple-choice',
          question: 'In the simulation, why do we draw 1,000 samples instead of just one?',
          options: [
            'To find the exact mean',
            'To visualize the shape and spread of possible outcomes',
            'Because computers like big numbers',
            'To calculate P100',
          ],
          correctAnswer: 'To visualize the shape and spread of possible outcomes',
          explanation: 'Multiple samples reveal the distribution shape, spread, and the range of possible outcomes we might encounter.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 2,
    title: 'Expected Value vs. Realized Outcome',
    phase: 'A',
    concept: 'The expected value E[X] is a theoretical average over infinitely many trials. Any single project realization will differ from E[X]. The gap between what you expect and what you get is the essence of risk.',
    context: 'Investors often confuse the "base case" (E[X]) with what will actually happen. A project that\'s profitable in expectation can still lose money in any given year.',
    simulation: {
      type: 'expected-vs-realized',
      defaultParams: { mean: 1500, stdDev: 100, samples: 100 },
      description: 'Compare the sample mean with the true mean as you increase sample size. Watch convergence.',
    },
    keyInsight: 'Expectation ≠ realization. E[X] tells you the long-run average, not what happens to your one project.',
    rcQuestions: [
      'What is your expected return vs. downside scenario?',
      'How many projects before the law of large numbers helps?',
      'What happens if this single project underperforms?',
    ],
    quiz: {
      questions: [
        {
          id: 'l2q1',
          type: 'multiple-choice',
          question: 'If you have one solar project with E[Revenue] = €100k, what can you say about actual revenue?',
          options: [
            'Revenue will be exactly €100k',
            'Revenue will be close to €100k with high probability',
            'Revenue could be significantly higher or lower than €100k',
            'Revenue will always exceed €100k',
          ],
          correctAnswer: 'Revenue could be significantly higher or lower than €100k',
          explanation: 'For a single project, actual revenue can vary significantly from the expected value. The variance determines how much.',
        },
        {
          id: 'l2q2',
          type: 'true-false',
          question: 'The Law of Large Numbers guarantees that sample means converge to the expected value as sample size increases.',
          correctAnswer: true,
          explanation: 'True. As n→∞, the sample mean converges to E[X]. This is why portfolio diversification matters.',
        },
        {
          id: 'l2q3',
          type: 'numerical',
          question: 'If you flip a fair coin (heads=1, tails=0), what is E[X]?',
          correctAnswer: 0.5,
          tolerance: 0.01,
          explanation: 'E[X] = 0.5×1 + 0.5×0 = 0.5. You never flip 0.5—you get 0 or 1—but that\'s the expectation.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 3,
    title: 'Variance and Standard Deviation',
    phase: 'A',
    concept: 'Variance (σ²) measures the spread of a distribution—how far outcomes typically deviate from the mean. Standard deviation (σ) is in the same units as the original variable, making it more interpretable.',
    context: 'Two projects can have the same expected revenue but very different risk profiles. A project in a stable grid vs. a project in a volatile market might both average €100k, but one has σ=€5k and the other σ=€25k.',
    simulation: {
      type: 'variance-comparison',
      defaultParams: { mean: 1500, stdDev1: 50, stdDev2: 150, samples: 1000 },
      description: 'Compare two distributions with the same mean but different standard deviations. See how spread affects outcomes.',
    },
    keyInsight: 'Same mean, different risk. Variance captures uncertainty the mean ignores.',
    rcQuestions: [
      'What is the volatility of your revenue projections?',
      'How stable are your cost assumptions?',
      'What drives the variance in your model?',
    ],
    quiz: {
      questions: [
        {
          id: 'l3q1',
          type: 'multiple-choice',
          question: 'If X ~ N(100, 10), approximately what percentage of outcomes fall within [80, 120]?',
          options: ['50%', '68%', '95%', '99.7%'],
          correctAnswer: '95%',
          explanation: '80 and 120 are 2 standard deviations from the mean. The 95% rule: ~95% of normal data falls within ±2σ.',
        },
        {
          id: 'l3q2',
          type: 'true-false',
          question: 'A project with higher variance is always worse than one with lower variance.',
          correctAnswer: false,
          explanation: 'False. Higher variance means more uncertainty, but it could mean more upside too. Risk tolerance and return requirements matter.',
        },
        {
          id: 'l3q3',
          type: 'multiple-choice',
          question: 'Why do we often use standard deviation instead of variance?',
          options: [
            'It\'s always smaller',
            'It\'s in the same units as the original data',
            'It\'s easier to calculate',
            'Variance is outdated',
          ],
          correctAnswer: 'It\'s in the same units as the original data',
          explanation: 'Standard deviation (σ) has the same units as X, making it directly interpretable. Variance (σ²) is in squared units.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 4,
    title: 'Percentiles (P10/P50/P90)',
    phase: 'A',
    concept: 'Percentiles tell you the value below which a certain percentage of outcomes fall. P10 means 10% of outcomes are below this value (downside). P90 means 90% are below (upside is limited to 10% of cases).',
    context: 'In project finance, P90 is often used to size debt—lenders want 90% confidence the project can service debt. P50 is the "management case." P10 represents upside.',
    simulation: {
      type: 'percentile-finder',
      defaultParams: { mean: 1500, stdDev: 100, samples: 10000 },
      description: 'Calculate P10, P50, P90 from samples. For N(1500,100): P90≈1372, P50≈1500, P10≈1628.',
    },
    keyInsight: 'P90 sizes debt, not P50. Lenders care about the downside—what happens 90% of the time.',
    rcQuestions: [
      'What is your P90 production estimate?',
      'How did you derive your percentile assumptions?',
      'What\'s the gap between P50 and P90?',
    ],
    quiz: {
      questions: [
        {
          id: 'l4q1',
          type: 'multiple-choice',
          question: 'If production follows N(1500, 100), P90 production (90% exceedance) is approximately:',
          options: ['1628 kWh/kWp', '1500 kWh/kWp', '1372 kWh/kWp', '1300 kWh/kWp'],
          correctAnswer: '1372 kWh/kWp',
          explanation: 'P90 (90% exceedance, or 10th percentile) ≈ μ - 1.28σ = 1500 - 128 ≈ 1372.',
        },
        {
          id: 'l4q2',
          type: 'true-false',
          question: 'Debt should be sized using P50 projections to ensure adequate coverage.',
          correctAnswer: false,
          explanation: 'False. Debt is typically sized using P90 (conservative) estimates. P50 is the base case, but lenders want downside protection.',
        },
        {
          id: 'l4q3',
          type: 'multiple-choice',
          question: 'What does "P90 exceedance" mean in solar industry terminology?',
          options: [
            'Production will exceed this value 90% of years',
            'Production will be below this value 90% of years',
            '90% of panels will work',
            'The project has 90% efficiency',
          ],
          correctAnswer: 'Production will exceed this value 90% of years',
          explanation: 'P90 exceedance = 90% probability of exceeding this level = 10th percentile of the distribution.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 5,
    title: 'Sum of Two Independent Variables',
    phase: 'B',
    concept: 'When you add two independent random variables, their means add: E[X+Y] = E[X] + E[Y]. Their variances also add: Var(X+Y) = Var(X) + Var(Y). This is the foundation of diversification.',
    context: 'If you have two independent solar projects, combined revenue is the sum of two random variables. Understanding how uncertainty aggregates is key to portfolio construction.',
    simulation: {
      type: 'sum-independent',
      defaultParams: { mean1: 100, std1: 20, mean2: 100, std2: 20, samples: 1000 },
      description: 'Simulate X, Y independently, compute X+Y. Verify mean adds and variance adds.',
    },
    keyInsight: 'Independent risks: means add, variances add. The combined variance is the sum of individual variances.',
    rcQuestions: [
      'Are your project risks independent?',
      'How does diversification reduce portfolio risk?',
      'What correlation assumptions drive your portfolio model?',
    ],
    quiz: {
      questions: [
        {
          id: 'l5q1',
          type: 'multiple-choice',
          question: 'If X ~ N(100, 20) and Y ~ N(100, 20) are independent, what is the distribution of X + Y?',
          options: [
            'N(200, 20)',
            'N(200, 40)',
            'N(200, 28.3)',
            'N(100, 40)',
          ],
          correctAnswer: 'N(200, 28.3)',
          explanation: 'Mean adds: 100+100=200. Variances add: 400+400=800, so σ=√800≈28.3.',
        },
        {
          id: 'l5q2',
          type: 'true-false',
          question: 'For independent variables, the standard deviation of the sum equals the sum of standard deviations.',
          correctAnswer: false,
          explanation: 'False. Variances add, not standard deviations. σ(X+Y) = √(σ²ₓ + σ²ᵧ) ≠ σₓ + σᵧ.',
        },
        {
          id: 'l5q3',
          type: 'numerical',
          question: 'If Var(X) = 100 and Var(Y) = 100 (independent), what is Var(X+Y)?',
          correctAnswer: 200,
          tolerance: 1,
          explanation: 'For independent variables, Var(X+Y) = Var(X) + Var(Y) = 100 + 100 = 200.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 6,
    title: 'Sum of Two Correlated Variables',
    phase: 'B',
    concept: 'When variables are correlated, variance doesn\'t simply add. Var(X+Y) = Var(X) + Var(Y) + 2·Cov(X,Y). Positive correlation increases combined variance; negative correlation decreases it.',
    context: 'Solar projects in the same region share weather risk (positive correlation). A solar + storage project might have some negative correlation (storage earns more when solar underproduces).',
    simulation: {
      type: 'sum-correlated',
      defaultParams: { mean1: 100, std1: 20, mean2: 100, std2: 20, rho: 0.5, samples: 1000 },
      description: 'Adjust correlation slider (ρ) and see how combined variance changes. ρ=0: independent. ρ=1: perfect correlation.',
    },
    keyInsight: 'Correlation matters. Positive correlation amplifies risk; negative correlation reduces it.',
    rcQuestions: [
      'What correlations exist between your projects?',
      'How does geographic concentration affect risk?',
      'What systematic risks can\'t be diversified?',
    ],
    quiz: {
      questions: [
        {
          id: 'l6q1',
          type: 'multiple-choice',
          question: 'If two projects are perfectly correlated (ρ=1), how does portfolio variance compare to the independent case?',
          options: [
            'Same variance',
            'Higher variance',
            'Lower variance',
            'Zero variance',
          ],
          correctAnswer: 'Higher variance',
          explanation: 'Perfect correlation means Var(X+Y) = Var(X) + Var(Y) + 2σₓσᵧ > Var(X) + Var(Y).',
        },
        {
          id: 'l6q2',
          type: 'true-false',
          question: 'Negative correlation between two assets can reduce portfolio variance below the sum of individual variances.',
          correctAnswer: true,
          explanation: 'True. When ρ<0, the covariance term 2·Cov(X,Y) is negative, reducing total variance.',
        },
        {
          id: 'l6q3',
          type: 'multiple-choice',
          question: 'Two solar projects in the same region likely have what kind of correlation?',
          options: [
            'Negative correlation',
            'Zero correlation',
            'Positive correlation',
            'It depends on panel manufacturer',
          ],
          correctAnswer: 'Positive correlation',
          explanation: 'Same region = same weather patterns, grid conditions, and regulatory environment. These create positive correlation.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 7,
    title: 'The √N Effect (Independent Case)',
    phase: 'B',
    concept: 'When you average N independent, identically distributed (i.i.d.) variables, the standard deviation of the average shrinks by √N. This is the mathematical basis for diversification benefits.',
    context: 'A portfolio of 100 independent solar projects has 10× lower relative volatility than a single project. This is why institutional investors prefer diversified portfolios.',
    simulation: {
      type: 'sqrt-n-effect',
      defaultParams: { mean: 100, stdDev: 20, maxN: 256 },
      description: 'Plot σ(average) vs. N for N=1,4,16,64,256. Watch the √N scaling.',
    },
    keyInsight: 'Diversification works: σ(portfolio average) = σ(individual) / √N. More projects = less relative risk.',
    rcQuestions: [
      'How many projects provide adequate diversification?',
      'What\'s the marginal benefit of adding the Nth project?',
      'When do diversification benefits plateau?',
    ],
    quiz: {
      questions: [
        {
          id: 'l7q1',
          type: 'multiple-choice',
          question: 'If one project has σ=20%, a portfolio of 100 independent projects has σ(average) of approximately:',
          options: ['20%', '10%', '2%', '0.2%'],
          correctAnswer: '2%',
          explanation: 'σ(average) = σ/√N = 20%/√100 = 20%/10 = 2%.',
        },
        {
          id: 'l7q2',
          type: 'true-false',
          question: 'Doubling the number of projects cuts portfolio volatility in half.',
          correctAnswer: false,
          explanation: 'False. Doubling N cuts σ by √2 ≈ 1.41, not 2. You need 4× projects to halve volatility.',
        },
        {
          id: 'l7q3',
          type: 'numerical',
          question: 'How many independent projects do you need to reduce portfolio σ to 1/4 of single project σ?',
          correctAnswer: 16,
          tolerance: 0,
          explanation: 'σ/√N = σ/4 implies √N = 4, so N = 16.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 8,
    title: 'The √N Effect Breaks Down (Correlated Case)',
    phase: 'B',
    concept: 'The √N rule assumes independence. With positive correlation, variance doesn\'t shrink as fast. In the limit of perfect correlation, no amount of diversification helps—you can\'t diversify systematic risk.',
    context: 'All solar projects share some systematic risk: regulatory changes, grid curtailment policy, macroeconomic factors. These correlated risks set a floor on portfolio volatility.',
    simulation: {
      type: 'sqrt-n-correlated',
      defaultParams: { mean: 100, stdDev: 20, rho: 0.3, maxN: 100 },
      description: 'Compare √N decay with ρ=0 vs ρ=0.3 vs ρ=0.7. See how correlation creates a volatility floor.',
    },
    keyInsight: 'Correlation limits diversification. Systematic risk doesn\'t wash out with more projects.',
    rcQuestions: [
      'What systematic risks affect all your projects?',
      'What\'s the irreducible risk in your portfolio?',
      'How does correlation change your sizing assumptions?',
    ],
    quiz: {
      questions: [
        {
          id: 'l8q1',
          type: 'multiple-choice',
          question: 'With perfect correlation (ρ=1), what happens to portfolio volatility as N→∞?',
          options: [
            'It goes to zero',
            'It stays constant (equal to single project volatility)',
            'It increases without bound',
            'It oscillates',
          ],
          correctAnswer: 'It stays constant (equal to single project volatility)',
          explanation: 'With ρ=1, all projects move together. Averaging doesn\'t reduce volatility because there\'s no independent variation.',
        },
        {
          id: 'l8q2',
          type: 'true-false',
          question: 'Some portfolio risk is irreducible because it represents systematic (market-wide) factors.',
          correctAnswer: true,
          explanation: 'True. Systematic risk (shared by all assets) cannot be diversified away. Only idiosyncratic risk benefits from √N.',
        },
        {
          id: 'l8q3',
          type: 'multiple-choice',
          question: 'If average pairwise correlation in a portfolio is ρ=0.25, what does this imply?',
          options: [
            'Perfect diversification is possible',
            'There\'s a floor to how much volatility can be reduced',
            'Projects are negatively correlated',
            'The portfolio has no risk',
          ],
          correctAnswer: 'There\'s a floor to how much volatility can be reduced',
          explanation: 'Positive correlation means systematic risk. As N→∞, portfolio σ approaches σ·√ρ, not zero.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 9,
    title: 'A Simple Cashflow',
    phase: 'C',
    concept: 'A project cashflow is Revenue minus Cost. If both are random variables, Net Cashflow = Revenue - Cost is also a random variable with its own distribution.',
    context: 'A solar project\'s net cashflow depends on uncertain revenue (production × price) and uncertain costs (O&M, insurance, etc.). Understanding this distribution is fundamental to project valuation.',
    simulation: {
      type: 'simple-cashflow',
      defaultParams: { revenueMean: 150, revenueStd: 20, costMean: 80, costStd: 10, samples: 1000 },
      description: 'Simulate Revenue ~ N(150, 20) and Cost ~ N(80, 10). Compute Net = Revenue - Cost. Examine the distribution.',
    },
    keyInsight: 'Cashflow is a random variable. Revenue uncertainty and cost uncertainty both contribute to cashflow uncertainty.',
    rcQuestions: [
      'What\'s your expected operating cashflow?',
      'What drives variance in your cashflow projections?',
      'What\'s the probability of negative cashflow in any year?',
    ],
    quiz: {
      questions: [
        {
          id: 'l9q1',
          type: 'multiple-choice',
          question: 'If Revenue ~ N(150, 20) and Cost ~ N(80, 10) are independent, what is E[Net Cashflow]?',
          options: ['€150k', '€80k', '€70k', '€230k'],
          correctAnswer: '€70k',
          explanation: 'E[Revenue - Cost] = E[Revenue] - E[Cost] = 150 - 80 = €70k.',
        },
        {
          id: 'l9q2',
          type: 'true-false',
          question: 'If revenue and cost are positively correlated (both increase in good years), net cashflow variance is lower than if they were independent.',
          correctAnswer: true,
          explanation: 'True. Positive correlation between R and C means Var(R-C) = Var(R) + Var(C) - 2Cov(R,C) < Var(R) + Var(C).',
        },
        {
          id: 'l9q3',
          type: 'numerical',
          question: 'If Revenue and Cost are independent with σ(R)=20 and σ(C)=10, what is σ(Net)?',
          correctAnswer: 22.36,
          tolerance: 0.5,
          explanation: 'Var(R-C) = Var(R) + Var(C) = 400 + 100 = 500. σ = √500 ≈ 22.36.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 10,
    title: 'Adding a Binary Event (Default)',
    phase: 'C',
    concept: 'A binary event (like bankruptcy) is a Bernoulli random variable: 1 with probability p, 0 otherwise. Project cashflow becomes: Cashflow × (1 - Default). Default creates a fat left tail.',
    context: 'In project finance, counterparty default, regulatory cancellation, or technical failure can wipe out cashflows entirely. These binary events create asymmetric risk.',
    simulation: {
      type: 'binary-default',
      defaultParams: { cashflowMean: 70, cashflowStd: 22, defaultProb: 0.05, samples: 10000 },
      description: 'Simulate cashflow with 5% default probability. See how the distribution changes shape—the left tail becomes fatter.',
    },
    keyInsight: 'Binary events create asymmetric risk. A 5% default probability changes the distribution shape more than it changes the mean.',
    rcQuestions: [
      'What events could cause total loss?',
      'What\'s the probability of counterparty default?',
      'How do you model binary risks in your cashflow?',
    ],
    quiz: {
      questions: [
        {
          id: 'l10q1',
          type: 'multiple-choice',
          question: 'If a project has 5% default probability, what happens to the distribution shape?',
          options: [
            'It stays symmetric',
            'It develops a fat left tail (5% mass at zero)',
            'It becomes uniform',
            'It shifts right',
          ],
          correctAnswer: 'It develops a fat left tail (5% mass at zero)',
          explanation: 'Default creates a point mass at zero (or negative), creating asymmetry and a fat left tail.',
        },
        {
          id: 'l10q2',
          type: 'true-false',
          question: 'A 5% default probability reduces expected cashflow by exactly 5%.',
          correctAnswer: true,
          explanation: 'True. E[CF × (1-D)] = E[CF] × (1 - p) = E[CF] × 0.95, a 5% reduction.',
        },
        {
          id: 'l10q3',
          type: 'multiple-choice',
          question: 'Why is modeling binary events important for lenders?',
          options: [
            'Lenders don\'t care about default',
            'Binary events create tail risk that affects debt recovery',
            'It makes the math easier',
            'Binary events only affect equity',
          ],
          correctAnswer: 'Binary events create tail risk that affects debt recovery',
          explanation: 'Lenders care deeply about downside scenarios. Binary events create the tail risk that determines debt losses.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 11,
    title: 'Multiple Periods',
    phase: 'C',
    concept: 'A project has cashflows over multiple periods. Yearly cashflows may be correlated (autocorrelation) or independent. The sequence of cashflows matters for metrics like minimum DSCR.',
    context: 'A 20-year solar project has 20 annual cashflows. Understanding how uncertainty compounds over time—and whether bad years cluster—is crucial for risk assessment.',
    simulation: {
      type: 'multi-period',
      defaultParams: { periods: 10, meanCashflow: 70, stdDev: 15, autocorrelation: 0.3, samples: 1000 },
      description: 'Simulate 10-year cashflow paths. Plot multiple realizations. See how paths diverge over time.',
    },
    keyInsight: 'Time adds complexity. Multi-period risk isn\'t just single-period risk multiplied—path dependence matters.',
    rcQuestions: [
      'How do your assumptions evolve over the project life?',
      'What\'s the worst-case cashflow sequence?',
      'Are bad years likely to cluster (autocorrelation)?',
    ],
    quiz: {
      questions: [
        {
          id: 'l11q1',
          type: 'multiple-choice',
          question: 'If annual cashflows have positive autocorrelation (ρ=0.3), what does this mean?',
          options: [
            'Good years and bad years are equally likely to follow each other',
            'A bad year makes the next year more likely to be bad',
            'Cashflows are independent each year',
            'The project improves over time',
          ],
          correctAnswer: 'A bad year makes the next year more likely to be bad',
          explanation: 'Positive autocorrelation means persistence: below-average years tend to be followed by below-average years.',
        },
        {
          id: 'l11q2',
          type: 'true-false',
          question: 'For debt sizing, the minimum cashflow over the project life matters more than average cashflow.',
          correctAnswer: true,
          explanation: 'True. Debt must be serviced every period. A single year of insufficient cashflow can trigger default.',
        },
        {
          id: 'l11q3',
          type: 'multiple-choice',
          question: 'Why do multiple realizations of a 10-year project fan out over time?',
          options: [
            'Plotting error',
            'Cumulative uncertainty: small differences compound',
            'The mean increases each year',
            'Interest rates change',
          ],
          correctAnswer: 'Cumulative uncertainty: small differences compound',
          explanation: 'Even with the same annual distribution, different random draws accumulate. Paths diverge as time passes.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 12,
    title: 'IRR as a Random Variable',
    phase: 'C',
    concept: 'The Internal Rate of Return (IRR) is a function of cashflows. If cashflows are random, IRR is random. We can simulate the distribution of IRR to understand return risk.',
    context: 'Investors often quote a single "expected IRR" for a project. But IRR is uncertain—there\'s a distribution of possible IRRs, and understanding the downside (P90 IRR) matters.',
    simulation: {
      type: 'irr-distribution',
      defaultParams: { initialInvestment: -1000, periods: 10, meanCashflow: 150, stdDev: 30, samples: 1000 },
      description: 'Simulate 1,000 projects with random cashflows. Calculate IRR for each. Plot the IRR distribution.',
    },
    keyInsight: 'IRR is a random variable too. Quoting a single IRR hides the distribution of possible outcomes.',
    rcQuestions: [
      'What is your expected IRR? What is P90 IRR?',
      'How sensitive is IRR to your production assumptions?',
      'What\'s the probability IRR falls below your hurdle rate?',
    ],
    quiz: {
      questions: [
        {
          id: 'l12q1',
          type: 'multiple-choice',
          question: 'If cashflows are random, IRR is:',
          options: [
            'Fixed and deterministic',
            'A random variable with its own distribution',
            'Always equal to the discount rate',
            'Not calculable',
          ],
          correctAnswer: 'A random variable with its own distribution',
          explanation: 'IRR is a function of random cashflows, so it inherits randomness. Each simulation gives a different IRR.',
        },
        {
          id: 'l12q2',
          type: 'true-false',
          question: 'P90 IRR tells you the return you can expect with 90% confidence (it\'s the downside case).',
          correctAnswer: true,
          explanation: 'True. P90 (10th percentile) IRR = the return exceeded 90% of the time. It\'s a conservative estimate.',
        },
        {
          id: 'l12q3',
          type: 'multiple-choice',
          question: 'Why is the IRR distribution often left-skewed for solar projects?',
          options: [
            'Solar panels degrade',
            'Downside risks (default, curtailment) truncate cashflows asymmetrically',
            'IRR is always symmetric',
            'Mathematical artifact',
          ],
          correctAnswer: 'Downside risks (default, curtailment) truncate cashflows asymmetrically',
          explanation: 'Binary risks and downside events create a fat left tail in cashflow distributions, which propagates to IRR.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 13,
    title: 'DSCR as a Random Variable',
    phase: 'C',
    concept: 'The Debt Service Coverage Ratio (DSCR) = Net Cashflow / Debt Service. If cashflows are random, DSCR is random. Lenders care about min(DSCR) over the project life—the worst year.',
    context: 'DSCR covenants (e.g., "DSCR must exceed 1.20x") are probabilistic constraints. Structuring debt requires understanding the probability that DSCR falls below covenant levels.',
    simulation: {
      type: 'dscr-distribution',
      defaultParams: { periods: 10, meanCashflow: 100, stdDev: 15, debtService: 70, samples: 1000 },
      description: 'Simulate DSCR paths. Focus on min(DSCR) over the project life. What\'s the probability of covenant breach?',
    },
    keyInsight: 'Lenders see through the DSCR lens. Minimum DSCR over project life is the critical metric for debt sizing.',
    rcQuestions: [
      'What is your minimum projected DSCR?',
      'What\'s the probability of DSCR falling below 1.20x?',
      'How do you size debt to maintain adequate coverage?',
    ],
    quiz: {
      questions: [
        {
          id: 'l13q1',
          type: 'multiple-choice',
          question: 'If a project has DSCR covenant of 1.20x, what happens if DSCR drops to 1.10x?',
          options: [
            'Nothing, it\'s close enough',
            'Technical default / covenant breach',
            'The project automatically improves',
            'Interest rate decreases',
          ],
          correctAnswer: 'Technical default / covenant breach',
          explanation: 'Breaching DSCR covenant triggers technical default, potentially leading to cash sweeps, restructuring, or acceleration.',
        },
        {
          id: 'l13q2',
          type: 'true-false',
          question: 'Average DSCR over project life is more important than minimum DSCR for lenders.',
          correctAnswer: false,
          explanation: 'False. Lenders focus on min(DSCR). One bad year can trigger default, even if average DSCR is healthy.',
        },
        {
          id: 'l13q3',
          type: 'numerical',
          question: 'If Net Cashflow = €100k and Debt Service = €80k, what is DSCR?',
          correctAnswer: 1.25,
          tolerance: 0.01,
          explanation: 'DSCR = Net Cashflow / Debt Service = 100 / 80 = 1.25x.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 14,
    title: 'Portfolio of N Projects',
    phase: 'D',
    concept: 'A portfolio aggregates N projects. Portfolio statistics depend on individual project distributions AND their correlations. This is where Lessons 5-8 concepts become practical.',
    context: 'Institutional solar investors manage portfolios of 50-500 projects. Understanding how portfolio-level risk differs from project-level risk is essential for capital allocation.',
    simulation: {
      type: 'portfolio-aggregation',
      defaultParams: { numProjects: 50, projectMean: 100, projectStd: 25, correlation: 0.2, samples: 1000 },
      description: 'Simulate a portfolio of 50 projects with 20% pairwise correlation. Compare portfolio volatility to single project.',
    },
    keyInsight: 'Portfolio effects are real but limited. Correlation sets a floor on diversification benefits.',
    rcQuestions: [
      'What\'s your portfolio-level volatility?',
      'How does adding projects change portfolio risk?',
      'What correlation assumptions drive your portfolio model?',
    ],
    quiz: {
      questions: [
        {
          id: 'l14q1',
          type: 'multiple-choice',
          question: 'A portfolio of 100 projects with 30% average pairwise correlation has volatility that:',
          options: [
            'Goes to zero as you add more projects',
            'Equals single project volatility',
            'Approaches σ√ρ ≈ 0.55σ as N→∞',
            'Increases with more projects',
          ],
          correctAnswer: 'Approaches σ√ρ ≈ 0.55σ as N→∞',
          explanation: 'With correlation ρ, large portfolio σ → σ√ρ = σ√0.3 ≈ 0.55σ. Correlation creates an irreducible floor.',
        },
        {
          id: 'l14q2',
          type: 'true-false',
          question: 'Geographic diversification helps reduce correlation between projects.',
          correctAnswer: true,
          explanation: 'True. Projects in different regions face different weather, grid, and regulatory conditions, reducing correlation.',
        },
        {
          id: 'l14q3',
          type: 'multiple-choice',
          question: 'Why do institutional investors prefer portfolios over single projects?',
          options: [
            'Single projects are illegal',
            'Portfolio diversification reduces relative volatility',
            'Portfolios have higher returns',
            'Administrative convenience only',
          ],
          correctAnswer: 'Portfolio diversification reduces relative volatility',
          explanation: 'Diversification reduces volatility per unit of exposure, improving risk-adjusted returns.',
        },
      ],
      passingScore: 80,
    },
  },
  {
    id: 15,
    title: 'Reserve Sizing (Credit Enhancement)',
    phase: 'D',
    concept: 'Reserves (like DSRA - Debt Service Reserve Account) buffer against cashflow shortfalls. Reserve sizing is a probability problem: how much buffer to achieve X% confidence of no shortfall?',
    context: 'Credit enhancement structures (reserves, guarantees, tranching) all map to tail risk management. Sizing reserves correctly requires understanding the distribution of worst-case outcomes.',
    simulation: {
      type: 'reserve-sizing',
      defaultParams: { periods: 10, meanDSCR: 1.3, dscrStd: 0.15, targetConfidence: 95, samples: 10000 },
      description: 'Simulate minimum DSCR across paths. Find reserve size needed for 95% confidence of meeting debt service.',
    },
    keyInsight: 'Reserves are probabilistic insurance. Sizing them requires understanding tail risk, not just averages.',
    rcQuestions: [
      'How did you size your DSRA?',
      'What confidence level does your reserve provide?',
      'What happens if the reserve is depleted?',
    ],
    quiz: {
      questions: [
        {
          id: 'l15q1',
          type: 'multiple-choice',
          question: 'A DSRA sized at 6 months of debt service provides protection against:',
          options: [
            'Long-term structural underperformance',
            'Short-term cashflow timing mismatches',
            'Complete project failure',
            'Interest rate increases',
          ],
          correctAnswer: 'Short-term cashflow timing mismatches',
          explanation: '6 months DSRA buffers temporary shortfalls. It doesn\'t protect against structural problems or default.',
        },
        {
          id: 'l15q2',
          type: 'true-false',
          question: 'Larger reserves always mean safer deals for lenders.',
          correctAnswer: false,
          explanation: 'False. Excessive reserves can strain liquidity and indicate poor deal economics. Optimal sizing balances cost and protection.',
        },
        {
          id: 'l15q3',
          type: 'multiple-choice',
          question: 'To size reserves for 99% confidence vs. 95% confidence, you need:',
          options: [
            'About the same reserve',
            'Slightly larger reserve (maybe 10-20% more)',
            'Significantly larger reserve (often 50%+ more)',
            'Smaller reserve',
          ],
          correctAnswer: 'Significantly larger reserve (often 50%+ more)',
          explanation: 'Tail percentiles are nonlinear. Moving from 95% to 99% means covering rarer events, often requiring much larger buffers.',
        },
      ],
      passingScore: 80,
    },
  },
];

export function getLesson(id: number): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

export function getPhaseForLesson(lessonId: number): PhaseInfo | undefined {
  return phases.find(p => p.lessons.includes(lessonId));
}

export function getNextLesson(currentId: number): number | null {
  const currentIndex = lessons.findIndex(l => l.id === currentId);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) return null;
  return lessons[currentIndex + 1].id;
}

export function getPreviousLesson(currentId: number): number | null {
  const currentIndex = lessons.findIndex(l => l.id === currentId);
  if (currentIndex <= 0) return null;
  return lessons[currentIndex - 1].id;
}
