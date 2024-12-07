import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

export function formatDateArabic(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy 'الساعة' h:mm a", { locale: arSA });
}

