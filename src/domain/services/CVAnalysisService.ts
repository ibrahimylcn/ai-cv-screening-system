/**
 * CV analiz servisi interface
 * Domain katmanında tanımlanan abstraction
 */
import { CV } from '../models/CV';
import { JobPosting } from '../models/JobPosting';
import { AnalysisResult } from '../models/AnalysisResult';

export interface ICVAnalysisService {
  /**
   * CV ve adayın iş deneyimi bilgilerini analiz eder, karşılaştırmalı analiz ve rapor üretir
   */
  analyzeCV(cv: CV, jobPosting: JobPosting): Promise<AnalysisResult>;
}

