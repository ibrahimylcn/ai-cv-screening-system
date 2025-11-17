/**
 * CV analiz API endpoint
 * Application katmanı - analiz servisini çağırır
 */
import { NextRequest, NextResponse } from 'next/server';
import { GeminiAIClient } from '@/infrastructure/ai/GeminiAIClient';
import { CV } from '@/domain/models/CV';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Form verilerini al
    const cvId = formData.get('cvId') as string;
    const cvContent = formData.get('cvContent') as string;

    // Validasyon
    if (!cvId || !cvContent) {
      return NextResponse.json(
        { error: 'CV içeriği gereklidir' },
        { status: 400 }
      );
    }

    // API key kontrolü
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key yapılandırılmamış' },
        { status: 500 }
      );
    }

    // Domain modeli oluştur
    const cv: CV = {
      id: cvId,
      fileName: 'uploaded-cv',
      content: cvContent,
      uploadedAt: new Date(),
      fileSize: 0,
      fileType: 'text/plain',
    };

    // AI client oluştur ve CV analizi yap
    const aiClient = new GeminiAIClient(apiKey);
    const aiResponse = await aiClient.analyzeCV({
      cvContent: cv.content,
    });

    // Analiz sonuçlarını oluştur
    const result = {
      cvId: cv.id,
      jobPostingId: 'cv-analysis',
      overallScore: 75, // Genel analiz için varsayılan skor
      skillMatchScore: 100, // Tüm yetenekler eşleşiyor (karşılaştırma yok)
      experienceScore: aiResponse.analysis.experienceLevel === 'expert' ? 100 :
                       aiResponse.analysis.experienceLevel === 'senior' ? 85 :
                       aiResponse.analysis.experienceLevel === 'mid' ? 70 : 50,
      educationScore: 100,
      missingSkills: [],
      matchingSkills: aiResponse.extractedData.skills,
      report: aiResponse.report,
      analyzedAt: new Date(),
      details: {
        skillAnalysis: {
          requiredMatches: 0,
          preferredMatches: 0,
          totalRequired: 0,
          totalPreferred: 0,
          missingRequired: [],
          missingPreferred: [],
        },
        experienceAnalysis: {
          hasRequiredExperience: true,
          experienceLevel: aiResponse.analysis.experienceLevel as 'junior' | 'mid' | 'senior' | 'expert',
          relevantExperience: aiResponse.extractedData.experience,
        },
        educationAnalysis: {
          meetsEducationRequirement: true,
          relevantEducation: aiResponse.extractedData.education,
        },
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('CV analiz hatası:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analiz sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

