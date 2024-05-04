import { DateInterval } from '../common';

export interface Company {
  name: string;
  picture: string;
  location: string;
  description: string;
}

export interface Job {
  key: string;
  role: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  banner?: string;
  company: Company;
  interval: DateInterval;
  description: string;
}

export interface JobWithBlurredData extends Job {
  blurredSrc: string;
  alt: string;
}
