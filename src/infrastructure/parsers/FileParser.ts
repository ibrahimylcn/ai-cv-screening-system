/**
 * Dosya parser interface
 * Farklı dosya formatlarını parse etmek için abstraction
 */
export interface IFileParser {
  parse(buffer: Buffer, mimeType: string): Promise<string>;
}

/**
 * PDF parser implementasyonu
 */
import pdfParse from 'pdf-parse';

export class PDFParser implements IFileParser {
  async parse(buffer: Buffer, mimeType: string): Promise<string> {
    if (!mimeType.includes('pdf')) {
      throw new Error('Dosya formatı PDF değil');
    }

    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      console.error('PDF parse hatası:', error);
      throw new Error('PDF dosyası okunamadı');
    }
  }
}

/**
 * DOCX parser implementasyonu
 */
import mammoth from 'mammoth';

export class DOCXParser implements IFileParser {
  async parse(buffer: Buffer, mimeType: string): Promise<string> {
    if (!mimeType.includes('wordprocessingml') && !mimeType.includes('msword')) {
      throw new Error('Dosya formatı DOCX değil');
    }

    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      console.error('DOCX parse hatası:', error);
      throw new Error('DOCX dosyası okunamadı');
    }
  }
}

/**
 * Text parser implementasyonu
 */
export class TextParser implements IFileParser {
  async parse(buffer: Buffer, mimeType: string): Promise<string> {
    return buffer.toString('utf-8');
  }
}

/**
 * File parser factory
 * Dosya tipine göre uygun parser'ı döndürür
 */
export class FileParserFactory {
  static create(mimeType: string): IFileParser {
    if (mimeType.includes('pdf')) {
      return new PDFParser();
    } else if (mimeType.includes('wordprocessingml') || mimeType.includes('msword')) {
      return new DOCXParser();
    } else if (mimeType.includes('text') || mimeType.includes('plain')) {
      return new TextParser();
    } else {
      throw new Error(`Desteklenmeyen dosya formatı: ${mimeType}`);
    }
  }
}

