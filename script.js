const gridContainer = document.querySelector('.grid-container');
const startBtn = document.getElementById('startBtn');
const clientSeedInput = document.getElementById('client-seed');
let gridSize = 5; // Default grid size
let activeDiamondIndexes = []; // To store current diamonds

// Function to set up the grid
function setupGrid(size) {
  gridSize = size;
  gridContainer.innerHTML = "";

  gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    gridContainer.appendChild(cell);
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
  const set = new Set();
  while (set.size < 5) {
    set.add(Math.floor(Math.random() * total));
  }
  return Array.from(set);
}

// Play the game round
function startGame() {
  const seed = clientSeedInput.value.trim();
  if (!seed) {
    alert("Please enter a client seed before starting the game.");
    return;
  }

  // Play sound
  play();

  // Reset previous diamonds if any
  clearDiamonds();

  // Get 5 new random diamond positions
  activeDiamondIndexes = getRandomItems();
  activeDiamondIndexes.forEach(index => {
    gridContainer.children[index].classList.add('diamond');
  });

  // Disable the start button and start countdown
  let countdown = 20;
  startBtn.disabled = true;
  startBtn.textContent = `Wait ${countdown}s...`;

  const interval = setInterval(() => {
    countdown--;
    startBtn.textContent = `Wait ${countdown}s...`;

    if (countdown <= 0) {
      clearInterval(interval);
      clearDiamonds();
      startBtn.disabled = false;
      startBtn.textContent = "Start Game";
    }
  }, 1000);
}

// Clear all diamonds
function clearDiamonds() {
  activeDiamondIndexes.forEach(index => {
    if (gridContainer.children[index]) {
      gridContainer.children[index].classList.remove('diamond');
    }
  });
  activeDiamondIndexes = [];
}

// Play sound
function play() {
  const audio = document.getElementById("clickk");
  audio.play();
}

// Save client seed to localStorage
document.querySelector('.save-btn').addEventListener('click', () => {
  const seed = clientSeedInput.value.trim();
  if (seed) {
    localStorage.setItem('clientSeed', seed);
    alert("Client seed saved: " + seed);
  } else {
    alert("Please enter a valid client seed.");
  }
});

// Enable or disable start button based on seed input
clientSeedInput.addEventListener('input', () => {
  startBtn.disabled = clientSeedInput.value.trim() === "";
});

// Attach event to Start button
startBtn.addEventListener('click', startGame);

// Initialize grid
setupGrid(5);
startBtn.disabled = true;

// Auto-popup on load
window.onload = function () {
  startCountdown();
};

// Telegram popup countdown logic
function startCountdown() {
  const popup = document.getElementById('telegramPopup');
  const roundDisplay = document.querySelector('.round');
  let timer = 5;

  const interval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(interval);
      popup.style.display = 'none';
    } else {
      roundDisplay.textContent = timer;
      timer--;
    }
  }, 1000);
}
