function RectangleCard() {
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
    <div className="space-y-4 px-4 md:px-10 py-10">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <h3
            className="font-semibold text-lg mb-2 text-gray-800"
          >   { card.title }</h3>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RectangleCard;
