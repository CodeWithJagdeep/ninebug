import _ApiServices from "./apiServices";

class CourseServices {
  constructor() {}
  async getCourse() {
    const response = await new _ApiServices("/section", {})._handleGetRequest();
    console.log(response.data);
    return response;
  }

  async getCourseById(courseid: string) {
    const response = await new _ApiServices(
      `/course/${courseid}`,
      {}
    )._handleGetRequest();
    console.log(response);
    return response;
  }

  async purchaseCourse(courseid: string) {
    const response = await new _ApiServices(
      `/course/${courseid}/purchase`,
      {}
    )._handleGetRequest();
    return response;
  }
}

export default new CourseServices();
