export interface ContactInfo {
  name: string
  title: string
  location: string
  phone: string
  email: string
  linkedin: string
  website: string
  image: string
  github: string
  whatsapp: string
  calendly: string
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  cgpa?: string
  status?: 'ongoing' | 'completed' | 'planned'
  expectedCompletion?: string
  link?: string
  logo?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Experience {
  title: string
  company: string
  duration?: string
  period: string
  location: string
  workMode: string
  achievements: string[]
  impactMetric?: string
  link?: string
  logo?: string
}

export interface ProjectCaseStudy {
  problem: string
  approach: string
  solution: string
  results: string[]
  codeSnippet?: {
    language: string
    code: string
  }
}

export interface Project {
  name: string
  year: string
  technologies: string[]
  achievements: string[]
  type?: 'Integration' | 'Platform' | 'System'
  impactMetric?: string
  link?: string
  caseStudy?: ProjectCaseStudy
  featured?: boolean
}

export interface Certification {
  name: string
  provider: string
  year: string
  link?: string
  logo?: string
}

// New interfaces for brand identity
export interface Stat {
  value: string
  label: string
  suffix?: string
}

export interface Pillar {
  title: string
  icon: string
  description: string
}

export interface FunFact {
  icon: string
  text: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
  relationship?: string
  date?: string
  image?: string
  linkedinUrl?: string
}

export interface AboutMe {
  pillars: Pillar[]
  funFacts: FunFact[]
}

export interface TerminalSnippet {
  language: string
  code: string
}

export interface Resume {
  contact: ContactInfo
  summary: string
  education: Education[]
  skills: SkillCategory[]
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  testimonials?: Testimonial[]
  // New brand identity fields
  tagline?: string
  roles?: string[]
  stats?: Stat[]
  aboutMe?: AboutMe
  terminalSnippet?: TerminalSnippet
}
