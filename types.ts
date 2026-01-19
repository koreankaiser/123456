
export interface Member {
  id: string;
  name: string;
  age: number;
  nationality: string;
  location: string;
  locationKo: string;
  intro: string;
  introKo: string;
  imageUrl: string;
  tags: string[];
}

export interface ApplicationFormData {
  name: string;
  age: string;
  nationality: string;
  location: string;
  intro: string;
  email: string;
  phone: string;
  instagram: string;
  image: File | null;
}
