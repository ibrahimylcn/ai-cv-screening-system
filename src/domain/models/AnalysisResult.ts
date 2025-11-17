/**
 * CV analiz sonucu domain model
 * Analiz sonuçlarını temsil eden value object
 */
export interface AnalysisResult {
  cvId: string;
  jobPostingId: string;
  overallScore: number; // 0-100 arası uygunluk skoru
  skillMatchScore: number; // Yetenek eşleşme skoru
  experienceScore: number; // Deneyim skoru
  educationScore: number; // Eğitim skoru
  missingSkills: string[]; // Eksik yetenekler
  matchingSkills: string[]; // Eşleşen yetenekler
  report: string; // Otomatik üretilen rapor
  analyzedAt: Date;
  details: {
    skillAnalysis: SkillAnalysis;
    experienceAnalysis: ExperienceAnalysis;
    educationAnalysis: EducationAnalysis;
  };
}

export interface SkillAnalysis {
  requiredMatches: number;
  preferredMatches: number;
  totalRequired: number;
  totalPreferred: number;
  missingRequired: string[];
  missingPreferred: string[];
}

export interface ExperienceAnalysis {
  hasRequiredExperience: boolean;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  yearsOfExperience?: number;
  relevantExperience?: string;
}

export interface EducationAnalysis {
  meetsEducationRequirement: boolean;
  educationLevel?: string;
  relevantEducation?: string;
}

