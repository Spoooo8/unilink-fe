import logo from '../../public/image/logo.png'

function Footer() {
  return (
    <>
    
<footer class="bg-black text-white py-10 px-6 md:px-1">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">    
    <div>
      <img src={logo} alt="Logo" className="h-10  w-auto" />
    </div>

    <div>
      <h2 class="font-semibold mb-3">Quick Links</h2>
      <ul class="space-y-1">
        <li><a href="#" class="text-blue-400 hover:underline">Home Page</a></li>
        <li><a href="#" class="text-purple-300 hover:underline">About Us</a></li>
        <li><a href="#" class="text-pink-300 hover:underline">Projects</a></li>
      </ul>
    </div>

  
    <div>
      <h2 class="font-semibold mb-3">Resources</h2>
      <ul class="space-y-1">
        <li><a href="#" class="text-pink-400 hover:underline">Portfolio</a></li>
        <li><a href="#" class="text-purple-200 hover:underline">FAQs</a></li>

        <li><a href="#" class="text-blue-300 hover:underline">Case Studies</a></li>
        <li><a href="#" class="text-blue-400 hover:underline">Portfolio</a></li>
      </ul>
    </div>


    <div>
      <h2 class="font-semibold mb-3">Stay Connected</h2>
      <ul class="space-y-1">
        <li><a href="#" class="text-orange-400 hover:underline">LinkedIn</a></li>
        <li><a href="#" class="text-blue-600 hover:underline">GitHub</a></li>
      </ul>
    </div>

  
    <div>
      <h2 class="font-semibold mb-3">Join</h2>
      <p class="text-sm mb-2">Subscribe to our newsletter</p>
      <form class="flex flex-col sm:flex-row gap-2">
        <input type="email" placeholder="Your Email Here" class="px-3 py-2 rounded-md border border-white bg-black text-white placeholder-white text-sm w-full" />
        <button type="submit" class="px-4 py-2 bg-white text-black rounded-md text-sm hover:bg-gray-200">Join</button>
      </form>
      {/* <p class="mt-2 text-xs text-gray-400">
        By joining, you consent to our <span class="underline">Privacy Policy</span> and agree to <span class="underline">subscription</span>.
      </p> */}
    </div>
  </div>

  
  <hr class="my-8 border-gray-600" />

  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
    <p>© 2025 Spoorthi S. All rights reserved.</p>
    {/* <div class="flex gap-4">
      <a href="#" class="hover:text-white">Privacy Policy</a>
      <a href="#" class="hover:text-white">Terms of Service</a>
      <a href="#" class="hover:text-white">Cookie Settings</a>
    </div> */}
  </div>
</footer>
    </>
  );
}

export default Footer;
