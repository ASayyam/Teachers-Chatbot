import { ChatOpenAI } from '@langchain/openai';
import { createStandardTools } from '../tools/standardTools.js';
import { createCanvasTools } from '../tools/canvasTools.js';
import { RunnableSequence } from '@langchain/core/runnables';
import { formatMessage } from '../utils/messageFormatter.js';

export class TeacherAgent {
  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4',
      temperature: 0.7
    });
    
    this.tools = [
      ...createStandardTools(),
      ...createCanvasTools()
    ];
  }

  async processMessage(message, context) {
    const chain = RunnableSequence.from([
      formatMessage,
      this.model,
      this.handleResponse.bind(this)
    ]);

    return await chain.invoke({
      message,
      context,
      tools: this.tools
    });
  }

  async handleResponse(response) {
    // Process the model's response and execute any necessary tools
    const { text, toolCalls } = response;
    
    if (toolCalls) {
      const results = await Promise.all(
        toolCalls.map(call => this.executeToolCall(call))
      );
      return this.formatResponse(text, results);
    }
    
    return text;
  }

  async executeToolCall(toolCall) {
    const tool = this.tools.find(t => t.name === toolCall.name);
    if (!tool) {
      throw new Error(`Tool ${toolCall.name} not found`);
    }
    return await tool.call(toolCall.arguments);
  }

  formatResponse(text, toolResults) {
    return {
      message: text,
      actions: toolResults
    };
  }
}