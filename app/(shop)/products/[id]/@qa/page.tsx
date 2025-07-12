interface QaSlotProps {
  params: Promise<{ id: string }>; // ✅ Updated to Promise
}

export default async function QaSlot({ params }: QaSlotProps) {
  const { id } = await params; // ✅ Added await

  // Mock Q&A data
  const qaData = [
    {
      id: '1',
      question: `Is this product ${id} compatible with my setup?`,
      answer:
        'Yes, this product is designed to be compatible with most standard setups.',
      asker: 'John D.',
      answerer: 'Customer Service',
      askDate: '2024-03-15',
      answerDate: '2024-03-16',
      helpful: 12,
    },
    {
      id: '2',
      question: 'What is the warranty period?',
      answer:
        'This product comes with a 1-year manufacturer warranty covering defects.',
      asker: 'Sarah M.',
      answerer: 'Manufacturer',
      askDate: '2024-03-10',
      answerDate: '2024-03-11',
      helpful: 8,
    },
  ];

  return (
    <div className="py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Questions & Answers
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ask a Question
          </button>
        </div>

        <div className="space-y-4">
          {qaData.map(qa => (
            <div key={qa.id} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1">
                  Q: {qa.question}
                </h4>
                <p className="text-sm text-gray-500">
                  Asked by {qa.asker} on {qa.askDate}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-3 mb-3">
                <p className="text-gray-800 mb-1">A: {qa.answer}</p>
                <p className="text-sm text-gray-500">
                  Answered by {qa.answerer} on {qa.answerDate}
                </p>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <span>{qa.helpful} people found this helpful</span>
                <button className="ml-4 text-blue-600 hover:text-blue-800">
                  Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
