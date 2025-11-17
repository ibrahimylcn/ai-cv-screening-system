/**
 * Google Gemini AI client
 * AI servisleri için infrastructure katmanı implementasyonu
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIPromptOptions {
  cvContent: string;
}

export interface AIAnalysisResponse {
  extractedData: {
    skills: string[];
    experience: string;
    education: string;
    summary: string;
  };
  analysis: {
    skillMatch: {
      matching: string[];
      missing: string[];
    };
    experienceLevel: string;
    educationMatch: boolean;
  };
  report: string;
}

export class GeminiAIClient {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string, modelName?: string) {
    if (!apiKey) {
      throw new Error('Google API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Varsayılan model: Gemini 2.5 Flash
    // Environment variable veya parametre ile override edilebilir
    const selectedModel = modelName || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    this.model = this.genAI.getGenerativeModel({ model: selectedModel });
  }

  /**
   * CV içeriğini analiz eder
   */
  async analyzeCV(options: AIPromptOptions): Promise<AIAnalysisResponse> {
    const prompt = this.buildAnalysisPrompt(options);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // AI'dan gelen JSON response'u parse et
      return this.parseAIResponse(text);
    } catch (error) {
      console.error('Gemini AI analiz hatası:', error);
      throw new Error('CV analizi sırasında bir hata oluştu');
    }
  }

  /**
   * Analiz için prompt oluşturur
   */
  private buildAnalysisPrompt(options: AIPromptOptions): string {
    return `
Sen bir İnsan Kaynakları uzmanısın. Aşağıdaki CV'yi detaylı bir şekilde analiz et.

CV İÇERİĞİ:
${options.cvContent}

Lütfen aşağıdaki JSON formatında yanıt ver:

{
  "extractedData": {
    "skills": ["yetenek1", "yetenek2", ...],
    "experience": "deneyim açıklaması",
    "education": "eğitim bilgisi",
    "summary": "özet"
  },
  "analysis": {
    "skillMatch": {
      "matching": ["CV'de bulunan tüm yetenekler"],
      "missing": []
    },
    "experienceLevel": "junior|mid|senior|expert",
    "educationMatch": true
  },
  "report": "CV'nin detaylı analiz raporu (Türkçe, 200-300 kelime). Yetenekler, deneyim seviyesi, eğitim ve genel değerlendirme içermeli."
}

Sadece JSON döndür, başka açıklama yapma.
`;
  }

  /**
   * AI response'unu parse eder
   */
  private parseAIResponse(text: string): AIAnalysisResponse {
    try {
      // JSON'u temizle (markdown code block varsa kaldır)
      const cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanedText);

      return {
        extractedData: {
          skills: parsed.extractedData?.skills || [],
          experience: parsed.extractedData?.experience || '',
          education: parsed.extractedData?.education || '',
          summary: parsed.extractedData?.summary || '',
        },
        analysis: {
          skillMatch: {
            matching: parsed.analysis?.skillMatch?.matching || [],
            missing: parsed.analysis?.skillMatch?.missing || [],
          },
          experienceLevel: parsed.analysis?.experienceLevel || 'mid',
          educationMatch: parsed.analysis?.educationMatch || false,
        },
        report: parsed.report || 'Analiz tamamlandı.',
      };
    } catch (error) {
      console.error('AI response parse hatası:', error);
      // Fallback response
      return {
        extractedData: {
          skills: [],
          experience: '',
          education: '',
          summary: '',
        },
        analysis: {
          skillMatch: {
            matching: [],
            missing: [],
          },
          experienceLevel: 'mid',
          educationMatch: false,
        },
        report: 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.',
      };
    }
  }
}

