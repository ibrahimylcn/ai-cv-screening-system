/**
 * CV dosyası yükleme API endpoint
 * Infrastructure katmanı - file parsing ve upload işlemleri
 */
import { NextRequest, NextResponse } from 'next/server';
import { FileParserFactory } from '@/infrastructure/parsers/FileParser';
import { CV } from '@/domain/models/CV';

// Next.js 14 App Router'da body parser otomatik çalışır, config gerekmez

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Dosya boyutu 10MB\'dan büyük olamaz' },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Desteklenmeyen dosya formatı. PDF, DOCX, DOC veya TXT kullanın' },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a çevir
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Uygun parser'ı seç ve parse et
    const parser = FileParserFactory.create(file.type);
    const content = await parser.parse(buffer, file.type);

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Dosya içeriği okunamadı veya boş' },
        { status: 400 }
      );
    }

    // CV domain model oluştur
    const cv: CV = {
      id: `cv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      content: content,
      uploadedAt: new Date(),
      fileSize: file.size,
      fileType: file.type,
    };

    return NextResponse.json(cv);
  } catch (error) {
    console.error('CV upload hatası:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Dosya yükleme sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

