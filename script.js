const logo = document.getElementById("logo");
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

function updateLogo(e) {
  logo.src = e.matches ? "assets/white.png" : "assets/black.png";
}

updateLogo(darkMode);
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

randomizeRoleBtn.addEventListener('click', () => {
    if (isRandomizing) return;
    isRandomizing = true;

    clearHighlight();

    randomizeRoleBtn.disabled = true;
    randomizeRoleBtn.textContent = '。。。';

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

        const remaining = totalCycles - cycleCount;
        const randomSlowDownPoint = 7 + Math.floor(Math.random() * 6);

        if (remaining <= randomSlowDownPoint && cycleCount < totalCycles) {
            clearInterval(interval);
            slowDownCycle(index, cycleCount, randomSlowDownPoint);
        }
        if (cycleCount >= totalCycles) {
            clearInterval(interval);
            finish(index);
        }

    }, cycleSpeed);

    function slowDownCycle(index, count, remaining) {
        let delay = 60;

        function slowStep() {
            clearHighlight();
            roles[index].classList.add('highlight');
            index = (index + 1) % roles.length;
            count++;

            drumroll.currentTime = 0;
            drumroll.play();

            remaining--;
            delay += 50;
            if (remaining > 0) {
                setTimeout(slowStep, delay);
            } else {
                finish(index);
            }
        }

        setTimeout(slowStep, delay);
    }

    function finish(index) {
        const finalIndex = (index - 1 + roles.length) % roles.length;

        clearHighlight();
        roles[finalIndex].classList.add('highlight');
        setSelected(roles[finalIndex]);

        isRandomizing = false;
        randomizeRoleBtn.disabled = false;
        randomizeRoleBtn.textContent = 'ランダム';

        pingsound.currentTime = 0;
        pingsound.play();
    }

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


const items = document.querySelectorAll('.fade-on-scroll');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.9) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.9 });

items.forEach(el => observer.observe(el));


