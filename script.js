document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const status = document.querySelector('.status');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        status.textContent = `Slide ${index + 1} / ${slides.length}`;
        currentSlide = index;
    }

    const handleNext = (e) => {
        if (e) e.preventDefault();
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };

    const handlePrev = (e) => {
        if (e) e.preventDefault();
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    };

    nextBtn.addEventListener('click', handleNext);
    nextBtn.addEventListener('touchstart', handleNext, { passive: false });

    prevBtn.addEventListener('click', handlePrev);
    prevBtn.addEventListener('touchstart', handlePrev, { passive: false });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });

    // Mobile Swipe (Optional but good)
    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        if (touchendX < touchstartX - 100) nextBtn.click();
        if (touchendX > touchstartX + 100) prevBtn.click();
    }, { passive: true });
});
