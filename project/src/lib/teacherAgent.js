import { ChatOpenAI } from '@langchain/openai';
import { RunnableSequence } from '@langchain/core/runnables';

export class TeacherAgent {
  constructor(apiKey) {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4',
      temperature: 0.7,
      openAIApiKey: apiKey
    });
  }

  async processMessage(message) {
    const response = await this.model.invoke([{
      role: 'user',
      content: message
    }]);

    return response.content;
  }
}