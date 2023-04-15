const canvas = document.getElementById("my-canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const button = document.getElementById("small-button");
const overlay = document.getElementById("overlay");

button.addEventListener("click", () => {
  overlay.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.parentElement === overlay) {
    overlay.style.display = "none";
  }
});
