const doneBtn = document.getElementById("doneBtn");
const loadingBar = document.getElementById("loadingBar");
const sendBtn = document.getElementById("sendBtn");
const cancelBtn = document.getElementById("cancelBtn");
const cancelPrintBtn = document.getElementById("cancelPrintBtn");
const plusBtn = document.getElementById("plusBtn");
const minBtn = document.getElementById("minBtn");
const printSubmit = document.getElementById("printSubmit");
const totalPrint = document.getElementById("totalPrint");
const email = document.querySelector(".email");
const printer = document.querySelector(".print");
const loading = document.querySelector(".loading");
const keyboardContainer = document.querySelector(".keyboardContainer");
const input = document.querySelector(".use-keyboard-input");
const notifContainer = document.querySelector(".notifContainer");
const loadingContainer = document.querySelector(".loadingContainer");
const printContainer = document.querySelector(".printContainer");
const printAlert = document.querySelector(".printAlert");

let timer = 30;
let printCount = 1;
let minPrint = 1;
let maxPrint = 10;

const loadingBarAnimation = `loadingBar ${timer}s linear forwards`;

loadingBar.style.animation = loadingBarAnimation;

loading.addEventListener("animationend", () => {
  window.location.href = "../thankyou-page/thankyou-page.html";
});

printAlert.addEventListener("animationend", () => {
  printAlert.style.animation = "none";
});

const resetPrintCount = () => {
  printCount = 1;
  totalPrint.textContent = printCount;
};

plusBtn.addEventListener("click", () => {
  if (printCount >= maxPrint) {
    printCount = maxPrint;
  } else {
    printCount++;
    totalPrint.textContent = printCount;
  }
});

minBtn.addEventListener("click", () => {
  if (printCount <= minPrint) {
    printCount = minPrint;
  } else {
    printCount--;
    totalPrint.textContent = printCount;
  }
});

printSubmit.addEventListener("click", () => {
  printContainer.style.display = "none";
  loadingBar.classList.add("loading");
  loadingBar.style.animation = loadingBarAnimation;
  printAlert.style.animation = "printAlert 5s ease-in-out both";
  resetPrintCount();
});

cancelBtn.addEventListener("click", () => {
  notifContainer.style.display = "none";
  loadingContainer.style.display = "none";
  input.value = "";
  keyboardContainer.style.display = "none";
  loadingBar.classList.add("loading");
  loadingBar.style.animation = loadingBarAnimation;
});

cancelPrintBtn.addEventListener("click", () => {
  printContainer.style.display = "none";
  loadingBar.classList.add("loading");
  loadingBar.style.animation = loadingBarAnimation;
  resetPrintCount();
});

sendBtn.addEventListener("click", () => {
  if (input.value.length <= 10) {
    alert("Please enter a valid email!");
  } else {
    notifContainer.style.display = "flex";
    loadingContainer.style.display = "flex";
    setTimeout(function () {
      notifContainer.style.display = "none";
      loadingContainer.style.display = "none";
      input.value = "";
      keyboardContainer.style.display = "none";
      loadingBar.classList.add("loading");
      loadingBar.style.animation = loadingBarAnimation;
    }, 2000);
  }
});

doneBtn.addEventListener("click", () => {
  window.location.href = "../thankyou-page/thankyou-page.html";
});

email.addEventListener("click", () => {
  loadingBar.classList.remove("loading");
  loading.style.animation = "none";
  keyboardContainer.style.display = "flex";
  setTimeout(function () {
    input.style.top = "300px";
  }, 100);
});

printer.addEventListener("click", () => {
  loadingBar.classList.remove("loading");
  loading.style.animation = "none";
  printContainer.style.display = "flex";
});

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "_",
      "-",
      "space",
      "@",
      ".com",
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="${icon_name}"></i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("fa-solid fa-delete-left");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = "Caps Lock";

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = "Enter";

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      cancelBtn.addEventListener("click", () => {
        this.close();
        this._triggerEvent("onclose");
      });

      sendBtn.addEventListener("click", () => {
        this.close();
        this._triggerEvent("onclose");
      });

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
