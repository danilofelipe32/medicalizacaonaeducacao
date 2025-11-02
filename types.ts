export interface Encontro {
  date: string;
  title: string;
  type: 'Presencial' | 'Assíncrono';
  duration: string;
  details?: string[];
  keyActivity?: string;
  guidingQuestion?: string;
  objective?: string;
  referenceText?: string;
  extraInfo?: string;
  image: string;
}