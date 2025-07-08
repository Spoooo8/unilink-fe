import React, { forwardRef } from 'react';
import collaborate from '../../public/image/collaborate_new.png';

const PinkSection = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="bg-[#f5e8ea] min-h-[600px] py-16 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-18"
    >
      {/* Left Content */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
          Discover Opportunities: From <br />
          Campus Ideas to Real-World <br />
          Collaboration
        </h2>
        <p className="text-base leading-relaxed">
          At <span className="text-blue-600 font-semibold">UniLink</span>, we bring together
          students with a passion for <span className="text-purple-600 font-semibold">innovation</span>,
          <span className="text-pink-600 font-semibold"> teamwork</span>, and real-world impact.
          Whether you're launching a project or looking to join one, UniLink helps you
          <span className="text-green-700 font-semibold"> connect, contribute</span>, and grow with
          others across campuses — all while building your
          <span className="text-yellow-500 font-semibold"> skills and portfolio</span>.
        </p>
      </div>

      {/* Right Placeholder/Icon */}
      <div className="flex-1 max-w-md w-full bg-[#dbb4bc] rounded-md flex items-center justify-center h-120">
        <div className="text-white opacity-90">
          <img src={collaborate} className="rounded-l" />
        </div>
      </div>
    </div>
  );
});

export default PinkSection;
