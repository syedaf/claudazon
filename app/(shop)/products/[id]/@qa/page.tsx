interface QASlotProps {
  params: { id: string };
}

interface Question {
  id: string;
  question: string;
  answer?: string;
  author: string;
  date: string;
  helpful: number;
}

export default function QASlot({ params }: QASlotProps) {
  // Mock Q&A data
  const questions: Question[] = [
    {
      id: '1',
      question: 'Is this product compatible with other accessories?',
      answer:
        'Yes, this product is designed to work with most standard accessories in the market.',
      author: 'ProductExpert',
      date: 'June 15, 2025',
      helpful: 12,
    },
    {
      id: '2',
      question: 'What is the warranty period?',
      answer:
        'This product comes with a 1-year manufacturer warranty covering defects in materials and workmanship.',
      author: 'CustomerService',
      date: 'June 10, 2025',
      helpful: 8,
    },
    {
      id: '3',
      question: 'Can this be used outdoors?',
      author: 'OutdoorFan',
      date: 'June 8, 2025',
      helpful: 3,
    },
  ];

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Customer Questions & Answers
        </h3>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Ask a Question
        </button>
      </div>

      <div className="space-y-6">
        {questions.map(qa => (
          <div key={qa.id} className="border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Q: {qa.question}
              </h4>
              <div className="text-sm text-gray-500">
                Asked by {qa.author} on {qa.date}
              </div>
            </div>

            {qa.answer ? (
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <p className="text-gray-900 mb-2">
                  <span className="font-medium">A:</span> {qa.answer}
                </p>
                <div className="text-sm text-gray-600">
                  Answered by {qa.author}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-gray-600 italic">
                  This question hasn't been answered yet.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <button className="hover:text-gray-700">
                👍 Helpful ({qa.helpful})
              </button>
              <button className="hover:text-gray-700">Report</button>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Form */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Have a question?</h4>
        <div className="space-y-4">
          <textarea
            placeholder="Type your question here..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9900] focus:border-transparent"
          />
          <button className="px-6 py-2 bg-[#ff9900] text-black font-medium rounded-lg hover:bg-[#e88900] transition-colors">
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}
