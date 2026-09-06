const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Ambient full-page night sky ----------
const bgStars = document.getElementById('bgStars');
if(!prefersReducedMotion){
  for(let i = 0; i < 50; i++){
    const star = document.createElement('div');
    star.className = 'bg-star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDelay = (Math.random() * 3) + 's';
    star.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    bgStars.appendChild(star);
  }
}

// ---------- Opening overlay ----------
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openBtn');
document.body.style.overflow = 'hidden';

openBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

// ---------- Scroll progress bar ----------
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// ---------- Section reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
revealEls.forEach(el => io.observe(el));

// ---------- Sunrise interaction ----------
const sunriseBtn = document.getElementById('sunriseBtn');
const sunriseCaption = document.getElementById('sunriseCaption');
const hero = document.getElementById('hero');
const heroSub = document.getElementById('heroSub');

sunriseBtn.addEventListener('click', () => {
  if(hero.classList.contains('risen')) return;
  hero.classList.add('risen');
  sunriseBtn.disabled = true;
  sunriseBtn.textContent = 'The sun is rising...';

  setTimeout(() => {
    sunriseBtn.textContent = '☀️ A new day is coming';
    sunriseCaption.textContent = "Tonight ends. Tomorrow begins. You're ready for it, Omar.";
    heroSub.style.opacity = 0;
    setTimeout(() => {
      heroSub.textContent = "Whatever tomorrow's stage brings, you're walking into it already prepared.";
      heroSub.style.opacity = 1;
    }, 400);
  }, 2600);
});

// ---------- Fireflies mini-game ----------
const fireflyZone = document.getElementById('fireflyZone');
const fireflyPositions = [10, 26, 45, 64, 82];
fireflyPositions.forEach((leftPct, i) => {
  const fly = document.createElement('div');
  fly.className = 'firefly';
  fly.style.left = leftPct + '%';
  fly.style.animationDelay = (i * 0.5) + 's';
  fly.setAttribute('aria-hidden', 'true');
  fly.addEventListener('click', () => {
    if(fly.classList.contains('popped')) return;
    fly.classList.add('popped');
  });
  fireflyZone.appendChild(fly);
});

// ---------- Checklist recap ----------
const recapSection = document.getElementById('recap');
const recapItems = document.querySelectorAll('#recapList li');
const recapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      recapItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('checked'), i * 400);
      });
      recapObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
recapObserver.observe(recapSection);

// ---------- Breathing exercise ----------
const breatheBtn = document.getElementById('breatheBtn');
const breatheCircle = document.getElementById('breatheCircle');
const breatheLabel = document.getElementById('breatheLabel');
let breathingActive = false;

function runBreathCycle(cyclesLeft){
  if(cyclesLeft <= 0){
    breatheLabel.textContent = 'Well done';
    setTimeout(() => {
      breatheLabel.textContent = 'Sleep well, Omar';
    }, 1200);
    breatheBtn.disabled = false;
    breatheBtn.textContent = 'Breathe again';
    breathingActive = false;
    return;
  }

  breatheLabel.textContent = 'Breathe in...';
  breatheCircle.classList.add('inhale');

  setTimeout(() => {
    breatheLabel.textContent = 'Hold...';
    setTimeout(() => {
      breatheLabel.textContent = 'Breathe out...';
      breatheCircle.classList.remove('inhale');
      setTimeout(() => {
        runBreathCycle(cyclesLeft - 1);
      }, 4000);
    }, 2000);
  }, 4000);
}

breatheBtn.addEventListener('click', () => {
  if(breathingActive) return;
  breathingActive = true;
  breatheBtn.disabled = true;
  breatheBtn.textContent = 'Breathing...';
  runBreathCycle(3);
});

// ---------- Letter flip card ----------
const flipInner = document.getElementById('flipInner');
const flipFront = document.getElementById('flipFront');
flipFront.addEventListener('click', () => {
  flipInner.classList.add('flipped');
});

// ---------- Encouragement quote cycler ----------
const quotes = [
  "You don't have to feel ready to be ready. You've put in the work — trust it.",
  "Every nurse who's ever stood where you're about to stand felt exactly like this the night before.",
  "Tired and prepared beats rested and unprepared. You're both tired and prepared — that's a win.",
  "Whatever happens tomorrow, showing up already says something about who you are.",
  "One stage at a time. You don't have to see the whole staircase, just the next step.",
  "Breathe. You know more than you think you do right now.",
];
let lastQuoteIndex = 0;
const quoteRotator = document.getElementById('quoteRotator');
const moreQuoteBtn = document.getElementById('moreQuoteBtn');

moreQuoteBtn.addEventListener('click', () => {
  quoteRotator.style.opacity = 0;
  setTimeout(() => {
    let next;
    do { next = Math.floor(Math.random() * quotes.length); } while(next === lastQuoteIndex);
    lastQuoteIndex = next;
    quoteRotator.textContent = quotes[next];
    quoteRotator.style.opacity = 1;
  }, 350);
});

// ---------- Cheer confetti ----------
const cheerBtn = document.getElementById('cheerBtn');
const confettiColors = ['#FFB870', '#FF8C6B', '#F3EEFF', '#6C5F94'];

function launchConfetti(){
  if(prefersReducedMotion) return;

  const count = 60;
  for(let i = 0; i < count; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 6;
    piece.style.width = size + 'px';
    piece.style.height = (size * 0.4) + 'px';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.left = Math.random() * 100 + 'vw';

    const duration = 2.5 + Math.random() * 1.5;
    const rotation = Math.random() * 360;
    const drift = (Math.random() - 0.5) * 200;

    piece.style.transform = `translateY(0) rotate(${rotation}deg)`;
    piece.style.transition = `transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94), opacity ${duration}s ease`;

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translate(${drift}px, 110vh) rotate(${rotation + 360}deg)`;
      piece.style.opacity = '0.2';
    });

    setTimeout(() => piece.remove(), duration * 1000 + 100);
  }
}

cheerBtn.addEventListener('click', launchConfetti);
