'use client';

import { useState, useEffect } from 'react';
import { FileUpload } from '@/presentation/components/FileUpload';
import { AnalysisResults } from '@/presentation/components/AnalysisResults';
import { AnalysisResult } from '@/domain/models/AnalysisResult';
import { CV } from '@/domain/models/CV';
import { Sparkles, FileCheck, AlertCircle, X } from 'lucide-react';

export default function Home() {
  const [cv, setCv] = useState<CV | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAnalyze = async (autoTrigger = false) => {
    if (!cv) {
      setError('Lütfen CV yükleyin');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    if (!autoTrigger) {
      setAnalysisResult(null);
    }

    try {
      const formData = new FormData();
      formData.append('cvId', cv.id);
      formData.append('cvContent', cv.content);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analiz sırasında bir hata oluştu');
      }

      const result = await response.json();
      setAnalysisResult(result);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // CV yüklendiğinde otomatik analiz yap
  useEffect(() => {
    if (cv && !isAnalyzing && !analysisResult) {
      // Kısa bir gecikme ile otomatik analiz başlat
      const timer = setTimeout(() => {
        handleAnalyze(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cv]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            CV Analiz ve Ön Eleme Paneli
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            AI destekli CV analizi ile doğru adayları hızlıca bulun
          </p>
        </div>

        {/* Error Message with Animation */}
        {showError && error && (
          <div className="mb-6 animate-slide-in">
            <div className="glass-strong rounded-2xl p-4 border-l-4 border-red-500 shadow-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setShowError(false)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* CV Upload Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="glass rounded-2xl shadow-2xl p-6 sm:p-8 hover-lift animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                CV Yükle
              </h2>
            </div>
            <FileUpload onFileUploaded={setCv} />
            {cv && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <FileCheck className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800">
                      {cv.fileName}
                    </p>
                    <p className="text-xs text-green-600">
                      {Math.round(cv.fileSize / 1024)} KB • Başarıyla yüklendi
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isAnalyzing && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 animate-fade-in">
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm font-medium text-blue-800">
                    CV analiz ediliyor...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div id="analysis-results" className="animate-fade-in">
            <AnalysisResults result={analysisResult} />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}

