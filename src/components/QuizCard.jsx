import book from '../../public/image/book.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function QuizCard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#f5e8ea] min-h-[40px] py-16 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
            Begin Your Skill Growth Journey <br />
            Take Skill Assessment <br />
          </h2>
          <Button
            px="px-5"
            py="py-2"
            className="bg-[#6c2b3d] text-white hover:bg-[#581d2f]"
             onClick={() => navigate('/quiz')}
          >
            Start
          </Button>

        </div>

        {/* Right Placeholder/Icon */}
        <div className="flex-1 max-w-md w-full bg-[#dbb4bc] rounded-md flex items-center justify-center h-72">
          <div className="text-white">
            <img src={book} className="rounded-xl" />

          </div>
        </div>
      </div>

      <section class="grid grid-cols-1 md:grid-cols-2 px-10 py-12 gap-8 bg-white">

        <div>
          <h1 class="text-4xl font-semibold leading-snug">
            Empowering Your Future<br />with Collaboration
          </h1>
        </div>

        <div class="flex flex-col justify-between">

          <div class="flex space-x-4 mt-7">
            <input
              type="text"
              placeholder="Search for technologies like Java, Ruby..."
              class="w-full px-4 py-2 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#6c2b3d] placeholder-gray-400"
            />
            <Button
              px="px-5"
              py="py-2"
              className="bg-[#6c2b3d] text-white hover:bg-[#581d2f]"
            >
              Search
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default QuizCard;
