export type CreateLesson = {
  title: string;
  description: string;
  media_path: string;
}

export type UpdateLesson = {
  title?: string;
  description?: string;
  media_path?: string;
}