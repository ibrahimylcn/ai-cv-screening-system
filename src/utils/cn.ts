/**
 * className birleştirme utility fonksiyonu
 * clsx ve tailwind-merge kullanarak class'ları birleştirir
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

