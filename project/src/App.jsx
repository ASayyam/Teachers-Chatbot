import { useState } from 'react';
import { TeacherAgent } from './lib/teacherAgent';
import { CanvasClient } from './lib/canvasClient';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const agent = new TeacherAgent(import.meta.env.VITE_OPENAI_API_KEY);
  const canvas = new CanvasClient(
    import.meta.env.VITE_CANVAS_TOKEN,
    import.meta.env.VITE_CANVAS_URL
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await agent.processMessage(message);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-8">Teacher's Assistant</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Ask me anything..."
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : 'Send'}
                  </button>
                </form>
                {response && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="whitespace-pre-wrap">{response}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}