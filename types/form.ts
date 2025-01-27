// types/form.ts
export interface FormData {
    ageRange: string;
    province: string;
    occupation: string;
    education: string;
    hasExperiencedScam: 'yes' | 'no';
    scamTypes: string[];
    socialMediaUsage: string;
    platforms: string[];
  }
  
  export interface Option {
    id: string;
    label: string;
  }