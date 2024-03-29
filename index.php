<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lets Party</title>
  <link rel='shortcut icon' href='https://easycss.github.io/favicon/favicon.png' type='image/x-icon' />
  <script src="./tailwindcss.min.js"></script>
  <link rel='stylesheet' href='style.css' />
</head>
<body>

  <div id="hero">
   <h1 id="headline" class="brute px-1 pt-2 pb-2.5 mb-4 md:mb-2 font-bold leading-tight text-4xl bg-yellow-400">Do you like to PARTY?</h1>
    
    <div class="my-4">
     
      <div id="contrast" class="flex items-center mt-8 mb-6 w-fit mx-auto select-none">
        <input class="w-4 h-4" type="checkbox" name="animate" id="animate" />
        <label for="animate" class="ml-2">Boost Contrast</label>
      </div>

      <button id="openModalBtn" class="btn tracking-widest sm:mt-1 hover:bg-[#f4a1d6]" id="randomize">
       <span class="bg-[#f4a1d6] text-white">JOIN US</span>
      </button>

    </div>

    <p id="strapline" class="max-w-[600px]">
      For years the world has watched and wondered. Now technological advances have arrived at artificial intelligence. The future is now.
    </p>
  </div>

    <!-- modal overlay-->
    <div id="modalOverlay" class="fixed inset-0 bg-white opacity-20 hidden"></div>
    <!-- modal content -->
    <div id="subscriptionModal" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg hidden">
        
        <!-- email subscription -->
        <label for="email" class="block mb-2 text-gray-800">What's your Email?</label>
        <input type="email" id="senderEmail" name="email" class="w-full p-2 border rounded-md" required>

        <p id="senderEmailError" class="text-sm text-red-600 mt-2"></p>

        <button id="sendEmailBtn" class="btn mt-5 text-black hover:bg-green-300"><span class="bg-green-300">LETS PARTY!</span></button>

        <p class="text-slate-300 text-sm mt-1 -mb-2">Your email address will be stored securely and you can unsubscribe anytime.</p>

        <!-- modal close button -->
        <button id="closeModalBtn" class="absolute top-0 right-0 m-4 text-gray-600">X</button>
    </div>
  

  <script type="module" src="app.js"></script>
</body>
</html>