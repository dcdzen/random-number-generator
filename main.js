const dcml = document.getElementById("dcml");
const decimallabel = document.getElementById("decimallabel");
const decimalPrecisionInput = document.getElementById("decimalPrecisionInput");

let popit = document.getElementById("popit");
let reset = document.getElementById("reset");
let outputElement = document.getElementById("output");

let listBtn = document.getElementById("listBtn");
let numbList = document.querySelector("ul");

listBtn.addEventListener("click", function () {
  numbList.classList.toggle("addnumblist");
});

function decimalOption() {
  let decimalPrecisionElement = document.getElementById("decimalPrecisionInput");

  decimallabel.style.opacity = "0.5";
  decimalPrecisionInput.disabled = true;

  dcml.addEventListener("change", (event) => {
    if (event.target.value == 0) {
      decimallabel.style.opacity = "0.5";
      decimalPrecisionInput.disabled = true;
      decimalPrecisionElement.value = 0;
    } else {
      decimallabel.style.opacity = "1";
      decimalPrecisionInput.disabled = false;
    }
  });
}
decimalOption();

reset.addEventListener("click", function () {
  localStorage.removeItem("data");
  location.reload();
});

popit.addEventListener("click", function () {
  generateRandomInt();
  numbList.style.display = "block";
});

function generateRandomInt() {
  let decimalPrecisionElement = document.getElementById("decimalPrecisionInput");
  let decimalPrecision = Number(decimalPrecisionElement.value);

  let max = parseInt(document.getElementById("uplim").value);
  let min = parseInt(document.getElementById("lowlim").value);
  let duplicatesElement = document.getElementById("dupli");
  let duplicates = duplicatesElement.value;
  let sortElement = document.getElementById("srt");
  let sort = sortElement.value;
  let limitElement = document.getElementById("limitInput");
  let limit = Number(limitElement.value);
  // generate the random list of numbers
  let numbers = [];
  if (duplicates == 1) {
    for (let i = 0; i < limit; i++) {
      let number = Math.random() * (max - min) + min;
      number = parseFloat(number.toFixed(decimalPrecision));
      numbers.push(number);
    }
  } else {
    let attempts = 0;
    const maxAttempts = 10000; // Maximum attempts to prevent infinite loop

    while (numbers.length < limit && attempts < maxAttempts) {
      let number = Math.random() * (max - min) + min;
      number = parseFloat(number.toFixed(decimalPrecision));
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
      attempts++;
    }

    if (attempts === maxAttempts && numbers.length < limit) {
      // Handle the scenario where it's not possible to generate enough unique numbers
      console.error("Unable to generate the required number of unique values within the specified range.");
    }
  }

  if (sort === "1") {
    numbers.sort(function (a, b) {
      return a - b;
    });
  } else if (sort === "2") {
    numbers.sort(function (a, b) {
      return b - a;
    });
  }

  // Display the list of numbers
  outputElement.innerHTML = ""; // Clear previous output
  numbers.forEach(function (number) {
    let itemElement = document.createElement("li");
    itemElement.innerText = number;
    outputElement.appendChild(itemElement);
  });
  saveInput();
  // Avoid unnecessary reloads
  // location.reload();

  //   if (outputElement) {
  //     document.getElementById("popit").disabled = false;
  //   } else {
  //     document.getElementById("popit").disabled = true;
  //   }
}

function saveInput() {
  const tasks = Array.from(outputElement.querySelectorAll("li"));
  const data = tasks.map((task) => task.outerHTML).join("");
  localStorage.setItem("data", data);
}

function showInput() {
  const data = localStorage.getItem("data");
  if (data) {
    outputElement.innerHTML = data;
    numbList.style.display = "content";
  } else {
    numbList.style.display = "none";
  }
}
showInput();

// function copyText() {
//   event.preventDefault();
//   // Get the element containing the text
//   const textElement = document.getElementById("output");

//   // Create a range object to select the text
//   const range = document.createRange();
//   range.selectNode(textElement);

//   // Select the text within the range
//   window.getSelection().removeAllRanges();
//   window.getSelection().addRange(range);

//   // Copy the selected text to the clipboard
//   document.execCommand("copy");

//   // Deselect the text
//   window.getSelection().removeAllRanges();
// }

// function popupcopy() {
//   var popup = document.getElementById("myPopup");
//   popup.classList.toggle("show");
// }
