/**
 * CV analiz servisi implementasyonu
 * Application katmanı - business logic burada
 */
import { ICVAnalysisService } from '@/domain/services/CVAnalysisService';
import { CV } from '@/domain/models/CV';
import { JobPosting } from '@/domain/models/JobPosting';
import { AnalysisResult, SkillAnalysis, ExperienceAnalysis, EducationAnalysis } from '@/domain/models/AnalysisResult';
import { GeminiAIClient, AIAnalysisResponse } from '@/infrastructure/ai/GeminiAIClient';

export class CVAnalysisServiceImpl implements ICVAnalysisService {
  constructor(private aiClient: GeminiAIClient) {}

  async analyzeCV(cv: CV, jobPosting: JobPosting): Promise<AnalysisResult> {
    // AI ile analiz yap
    const aiResponse = await this.aiClient.analyzeCV({
      cvContent: cv.content,
      jobDescription: jobPosting.description,
      requiredSkills: jobPosting.requiredSkills,
      preferredSkills: jobPosting.preferredSkills,
    });

    // Skorları hesapla
    const scores = this.calculateScores(aiResponse, jobPosting);

    // Detaylı analiz sonuçlarını oluştur
    const details = this.buildAnalysisDetails(aiResponse, jobPosting);

    return {
      cvId: cv.id,
      jobPostingId: jobPosting.id,
      overallScore: scores.overall,
      skillMatchScore: scores.skillMatch,
      experienceScore: scores.experience,
      educationScore: scores.education,
      missingSkills: aiResponse.analysis.skillMatch.missing,
      matchingSkills: aiResponse.analysis.skillMatch.matching,
      report: aiResponse.report,
      analyzedAt: new Date(),
      details,
    };
  }

  /**
   * Skorları hesaplar
   */
  private calculateScores(aiResponse: AIAnalysisResponse, jobPosting: JobPosting) {
    // Yetenek eşleşme skoru (0-100)
    const requiredMatches = aiResponse.analysis.skillMatch.matching.filter(skill =>
      jobPosting.requiredSkills.some(required => 
        required.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(required.toLowerCase())
      )
    ).length;

    const preferredMatches = aiResponse.analysis.skillMatch.matching.filter(skill =>
      jobPosting.preferredSkills.some(preferred => 
        preferred.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(preferred.toLowerCase())
      )
    ).length;

    const totalRequired = jobPosting.requiredSkills.length;
    const totalPreferred = jobPosting.preferredSkills.length;

    const skillMatchScore = totalRequired > 0
      ? Math.round((requiredMatches / totalRequired) * 70 + (preferredMatches / Math.max(totalPreferred, 1)) * 30)
      : 50;

    // Deneyim skoru (0-100)
    let experienceScore = 50; // Default
    const experienceLevel = aiResponse.analysis.experienceLevel;
    if (experienceLevel === 'expert') experienceScore = 100;
    else if (experienceLevel === 'senior') experienceScore = 85;
    else if (experienceLevel === 'mid') experienceScore = 70;
    else if (experienceLevel === 'junior') experienceScore = 50;

    // Eğitim skoru (0-100)
    const educationScore = aiResponse.analysis.educationMatch ? 100 : 50;

    // Genel skor (ağırlıklı ortalama)
    const overallScore = Math.round(
      skillMatchScore * 0.5 + // %50 yetenek
      experienceScore * 0.3 + // %30 deneyim
      educationScore * 0.2    // %20 eğitim
    );

    return {
      overall: overallScore,
      skillMatch: skillMatchScore,
      experience: experienceScore,
      education: educationScore,
    };
  }

  /**
   * Detaylı analiz bilgilerini oluşturur
   */
  private buildAnalysisDetails(
    aiResponse: AIAnalysisResponse,
    jobPosting: JobPosting
  ): AnalysisResult['details'] {
    const matchingRequired = aiResponse.analysis.skillMatch.matching.filter(skill =>
      jobPosting.requiredSkills.some(required => 
        required.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(required.toLowerCase())
      )
    );

    const matchingPreferred = aiResponse.analysis.skillMatch.matching.filter(skill =>
      jobPosting.preferredSkills.some(preferred => 
        preferred.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(preferred.toLowerCase())
      )
    );

    const missingRequired = jobPosting.requiredSkills.filter(required =>
      !aiResponse.analysis.skillMatch.matching.some(matching =>
        required.toLowerCase().includes(matching.toLowerCase()) ||
        matching.toLowerCase().includes(required.toLowerCase())
      )
    );

    const missingPreferred = jobPosting.preferredSkills.filter(preferred =>
      !aiResponse.analysis.skillMatch.matching.some(matching =>
        preferred.toLowerCase().includes(matching.toLowerCase()) ||
        matching.toLowerCase().includes(preferred.toLowerCase())
      )
    );

    return {
      skillAnalysis: {
        requiredMatches: matchingRequired.length,
        preferredMatches: matchingPreferred.length,
        totalRequired: jobPosting.requiredSkills.length,
        totalPreferred: jobPosting.preferredSkills.length,
        missingRequired,
        missingPreferred,
      },
      experienceAnalysis: {
        hasRequiredExperience: aiResponse.analysis.experienceLevel !== 'junior',
        experienceLevel: aiResponse.analysis.experienceLevel as 'junior' | 'mid' | 'senior' | 'expert',
        relevantExperience: aiResponse.extractedData.experience,
      },
      educationAnalysis: {
        meetsEducationRequirement: aiResponse.analysis.educationMatch,
        relevantEducation: aiResponse.extractedData.education,
      },
    };
  }
}

