'use client';

import { useState } from 'react';
import { Briefcase, Plus, X, AlertCircle } from 'lucide-react';
import { JobPosting } from '@/domain/models/JobPosting';

interface JobPostingFormProps {
  onJobPostingCreated: (jobPosting: JobPosting) => void;
}

export function JobPostingForm({ onJobPostingCreated }: JobPostingFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkill, setRequiredSkill] = useState('');
  const [preferredSkill, setPreferredSkill] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [requiredExperience, setRequiredExperience] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Pozisyon/Unvan gereklidir';
    }
    if (!description.trim()) {
      newErrors.description = 'İş deneyimi açıklaması gereklidir';
    }
    if (requiredSkills.length === 0) {
      newErrors.requiredSkills = 'En az bir yetenek eklemelisiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const jobPosting: JobPosting = {
      id: `job-${Date.now()}`,
      title,
      description,
      requiredSkills,
      preferredSkills,
      requiredExperience: requiredExperience || undefined,
      educationLevel: educationLevel || undefined,
      createdAt: new Date(),
    };

    onJobPostingCreated(jobPosting);
  };

  const addRequiredSkill = () => {
    const trimmed = requiredSkill.trim();
    if (trimmed && !requiredSkills.includes(trimmed)) {
      setRequiredSkills([...requiredSkills, trimmed]);
      setRequiredSkill('');
      setErrors(prev => ({ ...prev, requiredSkills: '' }));
    }
  };

  const removeRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  const addPreferredSkill = () => {
    const trimmed = preferredSkill.trim();
    if (trimmed && !preferredSkills.includes(trimmed)) {
      setPreferredSkills([...preferredSkills, trimmed]);
      setPreferredSkill('');
    }
  };

  const removePreferredSkill = (skill: string) => {
    setPreferredSkills(preferredSkills.filter(s => s !== skill));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Pozisyon / Unvan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors(prev => ({ ...prev, title: '' }));
          }}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
          }`}
          placeholder="Örn: Senior Full Stack Developer"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          İş Deneyimi Açıklaması <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors(prev => ({ ...prev, description: '' }));
          }}
          rows={5}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
          }`}
          placeholder="Adayın iş deneyimi, sorumlulukları ve başarılarını detaylı olarak girin..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Required Skills */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sahip Olunan Yetenekler <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={requiredSkill}
            onChange={(e) => setRequiredSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addRequiredSkill();
              }
            }}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Yetenek ekle (Enter)"
          />
          <button
            type="button"
            onClick={addRequiredSkill}
            className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        {errors.requiredSkills && (
          <p className="mb-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.requiredSkills}
          </p>
        )}
        <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
          {requiredSkills.map((skill, index) => (
            <span
              key={skill}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-red-50 text-red-800 rounded-full text-sm font-medium border border-red-200 hover:border-red-300 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeRequiredSkill(skill)}
                className="hover:text-red-900 transition-colors rounded-full hover:bg-red-200 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Skills */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ek Yetenekler / Tercih Edilen Yetenekler
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={preferredSkill}
            onChange={(e) => setPreferredSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addPreferredSkill();
              }
            }}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Yetenek ekle (Enter)"
          />
          <button
            type="button"
            onClick={addPreferredSkill}
            className="px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
          {preferredSkills.map((skill, index) => (
            <span
              key={skill}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 rounded-full text-sm font-medium border border-purple-200 hover:border-purple-300 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {skill}
              <button
                type="button"
                onClick={() => removePreferredSkill(skill)}
                className="hover:text-purple-900 transition-colors rounded-full hover:bg-purple-200 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience and Education */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gerekli Deneyim
          </label>
          <input
            type="text"
            value={requiredExperience}
            onChange={(e) => setRequiredExperience(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Örn: 3+ yıl"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Eğitim Seviyesi
          </label>
          <input
            type="text"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Örn: Lisans"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex items-center justify-center gap-2">
          <Briefcase className="h-5 w-5" />
          İş Deneyimi Bilgilerini Kaydet
        </span>
      </button>
    </form>
  );
}
