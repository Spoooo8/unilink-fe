function ChildSideBar() {
  return (
    <div className="flex-1 flex bg-white">
      {/* Exam Question Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto h-full">
        <h2 className="text-sm font-semibold mb-3 text-gray-800">
          Exam Questions
        </h2>
        <ul className="space-y-2 text-sm">
          {[
            '1. Based Reason',
            '2. Present Tense',
            '3. Sentence',
            '4. Question',
            '5. Synonyms',
            '6. Description',
            '7. Double Vowels',
            '8. Words Space',
            '9. Expressions',
            '10. Verbs',
            '10. Verbs',
            '10. Verbs',
            '10. Verbs',
             '10. Verbs',
              '10. Verbs',
               '10. Verbs',
                '10. Verbs',
                 '10. Verbs',
                  '10. Verbs',
          ].map((q, i) => (
            <li
              key={i}
              className="border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-100 transition"
            >
              {q}
            </li>
          ))}
        </ul>
        
      </div>

      {/* Right Side Content */}
      <div className="flex-1 bg-white p-6 overflow-y-auto h-full">
        {/* Placeholder for quiz questions */}
        <p className="text-gray-500">Quiz content goes here...</p>
      </div>
    </div>
  );
}

export default ChildSideBar;
