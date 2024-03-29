import shapes from './shapes.js';

let shapeList = shapes;

let numberOfShapes = 100;
let mode = 2;
let rotation = true;


function generateBackground(
  element = document.body,
  colorList = colorList,
  numberOfShapes = 0,
  shapesMode = 0,
  rotation = false,
) {
  document.querySelectorAll(".shapes-container").forEach((element) => {
    element.remove();
  });

  let newElement = document.createElement("div");

  let rotationsList = [
    "rotate(0deg)",
    "rotate(45deg)",
    "rotate(75deg)",
    "rotate(90deg)",
    "rotate(120deg)",
    "rotate(150deg)",
    "rotate(180deg)",
    "rotate(230deg)",
    "rotate(270deg)",
  ];
 
  newElement.style.width = element.clientWidth + "px";
  newElement.style.height = element.clientHeight + "px";

  newElement.style.position = "absolute";
  newElement.style.zIndex = -1;
  newElement.style.top = 0;
  newElement.style.left = 0;

  newElement.classList.add("shapes-container");
  element.appendChild(newElement);

  for (let i = 0; i < numberOfShapes; i++) {
    //   choose random shape from array
    let shape = shapeList[Math.floor(Math.random() * shapeList.length)];
    // choose random color for shape
    let color = colorList[Math.floor(Math.random() * colorList.length)];
    let top = Math.floor(Math.random() * element.clientHeight);
    let left = Math.floor(Math.random() * element.clientWidth);
    let width = Math.floor(Math.random() * 100);
    let height = Math.floor(Math.random() * 100);
    let shapeElement = document.createElement("div");

    shapeElement.id = "shape" + i;
    shapeElement.style.position = "absolute";
    shapeElement.style.top = top + "px";
    shapeElement.style.left = left + "px";

    if (shapesMode == 1) {
      shapeElement.style.width = width + "px";
      shapeElement.style.height = height + "px";
      shapeElement.style.backgroundColor = color;
      shapeElement.style.clipPath = shape;
    }

    shapeElement.innerHTML = shape;
    if (rotation) {
      shapeElement.style.transform =
        rotationsList[Math.floor(Math.random() * rotationsList.length)];
    }
    
    newElement.appendChild(shapeElement);

    if (shapesMode == 2) {
      let svgElementsList = [" line", " circle", " path", " rect"];
      for (let j = 0; j < svgElementsList.length; j++) {
        let svgElement = svgElementsList[j];
        let elementsList = document.querySelectorAll(
          "#shape" + i + " svg" + svgElement
        );
        for (let k = 0; k < elementsList.length; k++) {
          let element = elementsList[k];
          if (element.hasAttribute("fill")) {
            element.setAttribute("fill", color);
          }
          if (element.hasAttribute("stroke")) {
            element.setAttribute("stroke", color);
          }
        }
      }
    }
  }
}

let element = document.body;
let colorList = [
  "#8dd0ee",
  "#91abef",
  "#ae9cee",
  "#dea1ef",
  "#f4a1d6",
  "#f49fa6",
  "#8be5e9",
  "#90b7ee",
  "#7cd4fc",
  "#9ccde3",
  "#e1f3f9",
  "#47ade3",
  
  "#bab4a4",
  "#deb8d4",
  "#848270",
  "#847378",
  "#bdc9d1",
  "#eaa1cc",
  "#93c2ea",
  "#397a9e",
  "#ecedf5",
  // "#a29bfe",
  // "#ffeaa7",
  // "#ff7675",
  // "#fd79a8",
  // "#ff7675",
  // "#55efc4",
  // "#636e72",
  // "#fdcb6e",
  // "#00cec9",
  // "#d63031",
  // "#0984e3",
  // "#6c5ce7",
];


generateBackground(element, colorList, numberOfShapes, mode, rotation);

const animateBox = document.querySelector("#animate");

const contrast = document.getElementById('contrast');
const headline = document.getElementById('headline');
const strapline = document.getElementById('strapline');

function addRemoveBgCol(element){
  if (element.classList.contains("bg-[#e9eef3]")) {
      element.classList.remove("bg-[#e9eef3]");
    } else {
      element.classList.add("bg-[#e9eef3]");
    }
}

// checkbox
animateBox.addEventListener("click", function () {
  addRemoveBgCol(contrast);
  addRemoveBgCol(strapline);

  mode = mode === 2 ? 1 : 2;
  
  generateBackground(
    element,
    colorList,
    numberOfShapes,
    mode,
    rotation,
  );
});

// form modal
  const hero = document.getElementById('hero');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const subscriptionModal = document.getElementById('subscriptionModal');
  const senderEmailError = document.getElementById('senderEmailError');
  const senderEmail = document.getElementById('senderEmail');

  openModalBtn.addEventListener('click', () => {
    setTimeout(() => {
      senderEmail.focus();
    }, 100);
    hero.classList.add("hidden");
    modalOverlay.classList.remove('hidden');
    subscriptionModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    hero.classList.remove("hidden");
    modalOverlay.classList.add('hidden');
    subscriptionModal.classList.add('hidden');
  });

document.addEventListener('keydown', (event) => {
    // check if the escape key was pressed
    if (event.key === 'Escape') {
        // hide the modal overlay and subscription modal
        modalOverlay.classList.add('hidden');
        subscriptionModal.classList.add('hidden');

        // show the "hero" element again
        document.getElementById('hero').classList.remove("hidden");
    }
});

const endpoint = "https://letsparty.olk1.com/letsparty.php";

// validate user inputted email address
document.getElementById('sendEmailBtn').addEventListener('click', async function() {
  if (senderEmail.value === "") {
    senderEmail.value = "Please enter your email address";
    setTimeout(() => {
      senderEmail.value = "";
    }, 1500);
    return;
  }

  if (!validateEmail(senderEmail.value)) {
    senderEmailError.textContent = "Your email address may contain errors";
    setTimeout(() => {
      senderEmailError.textContent = "";
    }, 1500);
    return;
  }

  try {
    // if email validates, send email payload
    const payload = {
      from: senderEmail.value,
      subject: 'New Lets Party Email Sign Up',
      body: senderEmail.value,
    };
    
    await sendEmail(payload);

    // reset input after successful email send
    senderEmail.value = "";
  } catch (error) {
    console.error('Error:', error);
    headline.innerHTML = `<span>OOPS! Please try again</span>`;
  }
});


async function sendEmail(payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });


  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  const data = await response.json();

  modalOverlay.classList.add("hidden");
  subscriptionModal.classList.add("hidden");
  hero.classList.remove("hidden");

  if (data.success) {
    openModalBtn.classList.add("hidden");
    headline.innerHTML = `<span>Welcome to the PARTY pal!</span>`;
    strapline.innerHTML = `<span>Check your inbox over the next few days for further instructions.</span>`;
  } else {
    headline.innerHTML = `<span>OOPS! Please try again</span>`;
  }
}



function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// 
// 
window.onload = animateBox.checked = false;