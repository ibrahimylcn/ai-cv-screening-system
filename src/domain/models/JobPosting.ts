/**
 * İş ilanı domain model
 * İş ilanı bilgilerini temsil eden domain entity
 */
export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperience?: string;
  educationLevel?: string;
  languages?: string[];
  createdAt: Date;
}

