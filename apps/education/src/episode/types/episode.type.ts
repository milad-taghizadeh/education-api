export type CreateEpisode = {
  title: string;
  description: string;
  media_path?: string[];
  courseId: string;
}

export type UpdateEpisode = {
  title?: string;
  description?: string;
  media_path?: string[];
  courseId?: string;
}