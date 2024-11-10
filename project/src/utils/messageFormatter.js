export function formatMessage({ message, context }) {
  return {
    role: 'user',
    content: `
Context: ${JSON.stringify(context)}
User Message: ${message}

Please help with this teaching-related request. You can use the following tools:
- get_assignments: Get course assignments
- get_student_submissions: Get assignment submissions
- grade_submission: Grade a submission
- search_knowledge_base: Search teaching resources
- generate_lesson_plan: Create lesson plans

Respond in a helpful, teacher-focused way.
    `.trim()
  };
}