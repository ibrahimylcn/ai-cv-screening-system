'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle2, Loader2 } from 'lucide-react';
import { CV } from '@/domain/models/CV';

interface FileUploadProps {
  onFileUploaded: (cv: CV) => void;
}

export function FileUpload({ onFileUploaded }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Dosya yükleme başarısız');
      }

      const result = await response.json();
      onFileUploaded(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dosya yüklenirken hata oluştu');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer 
          transition-all duration-300 overflow-hidden
          ${isDragActive 
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 scale-105 shadow-xl' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isUploading ? 'opacity-75 cursor-not-allowed pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} disabled={isUploading} />
        
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          {isUploading ? (
            <>
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-blue-200"></div>
                <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-blue-600 animate-spin" />
              </div>
              <div className="w-full max-w-xs">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{uploadProgress}% yükleniyor...</p>
              </div>
            </>
          ) : (
            <>
              <div className={`
                p-6 rounded-2xl transition-all duration-300
                ${isDragActive 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 scale-110' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }
              `}>
                <Upload className={`h-10 w-10 ${isDragActive ? 'text-white' : 'text-blue-600'}`} />
              </div>
              {isDragActive ? (
                <div>
                  <p className="text-lg font-bold text-blue-600 mb-1">Dosyayı buraya bırakın</p>
                  <p className="text-sm text-blue-500">Yükleme başlayacak...</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    CV dosyanızı sürükleyip bırakın
                  </p>
                  <p className="text-sm text-gray-500 mb-4">veya</p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Dosya Seç
                  </button>
                  <p className="text-xs text-gray-400 mt-4">
                    PDF, DOCX, DOC veya TXT • Maksimum 10MB
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="animate-slide-in p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Hata</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
