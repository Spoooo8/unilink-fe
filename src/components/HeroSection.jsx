import logo from '../../public/image/logo.png';

function HeroSection() {
  return (
    <>
     <section class="bg-gray-300 flex justify-center items-center h-[500px]">
      <div class="w-[200px] h-[150px] bg-gray-400 rounded-md flex items-center justify-center">
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 5h18M9 3v2m6-2v2M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/>
        </svg>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 px-10 py-12 gap-8 bg-white">
     
      <div>
        <h1 class="text-4xl font-semibold leading-snug">
          Empowering Your Future<br />with Collaboration
        </h1>
      </div>
     
      <div class="flex flex-col justify-between">
           <p class="text-sm text-gray-700 mb-6 leading-relaxed">
            Connect with minds <span class="text-[#6c2b3d] font-medium">across campuses</span>, fostering real-time  <span class="text-[#6c2b3d] font-medium">collaboration</span> and  <span class="text-[#6c2b3d] font-medium">innovation</span>. Join a network where ideas grow, skills evolve, and futures are  <span class="text-[#6c2b3d] font-medium">built—together</span>.
        </p>
        <div class="flex space-x-4">
          <button class="bg-[#6c2b3d] text-white px-4 py-2 rounded text-sm shadow hover:opacity-90">Learn More</button>
          <button class="border border-gray-600 text-sm px-4 py-2 rounded hover:bg-gray-100">Signup</button>
        </div>
      </div>
    </section>

    </>
  );
}

export default HeroSection;
   
   
   
   