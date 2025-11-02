const logo = document.getElementById("logo");
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

function updateLogo(e) {
  logo.src = e.matches ? "assets/white.png" : "assets/black.png";
}

// Set initial logo
updateLogo(darkMode);

// Update if user changes theme in real-time
darkMode.addEventListener("change", updateLogo);


const images = [
  "assets/slider1.jpg",
  "assets/slider2.jpg",
  "assets/slider3.jpg"
];

let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  document.getElementById("slider").style.backgroundImage = `url(${images[index]})`;
}, 6000);



const roles = document.querySelectorAll('.role');
const drumroll = new Audio('assets/audio/drum.mp3');
const pingsound = new Audio('assets/audio/ping.mp3');
const selectedRoleDisplay = document.getElementById('selected-role');
const randomizeRoleBtn = document.getElementById('randomize-btn');
let selectedRole = null;
let isRandomizing = false;

// Klik role: pindahkan highlight ke role yang diklik
roles.forEach(role => {
    role.addEventListener('click', () => {
        if (isRandomizing) return;
        setHighlight(role);
        setSelected(role);
        drumroll.currentTime = 0;
        drumroll.play();
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.role') && !isRandomizing) {
        clearHighlight();
    }
});

// Randomizer
randomizeRoleBtn.addEventListener('click', () => {
    if (isRandomizing) return;
    isRandomizing = true;

    // Hapus semua highlight dulu
    clearHighlight();

    randomizeRoleBtn.disabled = true;
    randomizeRoleBtn.textContent = 'Randomizing...';

    let index = 0;
    const cycleSpeed = 50;
    const totalCycles = Math.floor(Math.random() * 30) + 30;
    let cycleCount = 0;

    const interval = setInterval(() => {
        clearHighlight();
        roles[index].classList.add('highlight');
        index = (index + 1) % roles.length;
        cycleCount++;
        drumroll.currentTime = 0;
        drumroll.play();

        if (cycleCount >= totalCycles) {
            clearInterval(interval);

            const finalIndex = (index - 1 + roles.length) % roles.length;

            clearHighlight();
            roles[finalIndex].classList.add('highlight');
            setSelected(roles[finalIndex]);

            isRandomizing = false;
            randomizeRoleBtn.disabled = false;
            randomizeRoleBtn.textContent = 'Randomize Role';
            pingsound.currentTime = 0;
            pingsound.play();
        }
    }, cycleSpeed);
});

function clearHighlight() {
    roles.forEach(r => r.classList.remove('highlight'));
}

function setHighlight(role) {
    clearHighlight();
    role.classList.add('highlight');
}

function setSelected(role) {
    if (selectedRole) {
        selectedRole.classList.remove('selected');
    }
    selectedRole = role;
    selectedRole.classList.add('selected');
    selectedRoleDisplay.textContent = `Selected Role: ${role.dataset.name}`;
}


