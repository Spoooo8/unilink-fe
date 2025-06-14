import logo from '../../public/image/logo.png';
import Button from './Button';

function Nav() {
  return (
    <>
      <nav className="flex justify-between items-center px-6 py-2 text-gray-700  bg-gray-50  shadow">
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-10  w-auto" />
        </div>

        <div className="flex space-x-2">
          <Button
            px="px-4"
            py="py-1"
            className="border border-gray-500 text-gray-800 hover:bg-gray-100"
          >
            LogIn
          </Button>
          <Button
            px="px-5"
            py="py-2"
            className="bg-[#6c2b3d] text-white hover:bg-[#581d2f]"
          >
            SignUp
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
