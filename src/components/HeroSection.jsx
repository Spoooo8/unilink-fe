import { useNavigate } from 'react-router-dom';
import hero from '../../public/image/hero.png';

function HeroSection({ scrollToPinkSection }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-gray-300 flex justify-center items-center h-[400px] mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between md:px-20 py-12 bg-white">
          {/* Text on Left */}
          <div className="md:w-1/3 md:pr-12 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Build. Share. Evolve.</h2>
            <p className="text-lg text-gray-600">Join a platform where innovation meets opportunity.</p>
          </div>

          {/* Image on Right */}
          <div className="md:w-2/3 flex justify-end mt-8 md:mt-0 ">
            <img src={hero} alt="Hero" className="max-w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 px-10 py-12 gap-8 bg-white">
        <div>
          <h1 className="text-4xl font-semibold leading-snug">
            Empowering Your Future<br />with Collaboration
          </h1>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-sm text-gray-700 mb-6 leading-relaxed">
            Connect with minds <span className="text-[#6c2b3d] font-medium">across campuses</span>, fostering real-time <span className="text-[#6c2b3d] font-medium">collaboration</span> and <span className="text-[#6c2b3d] font-medium">innovation</span>. Join a network where ideas grow, skills evolve, and futures are <span className="text-[#6c2b3d] font-medium">built—together</span>.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-[#6c2b3d] text-white px-4 py-2 rounded text-sm shadow hover:opacity-90"
              onClick={scrollToPinkSection}
            >
              Learn More
            </button>
            <button
              className="border border-gray-600 text-sm px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
