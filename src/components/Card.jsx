function Card() {
   const cardData = [
    {
      title: "Proven Track Record of Successful Project Management and Execution",
      description: "Expert at delivering projects on time and within budget.",
    },
    {
      title: "Expertise in Digital Marketing Strategies That Drive Results",
      description:
        "My campaigns have consistently increased engagement and conversion for clients.",
    },
    {
      title: "Strong Communication Skills That Foster Team Collaboration and Client Relations",
      description:
        "Effective in facilitating teamwork, resolving conflicts, and aligning team goals.",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded shadow-sm text-center p-4 transform transition duration-300 ease-in-out hover:scale-105 hover:z-10"
          >
            <div className="bg-gray-300 h-40 flex items-center justify-center rounded">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h18M9 3v2m6-2v2M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              className="mt-4 font-semibold text-sm"
              dangerouslySetInnerHTML={{ __html: card.title }}
            ></h3>
            <p className="text-xs text-gray-600 mt-2">{card.description}</p>
            <a
              href={card.linkHref}
              className="text-sm text-[#6c2b3d] font-medium mt-2 inline-block hover:underline"
            >
              {card.linkText}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
