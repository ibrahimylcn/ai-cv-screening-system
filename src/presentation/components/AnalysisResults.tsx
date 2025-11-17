'use client';

import { AnalysisResult } from '@/domain/models/AnalysisResult';
import { CheckCircle2, XCircle, FileText, TrendingUp, Award, GraduationCap, Sparkles, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedSkillScore, setAnimatedSkillScore] = useState(0);
  const [animatedExpScore, setAnimatedExpScore] = useState(0);
  const [animatedEduScore, setAnimatedEduScore] = useState(0);

  useEffect(() => {
    // Animate scores
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (
      start: number,
      end: number,
      callback: (value: number) => void
    ) => {
      let current = start;
      const increment = (end - start) / steps;
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          current = end;
          clearInterval(timer);
        }
        callback(Math.round(current));
      }, stepDuration);
    };

    animateValue(0, result.overallScore, setAnimatedScore);
    animateValue(0, result.skillMatchScore, setAnimatedSkillScore);
    animateValue(0, result.experienceScore, setAnimatedExpScore);
    animateValue(0, result.educationScore, setAnimatedEduScore);
  }, [result]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-green-600', bg: 'bg-green-100', ring: 'ring-green-500', gradient: 'from-green-500 to-emerald-500' };
    if (score >= 60) return { text: 'text-yellow-600', bg: 'bg-yellow-100', ring: 'ring-yellow-500', gradient: 'from-yellow-500 to-orange-500' };
    return { text: 'text-red-600', bg: 'bg-red-100', ring: 'ring-red-500', gradient: 'from-red-500 to-pink-500' };
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const overallColor = getScoreColor(result.overallScore);

  return (
    <div className="glass-strong rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Analiz Sonuçları</h2>
        <p className="text-gray-600">CV ve iş deneyimi bilgileri analizi</p>
      </div>

      {/* Overall Score - Modern Circular Progress */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          {/* Background Circle */}
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - animatedScore / 100)}`}
              className={`text-${overallColor.ring.replace('ring-', '')} transition-all duration-1000 ease-out`}
            />
          </svg>
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl sm:text-6xl font-bold ${overallColor.text}`}>
              {animatedScore}
            </div>
            <div className="text-sm sm:text-base text-gray-600 mt-1">Genel Skor</div>
          </div>
        </div>
      </div>

      {/* Score Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Skill Match */}
        <div className="group relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Yetenek</h3>
          </div>
          <div className="mb-3">
            <div className="text-4xl font-bold text-blue-600 mb-1">{animatedSkillScore}%</div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 progress-bar`}
                style={{ width: `${animatedSkillScore}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{result.details.skillAnalysis.requiredMatches}</span> / {result.details.skillAnalysis.totalRequired} gerekli yetenek
          </div>
        </div>

        {/* Experience */}
        <div className="group relative p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Deneyim</h3>
          </div>
          <div className="mb-3">
            <div className="text-4xl font-bold text-purple-600 mb-1">{animatedExpScore}%</div>
            <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000 progress-bar`}
                style={{ width: `${animatedExpScore}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-600 capitalize">
            <span className="font-semibold">{result.details.experienceAnalysis.experienceLevel}</span> seviye
          </div>
        </div>

        {/* Education */}
        <div className="group relative p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Eğitim</h3>
          </div>
          <div className="mb-3">
            <div className="text-4xl font-bold text-green-600 mb-1">{animatedEduScore}%</div>
            <div className="h-2 bg-green-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 progress-bar`}
                style={{ width: `${animatedEduScore}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {result.details.educationAnalysis.meetsEducationRequirement ? (
              <span className="font-semibold text-green-700">✓ Uygun</span>
            ) : (
              <span className="font-semibold text-red-700">✗ Uygun değil</span>
            )}
          </div>
        </div>
      </div>

      {/* Matching Skills */}
      {result.matchingSkills.length > 0 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            Eşleşen Yetenekler
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-semibold border border-green-300 hover:border-green-400 transition-all duration-200 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {result.missingSkills.length > 0 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            Eksik Yetenekler
          </h3>
          <div className="space-y-3">
            {result.details.skillAnalysis.missingRequired.length > 0 && (
              <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl">
                <div className="text-sm font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Gerekli Eksik Yetenekler:
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.details.skillAnalysis.missingRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-red-200 text-red-900 rounded-full text-sm font-medium border border-red-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.details.skillAnalysis.missingPreferred.length > 0 && (
              <div className="p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-2xl">
                <div className="text-sm font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Tercih Edilen Eksik Yetenekler:
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.details.skillAnalysis.missingPreferred.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-yellow-200 text-yellow-900 rounded-full text-sm font-medium border border-yellow-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Report */}
      <div className="animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          Detaylı Analiz Raporu
        </h3>
        <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl shadow-inner">
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {result.report}
          </div>
        </div>
      </div>

      {/* Analysis Metadata */}
      <div className="pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
        <p>Analiz Tarihi: <span className="font-semibold">{new Date(result.analyzedAt).toLocaleString('tr-TR')}</span></p>
      </div>
    </div>
  );
}
