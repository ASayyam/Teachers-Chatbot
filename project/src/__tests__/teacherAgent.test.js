import { expect, test, vi } from 'vitest';
import { TeacherAgent } from '../agents/teacherAgent';

test('TeacherAgent processes messages correctly', async () => {
  const agent = new TeacherAgent();
  const message = 'Show me all assignments for course 101';
  const context = { courseId: '101' };

  const response = await agent.processMessage(message, context);
  expect(response).toBeDefined();
});

test('TeacherAgent handles tool calls', async () => {
  const agent = new TeacherAgent();
  const toolCall = {
    name: 'get_assignments',
    arguments: { courseId: '101' }
  };

  const result = await agent.executeToolCall(toolCall);
  expect(result).toBeDefined();
});