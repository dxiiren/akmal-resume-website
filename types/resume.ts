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
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  cgpa?: string
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
}

export interface Project {
  name: string
  year: string
  technologies: string[]
  achievements: string[]
  type?: 'Integration' | 'Platform' | 'System'
  impactMetric?: string
}

export interface Certification {
  name: string
  provider: string
  year: string
}

export interface Reference {
  name: string
  title: string
  company: string
  phone: string
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
  references: Reference[]
  // New brand identity fields
  tagline?: string
  roles?: string[]
  stats?: Stat[]
  aboutMe?: AboutMe
  terminalSnippet?: TerminalSnippet
}
