function showNotification({ message, type = 'success', duration = 3000 } = {}) {
    const container = document.getElementById('toast-container');

    // build a toast notification
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    // crearte a simple icons for success and error response
    const iconChar = type === 'success' ? '✓' : '!';
    toast.innerHTML = `
    <div class="icon">${iconChar}</div>
    <div class="message">${escapeHtml(message || '')}</div>
    <button class="close" aria-label="Close">×</button>
    <div class="bar"><span></span></div>
  `;

    // inmsert & animate the progress bar
    container.prepend(toast);
    const bar = toast.querySelector('.bar > span');

    // add timers with pause-on-hover support
    let start = Date.now();
    let remaining = duration;
    let rafId;

    const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.max(0, 1 - elapsed / duration);
        bar.style.transform = `scaleX(${progress})`;
        if (elapsed >= duration) return closeToast();
        rafId = requestAnimationFrame(animate);
    };

    const pause = () => {
        cancelAnimationFrame(rafId);
        remaining -= Date.now() - start;
    };
    const resume = () => {
        duration = remaining;
        start = Date.now();
        rafId = requestAnimationFrame(animate);
    };

    const closeToast = () => {
        cancelAnimationFrame(rafId);
        toast.style.animation = 'toast-out .15s ease-in forwards';
        setTimeout(() => toast.remove(), 160);
    };

    // toast events handler
    toast.querySelector('.close').addEventListener('click', closeToast);
    toast.addEventListener('mouseenter', pause);
    toast.addEventListener('mouseleave', resume);
    toast.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeToast();
    });

    // Start
    start = Date.now();
    rafId = requestAnimationFrame(animate);
}

// Basic HTML escaper for message text
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}