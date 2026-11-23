export const profile = {
  siteName: 'Yewei Wang',
  name: 'Yewei Wang',
  handle: '#2005',
  initials: 'YW',
  discordUserId: '487826956210012170',
  about: "I'm a Data Science student at UC Berkeley with experience in data analytics, automation, and predictive modeling. Skilled in Python, SQL, Excel, and Power BI, I enjoy turning complex data into actionable insights and building data-driven solutions to real-world problems.",
  roles: ['Data Analyst', 'Software Engineering Intern'],
  note: 'I love programming.',
  education: [
    {
      mark: 'B',
      school: 'University of California, Berkeley',
      degree: 'Bachelor in Data Science',
      gpa: '3.83 / 4.0',
      location: 'Berkeley, CA',
      graduation: 'Expected graduation: Fall 2026',
      details: ["Honors: Dean’s List (College of Computing, Data Science, and Society)"],
    },
    {
      school: 'Pasadena City College',
      mark: 'PCC',
      degree: 'Community college',
      gpa: '4.0 / 4.0',
      location: 'Pasadena, CA',
      details: [],
    },
  ],
  workExperience: [
    {
      role: 'Data Analyst – Commercial Real Estate Operations',
      company: 'Property Plus Management',
      location: 'Los Angeles',
      date: 'May 2024 – May 2026',
      description: [
        'Analyzed 10,000+ maintenance records using Python to evaluate vendor costs, job frequency, and property-level spending, improving visibility into operating expenses by 60%.',
        'Investigated cost anomalies and vendor spending trends across properties, identifying the top 5–10% highest-cost vendors and uncovering approximately $200,000 in potential overspending.',
        'Created Matplotlib and Seaborn visualizations comparing vendor performance, repair categories, and spending trends, identifying AC, plumbing, and pest control as three major cost drivers to inform operational decisions.',
      ],
    },
    {
      role: 'Software Engineering Intern',
      company: 'Zoofi Inc',
      location: 'Sunnyvale, CA',
      date: 'September 2025 – December 2025',
      description: [
        'Developed Python and FastAPI backend workflows to retrieve customer data from Firebase and transform personal and financial records into structured, queryable datasets for analysis and reporting.',
        'Built an automated data summarization pipeline using Python and Google ADK, reducing manual reporting time by 60% and improving the efficiency of recurring analytical workflows.',
        'Integrated backend data processing with AI-enabled summarization to standardize analytical outputs and provide consistent customer insights for product analysis.',
      ],
    },
  ],
  projects: [
    {
      name: 'CollegeScope',
      href: 'https://github.com/yw05?tab=repositories&q=CollegeScope',
      linkLabel: 'Find project on GitHub',
      category: 'Data engineering & analytics',
      caption: 'Institutions, through a data lens.',
      tools: ['Python', 'PostgreSQL', 'FastAPI', 'SQLAlchemy'],
      description: [
        'Built an analytics platform integrating College Scorecard and QS ranking datasets to support institutional comparisons, filtering, and data-driven analysis.',
        'Developed a Python and pandas ETL pipeline to clean, transform, merge, and load large datasets into indexed PostgreSQL tables for efficient analytical queries.',
        'Implemented SQL analytics and FastAPI endpoints for tuition, enrollment, graduation outcomes, and rankings, with automated database initialization and testing.',
      ],
    },
    {
      name: 'Housing Price Prediction Model',
      href: 'https://github.com/yw05?tab=repositories&q=housing',
      linkLabel: 'Find project on GitHub',
      category: 'Machine learning',
      caption: 'Housing, through a different lens.',
      tools: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Seaborn'],
      description: [
        'Performed exploratory analysis on 200K+ housing records with 60+ features, examining distributions, applying transformations, and removing outliers to improve data quality.',
        'Engineered features from structured property attributes and text data to improve model inputs and analytical consistency.',
        'Built and evaluated linear regression models using train-validation splits and k-fold cross-validation to compare predictive performance and reduce RMSE.',
      ],
    },
  ],
  socials: [
    { label: 'LinkedIn', shortLabel: 'in', href: 'https://www.linkedin.com/in/yeweiw' },
    { label: 'GitHub', shortLabel: 'gh', href: 'https://github.com/yw05' },
    { label: 'Resume', shortLabel: 'CV', href: '/resume.pdf', download: 'Yewei-Wang-Resume.pdf' },
  ],
}

export const skillGroups = [
  { title: 'Languages & Frameworks', items: ['Python', 'C++', 'Java', 'SQL', 'FastAPI'] },
  { title: 'Libraries', items: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'scikit-learn', 'SFML'] },
  { title: 'Analytics, BI & Collaboration', items: ['Excel', 'Power BI', 'Tableau', 'Word', 'PowerPoint', 'Outlook', 'SharePoint', 'Teams', 'Access', 'Jira', 'Confluence', 'Slack', 'Notion', 'Google Workspace'] },
  { title: 'Developer Tools', items: ['Git', 'VS Code', 'Jupyter Notebook', 'PostgreSQL', 'Firebase'] },
]
