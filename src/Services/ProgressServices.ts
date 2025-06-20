import _ApiServices from "./apiServices";

export interface progressSave {
  lessonId: string | undefined;
  courseId: string | undefined;
  totalMarks: number | undefined;
  obtainedMarks: number | undefined;
  lessontitle: string | undefined;
  language: string | undefined;
}

class ProgressServices {
  constructor() {}

  async createProgress(data: progressSave) {
    const response = await new _ApiServices(
      "/progress",
      data
    )._handlePostRequest();
    return response;
  }
}

export default new ProgressServices();
