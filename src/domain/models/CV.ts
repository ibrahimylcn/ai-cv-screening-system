/**
 * CV domain model
 * CV bilgilerini temsil eden domain entity
 */
export interface CV {
  id: string;
  fileName: string;
  content: string;
  uploadedAt: Date;
  fileSize: number;
  fileType: string;
}

/**
 * CV'den çıkarılan bilgiler
 */
export interface ExtractedCVData {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  education?: string;
  skills: string[];
  languages?: string[];
  certifications?: string[];
  summary?: string;
}

