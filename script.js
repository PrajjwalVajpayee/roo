const gridContainer = document.querySelector('.grid-container');
const startBtn = document.getElementById('startBtn');
const clientSeedInput = document.getElementById('client-seed');
let gridSize = 5; // Default grid size

// Setup Grid
function setupGrid(size) {
  gridSize = size;
  gridContainer.innerHTML = "";

  gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
  }

  // Update active button UI
  document.querySelectorAll('.grid-buttons button').forEach(btn => {
    btn.classList.remove('active-grid-btn');
    if (btn.textContent === (size * size).toString()) {
      btn.classList.add('active-grid-btn');
    }
  });
}

// Get 5 unique random indexes
function getRandomItems() {
  const total = gridSize * gridSize;
  const randomIndexes = new Set();
  while (randomIndexes.size < 5) {
    randomIndexes.add(Math.floor(Math.random() * total));
  }
  return Array.from(randomIndexes);
}

// Show diamonds and reset after 15s
function changeGridItems() {
  const randomIndexes = getRandomItems();
  randomIndexes.forEach(index => {
    gridContainer.children[index].classList.add('diamond');
  });

  setTimeout(() => {
    randomIndexes.forEach(index => {
      gridContainer.children[index].classList.remove('diamond');
    });
  }, 15000);
}

// Disable and re-enable Start button
function disable() {
  const waitMsg = document.getElementById("wait");

  waitMsg.innerHTML = "Wait for 20 sec For next round";
  startBtn.disabled = true;

  setTimeout(() => {
    startBtn.disabled = false;
    waitMsg.innerHTML = "";
  }, 15000);
}

// Play audio
function play() {
  const audio = document.getElementById("clickk");
  audio.play();
}

// Start Game button logic
startBtn.addEventListener('click', () => {
  changeGridItems();
});

// Monitor client seed input and enable/disable start button
clientSeedInput.addEventListener('input', () => {
  const seedValue = clientSeedInput.value.trim();
  startBtn.disabled = seedValue === "";
});

// Save client seed
document.querySelector('.save-btn').addEventListener('click', () => {
  const seed = clientSeedInput.value.trim();
  if (seed) {
    localStorage.setItem('clientSeed', seed);
    alert("Client seed saved: " + seed);
  } else {
    alert("Please enter a valid client seed.");
  }
});

// Initialize grid and set button state
setupGrid(5);
startBtn.disabled = true;


window.onload = function() {
  startCountdown();
};

function startCountdown() {
  var popup = document.getElementById('telegramPopup');
  var round = document.querySelector('.round');
  var timer = 5; // seconds

  var countdown = setInterval(function() {
      if (timer <= 0) {
          clearInterval(countdown);
          popup.style.display = 'none';
      } else {
          round.textContent = timer;
          timer--;
      }
  }, 1000); // 1 second interval
}