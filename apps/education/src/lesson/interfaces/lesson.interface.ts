export interface ILessonRepository<T> {
  create(data: T): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  findById(id: string): Promise<T>
  index(id: string): Promise<T[]>
  findByTitle(title: string): Promise<T>
  remove(id: string): Promise<T>
}