# 📄 CV Analiz ve Ön Eleme Paneli
<img width="1903" height="929" alt="image" src="https://github.com/user-attachments/assets/fd0ed58f-6bfa-4ae2-ae31-4641ec13c183" />

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google)

**İnsan Kaynakları için AI destekli CV analiz sistemi**

[Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Kullanım](#-kullanım) • [Mimari](#-mimari) • [Katkıda Bulunma](#-katkıda-bulunma)

</div>

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Mimari](#-mimari)
- [API Referansı](#-api-referansı)
- [Güvenlik](#-güvenlik)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## 🎯 Hakkında

CV Analiz ve Ön Eleme Paneli, İnsan Kaynakları uzmanları için geliştirilmiş modern bir CV analiz sistemidir. Google Gemini AI teknolojisini kullanarak CV'leri otomatik olarak analiz eder, yetenekleri çıkarır, deneyim seviyesini belirler ve detaylı raporlar üretir.

### Neden Bu Proje?

- ⚡ **Hızlı Analiz**: CV'ler otomatik olarak analiz edilir, manuel inceleme süresi azalır
- 🤖 **AI Destekli**: Google Gemini AI ile akıllı ve doğru analiz
- 📊 **Detaylı Raporlar**: Yetenekler, deneyim seviyesi ve eğitim bilgileri otomatik çıkarılır
- 🎨 **Modern UI**: Kullanıcı dostu ve responsive arayüz
- 🏗️ **Clean Architecture**: Bakımı kolay, ölçeklenebilir kod yapısı

## ✨ Özellikler

### 🔍 CV Analiz Özellikleri

- ✅ **Çoklu Format Desteği**: PDF, DOCX, DOC ve TXT formatlarında CV yükleme
- ✅ **Otomatik Analiz**: CV yüklendiğinde otomatik olarak analiz başlar
- ✅ **Yetenek Çıkarma**: CV'den otomatik yetenek çıkarma ve listeleme
- ✅ **Deneyim Seviyesi**: Junior/Mid/Senior/Expert seviye belirleme
- ✅ **Eğitim Analizi**: Eğitim bilgilerini otomatik çıkarma
- ✅ **Detaylı Rapor**: AI tarafından üretilen 200-300 kelimelik analiz raporu

### 🎨 Kullanıcı Arayüzü

- ✅ **Modern Tasarım**: Gradient arka planlar ve animasyonlar
- ✅ **Responsive**: Mobil, tablet ve masaüstü uyumlu
- ✅ **Drag & Drop**: Dosya sürükle-bırak desteği
- ✅ **Gerçek Zamanlı Geri Bildirim**: Analiz durumu ve sonuçlar anında gösterilir

### 🏗️ Teknik Özellikler

- ✅ **Clean Architecture**: Domain, Application, Infrastructure ve Presentation katmanları
- ✅ **TypeScript**: Tip güvenliği ve daha iyi geliştirici deneyimi
- ✅ **Error Handling**: Kapsamlı hata yönetimi
- ✅ **Input Validation**: Güvenli dosya yükleme ve validasyon

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **UI Components**: [React](https://react.dev/) 18.3, [Lucide Icons](https://lucide.dev/)

### Backend & AI
- **AI**: [Google Gemini AI](https://ai.google.dev/) (Gemini 2.5 Flash)
- **File Parsing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse), [mammoth](https://www.npmjs.com/package/mammoth)
- **File Upload**: [react-dropzone](https://react-dropzone.js.org/)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Google Gemini API Key ([Almak için tıklayın](https://ai.google.dev/))

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/cv-analysis-panel.git
cd cv-analysis-panel
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Environment Variables Ayarlayın

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
GOOGLE_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash  # Opsiyonel, varsayılan: gemini-2.5-flash
```

**Google Gemini API Key Nasıl Alınır?**

1. [Google AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. Oluşturulan API key'i kopyalayın ve `.env.local` dosyasına ekleyin

### Adım 4: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresine gidin.

### Desteklenen Gemini Modelleri

| Model | Açıklama | Input Token | Output Token |
|-------|----------|-------------|--------------|
| `gemini-2.5-flash` (varsayılan) | Hızlı ve verimli | 1M | 65K |
| `gemini-2.5-pro` | Daha güçlü analiz | 1M | 65K |
| `gemini-2.0-flash` | Önceki versiyon | 1M | 8K |
| `gemini-2.0-flash-001` | Stable 2.0 Flash | 1M | 8K |
| `gemini-2.5-flash-lite` | Daha hafif versiyon | 1M | 65K |

## 📖 Kullanım

### Temel Kullanım

1. **CV Yükleme**
   - Ana sayfada CV dosyanızı sürükleyip bırakın veya "Dosya Seç" butonuna tıklayın
   - Desteklenen formatlar: PDF, DOCX, DOC, TXT
   - Maksimum dosya boyutu: 10MB

2. **Otomatik Analiz**
   - CV yüklendiğinde otomatik olarak AI destekli analiz başlar
   - Analiz sırasında "CV analiz ediliyor..." mesajı görüntülenir

3. **Sonuçları İnceleme**
   - Analiz tamamlandığında sonuçlar otomatik olarak görüntülenir
   - Aşağıdaki bilgiler gösterilir:
     - **Yetenekler**: CV'den çıkarılan tüm yetenekler
     - **Deneyim Seviyesi**: Junior/Mid/Senior/Expert
     - **Eğitim Bilgileri**: Eğitim geçmişi
     - **Detaylı Rapor**: AI tarafından üretilen kapsamlı analiz raporu

### Örnek Kullanım Senaryosu

```
1. HR uzmanı bir CV yükler (PDF formatında)
2. Sistem otomatik olarak CV'yi analiz eder
3. Sonuçlar:
   - Yetenekler: React, TypeScript, Node.js, MongoDB
   - Deneyim Seviyesi: Senior
   - Eğitim: Bilgisayar Mühendisliği Lisans
   - Rapor: "Aday 5+ yıl deneyime sahip, modern web teknolojilerinde uzman..."
```

## 🏗️ Mimari

Proje Clean Architecture prensiplerine göre yapılandırılmıştır:

```
src/
├── domain/              # Domain katmanı
│   ├── models/         # Domain entities ve value objects
│   │   ├── CV.ts
│   │   ├── AnalysisResult.ts
│   │   └── JobPosting.ts
│   └── services/       # Domain service interfaces
│       └── CVAnalysisService.ts
│
├── application/         # Application katmanı
│   └── services/       # Use case implementasyonları
│       └── CVAnalysisServiceImpl.ts
│
├── infrastructure/      # Infrastructure katmanı
│   ├── ai/            # External AI services
│   │   └── GeminiAIClient.ts
│   └── parsers/       # File parsers
│       └── FileParser.ts
│
└── presentation/        # Presentation katmanı
    ├── components/     # React components
    │   ├── FileUpload.tsx
    │   ├── AnalysisResults.tsx
    │   └── JobPostingForm.tsx
    ├── app/           # Next.js pages ve API routes
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── api/
    │       ├── analyze/route.ts
    │       └── upload/route.ts
    └── utils/         # Utility functions
        └── cn.ts
```

### Katman Sorumlulukları

- **Domain**: İş mantığı, entities ve domain kuralları
- **Application**: Use case'ler ve business logic koordinasyonu
- **Infrastructure**: External services (AI, file parsing) implementasyonları
- **Presentation**: UI components ve API endpoints

## 🔌 API Referansı

### POST `/api/upload`

CV dosyasını yükler ve içeriğini çıkarır.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (PDF, DOCX, DOC, TXT)

**Response:**
```json
{
  "id": "cv-1234567890",
  "fileName": "example.pdf",
  "content": "CV içeriği...",
  "fileSize": 102400,
  "fileType": "application/pdf",
  "uploadedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/analyze`

CV içeriğini analiz eder.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `cvId`: string
  - `cvContent`: string

**Response:**
```json
{
  "cvId": "cv-1234567890",
  "jobPostingId": "cv-analysis",
  "overallScore": 75,
  "skillMatchScore": 100,
  "experienceScore": 85,
  "educationScore": 100,
  "missingSkills": [],
  "matchingSkills": ["React", "TypeScript", "Node.js"],
  "report": "Detaylı analiz raporu...",
  "analyzedAt": "2024-01-01T00:00:00.000Z",
  "details": {
    "skillAnalysis": {...},
    "experienceAnalysis": {...},
    "educationAnalysis": {...}
  }
}
```

## 🔒 Güvenlik

### Güvenlik Önlemleri

- ✅ **API Key Yönetimi**: API key'ler environment variables ile yönetilir, kod içinde hardcode edilmez
- ✅ **Dosya Validasyonu**: Dosya tipi ve boyut kontrolü yapılır
- ✅ **Input Validation**: Tüm kullanıcı girdileri validate edilir
- ✅ **Error Handling**: Hassas bilgiler hata mesajlarında gösterilmez
- ✅ **File Size Limit**: Maksimum 10MB dosya boyutu sınırı

### Güvenlik İpuçları

1. **API Key Güvenliği**
   - `.env.local` dosyasını asla commit etmeyin
   - Production'da environment variables kullanın
   - API key'leri düzenli olarak rotate edin

2. **Dosya Yükleme**
   - Sadece izin verilen dosya tiplerini kabul edin
   - Dosya boyut limitlerini uygulayın
   - Upload edilen dosyaları güvenli bir şekilde saklayın

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) formatını kullanıyoruz:

- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon değişiklikleri
- `style`: Kod formatı (kod değişikliği yok)
- `refactor`: Kod refactoring
- `test`: Test ekleme veya düzeltme
- `chore`: Build process veya yardımcı araçlar

## 📝 Lisans

Bu proje özel kullanım içindir. Tüm hakları saklıdır.

## 👤 Yazar

**İbrahim Yalçın**

## 🙏 Teşekkürler

- [Google Gemini AI](https://ai.google.dev/) - AI analiz teknolojisi için
- [Next.js](https://nextjs.org/) - Harika framework için
- [Tailwind CSS](https://tailwindcss.com/) - Modern styling için
- Tüm açık kaynak kütüphane geliştiricilerine

---

<div align="center">

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

Made with ❤️ using Next.js and Google Gemini AI

</div>
