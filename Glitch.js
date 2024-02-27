let images = []; // Array to store image paths
let currentImageIndex = 0; // Index of the current image
const numberOfImages = 7000; // Total number of images
let glitch;
let displayImage; // This will hold the currently displayed (glitched) image
let frameInterval = 10; // Initial interval for changing images
let nextFrameChange = frameInterval; // When to change the next image

function preload() {
  glitch = new Glitch();
  for (let i = 1; i <= numberOfImages; i++) {
    images.push(`AllFabricImages/${i}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  loadAndApplyGlitch(); // Initial load and apply glitch
}

function draw() {
  background(0);
  if (displayImage) {
    image(displayImage, width / 2, height / 2, width, height);
  }
  
  if (frameCount >= nextFrameChange) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadAndApplyGlitch(); // Load and apply glitch for the next image
    updateFrameInterval(); // Update the frame interval for the next change
  }
}

function loadAndApplyGlitch() {
  loadImage(images[currentImageIndex], img => {
    glitch.resetBytes();
    glitch.loadImage(img);
    glitch.randomBytes(50);
    glitch.buildImage(() => {
      displayImage = glitch.image;
    });
  });
}

function updateFrameInterval() {
  frameInterval = Math.floor(random(1, 18)); // Randomize interval between 2 and 120
  nextFrameChange += frameInterval; // Set the next frame change
}
