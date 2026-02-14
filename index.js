
function createSad() {
    const heartBg = document.createElement('div');
    heartBg.className = 'heart-bg';
    document.body.insertBefore(heartBg, document.body.firstChild);

    const hearts = ['🥲', '😔', '🤟', '😆', '😅', '🤣', '😂', '😹', '🙁', '😟', '😢', '😭', '🥺', '☹️', '🥹'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        heartBg.appendChild(heart);
    }
}

async function getNoReason() { 
    try { 
        const response = await fetch("https://naas.isalman.dev/no"); 
        if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`); 
        } 
        const data = await response.json(); // The API returns a JSON object with a rejection reason 
        
        // Remove header and buttons
        document.querySelector('header').remove();
        document.querySelector('main > div').remove();
        
        createSad();
        
        const resultEl = document.getElementById("result");
        resultEl.innerText = `I don't want to go because, ${data.reason}`; 
        resultEl.style.textAlign = 'center';
        resultEl.style.padding = '30px 10px';
        resultEl.style.zIndex = '1';
        resultEl.style.fontSize = '2rem';
        resultEl.style.color = 'white';
        resultEl.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 105, 180, 0.5)';
        resultEl.style.letterSpacing = '2px';
        resultEl.style.fontWeight = '700';
        resultEl.style.marginBottom = '10px';
        resultEl.style.animation = 'slideDown 0.8s ease-out';
        resultEl.style.position = 'fixed';
        resultEl.style.top = '50%';
        resultEl.style.left = '50%';
        resultEl.style.transform = 'translate(-50%, -50%)';
        resultEl.style.width = '80vw';
        resultEl.style.maxWidth = '80vw';
    } catch (error) { 
        console.error("Error fetching No-as-a-Service:", error); 
    } 
}

// Create floating hearts in the background
function createFloatingHearts() {
    const heartBg = document.createElement('div');
    heartBg.className = 'heart-bg';
    document.body.insertBefore(heartBg, document.body.firstChild);

    const hearts = ['❤️', '💖', '💝', '💗', '💓'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        heartBg.appendChild(heart);
    }
}

// Create confetti animation
function createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = ['#ff6b9d', '#ff1493', '#ffb6c1', '#ff69b4', '#c44569'][Math.floor(Math.random() * 5)];
        confetti.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotateZ(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Button functionality
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const result = document.getElementById('result');

// Track YES button state

yesBtn.addEventListener('click', async function(e) {
    const rect = this.getBoundingClientRect();
    createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Show success message
    getNoReason();
        
     
});

// Track NO button state
let noBtnFixed = false;
let noBtnX = 0;
let noBtnY = 0;

noBtn.addEventListener('mouseenter', function(e) {
    // Convert to fixed positioning on first approach
    if (!noBtnFixed) {
        const rect = this.getBoundingClientRect();
        noBtnX = rect.left;
        noBtnY = rect.top;
        this.style.position = 'fixed';
        this.style.left = noBtnX + 'px';
        this.style.top = noBtnY + 'px';
        this.style.margin = '0';
        this.style.zIndex = '10';
        noBtnFixed = true;
        this.setAttribute('data-scale', '1');
    }
});

document.addEventListener('mousemove', function(e) {
    if (!noBtnFixed) return;
    
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    
    // Calculate distance between cursor and button center
    const buttonCenterX = noBtnX + 50; // approximate button width / 2
    const buttonCenterY = noBtnY + 30; // approximate button height / 2
    
    const dx = buttonCenterX - cursorX;
    const dy = buttonCenterY - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If cursor is close, move button away
    if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = 200;
        
        noBtnX = cursorX + Math.cos(angle) * moveDistance;
        noBtnY = cursorY + Math.sin(angle) * moveDistance;
        
        // Constrain to viewport with padding
        noBtnX = Math.max(0, Math.min(noBtnX, window.innerWidth - 120));
        noBtnY = Math.max(0, Math.min(noBtnY, window.innerHeight - 70));
        
        // Apply position
        noBtn.style.transition = 'all 0.2s ease-out';
        noBtn.style.left = noBtnX + 'px';
        noBtn.style.top = noBtnY + 'px';
        
        // Increase size slightly
        const currentScale = parseFloat(noBtn.getAttribute('data-scale') || '1');
        const newScale = Math.min(currentScale + 0.02, 1.5);
        noBtn.setAttribute('data-scale', newScale);
        noBtn.style.transform = `scale(${newScale})`;
    }
});

// Initialize floating hearts when page loads
document.addEventListener('DOMContentLoaded', createFloatingHearts);
