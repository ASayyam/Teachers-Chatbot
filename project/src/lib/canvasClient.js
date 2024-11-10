export class CanvasClient {
  constructor(token, baseUrl) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async getAssignments(courseId) {
    const response = await fetch(`${this.baseUrl}/api/v1/courses/${courseId}/assignments`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    return response.json();
  }

  async getSubmissions(courseId, assignmentId) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions`,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
    return response.json();
  }
}