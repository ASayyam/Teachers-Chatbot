export function createCanvasTools() {
  return [
    {
      name: 'get_assignments',
      description: 'Get all assignments for a course',
      call: async ({ courseId }) => {
        const assignments = await canvas.getAssignments(courseId);
        return assignments;
      }
    },
    {
      name: 'get_student_submissions',
      description: 'Get submissions for an assignment',
      call: async ({ courseId, assignmentId }) => {
        const submissions = await canvas.getSubmissions(courseId, assignmentId);
        return submissions;
      }
    },
    {
      name: 'grade_submission',
      description: 'Grade a student submission',
      call: async ({ courseId, assignmentId, studentId, grade, comment }) => {
        await canvas.gradeSubmission(courseId, assignmentId, studentId, {
          grade,
          comment
        });
        return { success: true };
      }
    }
  ];
}