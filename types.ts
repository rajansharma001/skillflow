export interface InputType {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  isFree: boolean;
  price: string;
  level: string;
  language: string;
  duration: string;
  category_id: string;
  authorId: string;
  previewVideoUrl: string;
  category: string;
  rating: string;
  lesson: string;
  user: string;
}

export interface CatType {
  id: string;
  name: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  videoUrl: string;
  videoLength: string;
  courseId: string;
  isFree: false;
  summary: string;
  resources: string;
}
