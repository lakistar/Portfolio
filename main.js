document.addEventListener('DOMContentLoaded', () => {
    // --- Анімація друку тексту ---
    const typedTextSpan = document.getElementById('typed-text');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = ["WEB DESIGNER", "CREATIVE DEVELOPER", "FREELANCER"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedTextSpan) {
            console.warn("Елемент #typed-text не знайдено. Анімація друку тексту не працюватиме.");
            return;
        }

        const currentPhrase = textArray[textArrayIndex];

        if (cursorSpan) {
            cursorSpan.classList.remove("blink");
        }

        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(typeEffect, typingDelay + 500);
            return;
        }

        const currentSpeed = isDeleting ? erasingDelay : typingDelay;
        setTimeout(typeEffect, currentSpeed);
    }

    if (typedTextSpan && textArray.length > 0) {
        setTimeout(typeEffect, newTextDelay + 250);
    } else {
        console.warn("Попередження: Не вдалося ініціалізувати анімацію друку тексту.");
    }

    // --- Функціонал хедера (без бургер-меню) ---
    const header = document.querySelector('.header');

    if (header) {
        // Функція для зміни фону хедера при прокрутці
        function toggleHeaderBackground() {
            const scrollThreshold = 500;

            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', toggleHeaderBackground);
        toggleHeaderBackground();
    } else {
        console.warn("Попередження: Елемент 'header' не знайдено. Зміна фону хедера при прокрутці не працюватиме.");
    }

    // --- ФОРМА: ВЕЛИЧЕЗНА ЗМІНА ТУТ! ВЕСЬ ЦЕЙ БЛОК БУВ ПЕРЕНЕСЕНИЙ ІЗ ДРУГОГО DCL ---
    const form = document.getElementById('contact-form');

    if (form) { // Перевірка, чи форма існує на сторінці
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Зупиняємо стандартну відправку форми

            try {
                // Відправляємо дані форми асинхронно за допомогою Fetch API
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) { // Якщо відповідь успішна (статус 2xx)
                    alert('Ваше повідомлення успішно відправлено! Дякую за звернення.');
                    form.reset(); // Очищаємо поля форми
                } else {
                    // Обробка помилок
                    let errorMessage = 'Виникла помилка при відправленні повідомлення. Спробуйте ще раз пізніше.';
                    try {
                        const errorData = await response.json();
                        if (errorData && errorData.errors) {
                            errorMessage = errorData.errors.map(err => err.message).join('. ');
                        } else if (errorData && errorData.error) {
                            errorMessage = errorData.error;
                        }
                    } catch (e) {
                        // Якщо відповідь не є JSON
                        console.error('Error parsing error response:', e);
                    }
                    alert('Помилка: ' + errorMessage);
                    console.error('Form submission failed:', response.status, response.statusText);
                }

            } catch (error) {
                // Обробка мережевих помилок або інших непередбачених проблем
                alert('Сталася мережева помилка. Будь ласка, перевірте ваше з\'єднання або спробуйте ще раз.');
                console.error('Network error during form submission:', error);
            }
        });
    }
    // --- КІНЕЦЬ БЛОКУ ФОРМИ ---


    // --- Функціонал кнопки "Нагору" (Scroll To Top) ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        function scrollFunction() {
            if (document.body.scrollTop > 3000 || document.documentElement.scrollTop > 3000) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }

        window.addEventListener('scroll', scrollFunction);
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollFunction();
    } else {
        console.warn("Попередження: Елемент 'scrollToTopBtn' не знайдено. Кнопка 'Нагору' не працюватиме.");
    }

    // Отримуємо всі посилання, які ведуть до секцій на одній сторінці
    const navLinks = document.querySelectorAll('.nav ul li a[href^="#"], .header-btn[href^="#"]');
    const headerHeight = header ? header.offsetHeight : 0;

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    } else {
        console.warn("Попередження: Навігаційні посилання для плавної прокрутки не знайдено.");
    }

    // --- Ініціалізація AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 0,
            duration: 400,
            easing: 'ease',
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    } else {
        console.warn("Попередження: Бібліотека AOS (Animate On Scroll) не завантажена. Анімації AOS не працюватимуть.");
    }

    // --- Ініціалізація Particles.js ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80
                },
                "color": {
                    "value": "#8f43ff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5
                },
                "size": {
                    "value": 3
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8f43ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("Попередження: Бібліотека Particles.js не завантажена. Фонова анімація частинок не працюватиме.");
    }
});
