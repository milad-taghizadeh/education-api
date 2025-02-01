export interface ICourseRepository<T> {
  ownCourse(userId : string, data: T): Promise<T>
  findOwnedCourses(userId : string): Promise<T>
  findCourse(userId : string): Promise<T>
}