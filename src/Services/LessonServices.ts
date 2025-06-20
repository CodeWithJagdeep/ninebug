import _ApiServices from "./apiServices";

class LessonServices {
  constructor() {}

  async getLesson(slug: string) {
    const response = await new _ApiServices(
      `/lessons/${slug}`,
      {}
    )._handleGetRequest();
    console.log(response);
    return response;
  }
}

export default new LessonServices();
