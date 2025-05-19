document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const prefsForm = document.getElementById('prefs-form');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const animationSpeed = document.getElementById('animation-speed');
    const speedValue = document.getElementById('speed-value');
    const welcomeUser = document.getElementById('welcome-user');
    const animationBox = document.getElementById('animation-box');
    const bounceBtn = document.getElementById('bounce-btn');
    const spinBtn = document.getElementById('spin-btn');
    const colorChangeBtn = document.getElementById('color-change-btn');
    
    // Load saved preferences
    loadPreferences();
    
    // Update speed value display
    speedValue.textContent = `${animationSpeed.value}x`;
    
    // Event Listeners
    prefsForm.addEventListener('submit', savePreferences);
    animationSpeed.addEventListener('input', updateSpeedDisplay);
    bounceBtn.addEventListener('click', triggerBounce);
    spinBtn.addEventListener('click', triggerSpin);
    colorChangeBtn.addEventListener('click', triggerColorChange);
    
    // Functions
    function loadPreferences() {
        const savedUsername = localStorage.getItem('username');
        const savedTheme = localStorage.getItem('theme');
        const savedSpeed = localStorage.getItem('animationSpeed');
        
        if (savedUsername) {
            usernameInput.value = savedUsername;
            welcomeUser.textContent = savedUsername;
        }
        
        if (savedTheme) {
            themeSelect.value = savedTheme;
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        
        if (savedSpeed) {
            animationSpeed.value = savedSpeed;
            speedValue.textContent = `${savedSpeed}x`;
            updateAnimationSpeed(savedSpeed);
        }
    }
    
    function savePreferences(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const theme = themeSelect.value;
        const speed = animationSpeed.value;
        
        // Save to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('theme', theme);
        localStorage.setItem('animationSpeed', speed);
        
        // Apply preferences
        welcomeUser.textContent = username || 'Guest';
        document.documentElement.setAttribute('data-theme', theme);
        updateAnimationSpeed(speed);
        
        // Show confirmation animation
        showConfirmation();
    }
    
    function updateSpeedDisplay() {
        speedValue.textContent = `${animationSpeed.value}x`;
    }
    
    function updateAnimationSpeed(speed) {
        // Update all animations speed
        document.styleSheets[0].insertRule(
            `* { animation-duration: calc(var(--anim-speed, 1s) * ${speed}); }`, 
            document.styleSheets[0].cssRules.length
        );
        
        // Update transitions speed
        document.styleSheets[0].insertRule(
            `* { transition-duration: calc(var(--trans-speed, 0.3s) * ${speed}); }`, 
            document.styleSheets[0].cssRules.length
        );
    }
    
    function triggerBounce() {
        resetAnimations();
        animationBox.classList.add('bounce');
    }
    
    function triggerSpin() {
        resetAnimations();
        animationBox.classList.add('spin');
    }
    
    function triggerColorChange() {
        resetAnimations();
        animationBox.classList.add('color-change');
    }
    
    function resetAnimations() {
        animationBox.classList.remove('bounce', 'spin', 'color-change');
        // Force reflow to restart animations
        void animationBox.offsetWidth;
    }
    
    function showConfirmation() {
        const btn = prefsForm.querySelector('.btn-save');
        btn.textContent = 'Preferences Saved!';
        btn.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            btn.textContent = 'Save Preferences';
            btn.style.backgroundColor = '';
        }, 2000);
    }
    
    // Initialize with default speed
    updateAnimationSpeed(animationSpeed.value);
});