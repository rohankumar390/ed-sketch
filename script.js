// const { default: html2canvas } = require("html2canvas");

const eraser = document.querySelector("#eraser");
const black = document.querySelector("#black");
const rainbow = document.querySelector("#rainbow");
const clear = document.querySelector("#clear");
const gridside = document.querySelector("#gridside");
const canvas = document.querySelector(".canvas");
const blackColor = "black";
const whiteColor = "white";
const randomColor = getRandomColor();

let penColor = blackColor;
let side = 16;
let pendown = false;

function screenshot() {
  const st = document.querySelector(".canvas");
  console.log("hiting");
  html2canvas(st).then((c) => {
    const baseimg = c.toDataURL("image/png");
   
    var anchor = document.createElement("a");
    anchor.setAttribute("href", baseimg);
    anchor.setAttribute("download", "my-image.png");
    console.log(anchor);
    anchor.click();
    anchor.remove();
  });
}

// function upLoad(){
//     const canvas = document.querySelector(".canvas")
//     console.log("uploading...")
//     html2canvas(canvas).then((c) => {
//         const theImg = c.toDataURL("image/png")
//         const storageRef = db.ref().child("myimages");
//         const uploadtask = storageRef.put(theImg);

//         uploadtask.on("state_changed",(snapshot) => {
//             console.log(snapshot)
//         })
//     })

// }

document.getElementById("bbt").onclick = screenshot;

// document.getElementById("upload").onclick = upLoad;

function makegrid(side) {
  canvas.style.gridTemplateColumns = `repeat(${side},1fr)`;
  for (let i = 0; i < side * side; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.style.backgroundColor = `${whiteColor}`;
    canvas.appendChild(cell);
  }
}

function getRandomColor() {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed},${randomGreen},${randomBlue})`;
}

function draw(e) {
  if (penColor == randomColor) {
    e.target.style.backgroundColor = `${getRandomColor()}`;
  } else {
    e.target.style.backgroundColor = `${penColor}`;
  }
}

makegrid(16);
//for drawing on the canvas
canvas.addEventListener("mousedown", (e) => {
  pendown = true;
  draw(e);
});
//for stop drawing on the canvas
canvas.addEventListener("mouseup", () => {
  pendown = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (pendown == true) {
    draw(e);
  }
});

clear.addEventListener("click", () => {
  canvas.innerHTML = "";
  makegrid(side);
});

eraser.addEventListener("click", () => {
  penColor = whiteColor;
});

black.addEventListener("click", () => {
  penColor = blackColor;
});

rainbow.addEventListener("click", () => {
  penColor = `${randomColor}`;
});

gridside.addEventListener("click", () => {
  side = prompt("Enter gride side length: ");
  if (side > 1 && side < 65) {
    canvas.innerHTML = "";
    makegrid(side);
  } else {
    alert("Enter a value in range [2,64]!");
  }
});
