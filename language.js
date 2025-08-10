/* ===== Language toggle logic ===== */
const STORAGE_KEY = 'siteLang';

const translations = {
    'info-h1': { uk: 'Мої Послуги та Рівень Експертизи', en: 'My Services and Expertise' },
    'info-p1': { uk: 'На цій сторінці ви знайдете розгорнуту інформацію про спектр моїх професійних послуг, глибину знань у ключових технологіях та мій підхід до реалізації проектів. Моя мета – перетворити ваші ідеї на функціональні, привабливі та масштабовані веб-додатки.', en: 'On this page, you will find detailed information about my professional services, my knowledge in key technologies, and my approach to project implementation. My goal is to turn your ideas into functional, attractive, and scalable web applications.' },
    'info-h2-1': { uk: 'Детальний Опис Послуг', en: 'Detailed Description of Services' },
    'info-p2': { uk: 'Я пропоную комплексні рішення для створення веб-проектів будь-якої складності, від розробки концепції до впровадження та подальшої підтримки. Моя ціль – забезпечити високу якість, ефективність та інноваційний підхід до кожного завдання.', en: 'I offer comprehensive solutions for creating web projects of any complexity, from concept development to implementation and ongoing support. My goal is to ensure high quality, efficiency, and an innovative approach to every task.' },
    'info-li1': { uk: '<strong>Розробка Веб-Сайтів "Під Ключ":</strong> Створення унікальних, високопродуктивних сайтів від простих лендінгів до складних корпоративних порталів та E-commerce рішень, з акцентом на UX/UI.', en: '<strong>"Turnkey" Website Development:</strong> Creation of unique, high-performance websites, from simple landing pages to complex corporate portals and E-commerce solutions, with a focus on UX/UI.' },
    'info-li2': { uk: '<strong>Фронтенд Розробка:</strong> Розбудова інтерактивних та візуально привабливих інтерфейсів користувача з використанням сучасних технологій (HTML5, CSS3, JavaScript, React.js). Забезпечення кросбраузерності та адаптивного дизайну.', en: '<strong>Frontend Development:</strong> Building interactive and visually appealing user interfaces using modern technologies (HTML5, CSS3, JavaScript, React.js). Ensuring cross-browser compatibility and responsive design.' },
    'info-li3': { uk: '<strong>Оптимізація Продуктивності та SEO:</strong> Налагодження швидкості завантаження та роботи сайту для покращення користувацького досвіду, підвищення позицій у пошукових системах та загальної ефективності.', en: '<strong>Performance Optimization and SEO:</strong> Adjusting site loading speed and performance to improve user experience, boost search engine rankings, and enhance overall efficiency.' },
    'info-h2-2': { uk: 'Мій Рівень Вмінь та Технології', en: 'My Skill Level and Technologies' },
    'info-p3': { uk: 'Моя експертиза охоплює ключові технології та інструменти веб-розробки, що дозволяє мені створювати надійні та масштабовані рішення, відповідаючи найвищим стандартам якості. Я постійно навчаюсь та адаптуюсь до нових трендів індустрії, щоб завжди пропонувати актуальні та ефективні підходи.', en: 'My expertise covers key web development technologies and tools, allowing me to create reliable and scalable solutions that meet the highest quality standards. I am constantly learning and adapting to new industry trends to always offer relevant and effective approaches.' },
    'info-li4': { uk: '<strong>Фронтенд Технології:</strong> Досконале володіння HTML5, CSS3, JavaScript (ES6+, асинхронний код, робота з API), React.js (або Vue.js/Angular за потреби).', en: '<strong>Frontend Technologies:</strong> Proficient in HTML5, CSS3, JavaScript (ES6+, asynchronous code, API work), React.js (or Vue.js/Angular as needed).' },
    'info-li5': { uk: '<strong>Бекенд Основи та Бази Даних:</strong> Розуміння принципів бекенд-розробки, вміння працювати з RESTful API та базовий досвід з базами даних, якщо це необхідно для інтеграції.', en: '<strong>Backend Fundamentals and Databases:</strong> Understanding of backend development principles, ability to work with RESTful APIs, and basic experience with databases when needed for integration.' },
    'info-li6': { uk: '<strong>Інструменти та Методології:</strong> Впевнене використання систем контролю версій (Git, GitHub), інструментів автоматизації, а також розуміння Agile/Scrum методологій для ефективної командної роботи.', en: '<strong>Tools and Methodologies:</strong> Confident use of version control systems (Git, GitHub), automation tools, and understanding of Agile/Scrum methodologies for effective teamwork.' },
    'info-p4': { uk: 'Я підходжу до кожного проекту з індивідуальним підходом, увагою до деталей та прагненням забезпечити не лише функціональність, а й винятковий користувацький досвід. Моя мета – створювати рішення, які дійсно приносять цінність.', en: 'I approach each project with an individual focus, attention to detail, and a desire to provide not just functionality, but an exceptional user experience. My goal is to create solutions that truly bring value.' },
    'back-to-home-btn': { uk: 'Повернутися на головну', en: 'Back to home' },
    'nav-home': { uk: 'Головна', en: 'Home' },
    'nav-about': { uk: 'Про мене', en: 'About' },
    'nav-portfolio': { uk: 'Портфоліо', en: 'Portfolio' },
    'nav-skills': { uk: 'Навички', en: 'Skills' },
    'btn-contact': { uk: 'Написати', en: 'Contact' },
    'hero-title': { uk: 'Привіт, я Ірина Костюк!', en: 'Hi, I\'m Iryna Kostiuk!' },
    'hero-typed': { uk: "Я веб-дизайнерка та фронтенд-розробниця", en: "I'm a Web Designer & Frontend Developer" },
    'hero-paragraph': { uk: 'Привіт! Я створюю сучасні, адаптивні та стильні сайти для бізнесу, брендів і креативних проєктів.<br>Від лендінгів до повноцінних вебплатформ — я підходжу до кожного проєкту з увагою до деталей та любов’ю до дизайну.', en: 'Hi! I create modern, responsive, and stylish websites for businesses, brands, and creative projects.<br>From landing pages to full web platforms — I approach every project with attention to detail and a love for design.' },
    'about-subtitle': { uk: 'Що я пропоную', en: 'What I Offer' },
    'about-h2': { uk: 'Наші Послуги', en: 'Our Services' },
    'about-text': { uk: 'Я — вебдизайнер, який прагне створювати найкращі рішення для своїх клієнтів. Моя мета — перевершити ваші очікування та допомогти вам досягти успіху в онлайн-просторі. Я працюю індивідуально, з повною віддачею кожному проєкту, бо ваш результат — це і мій успіх.', en: 'I\'m a web designer dedicated to creating the best solutions for my clients. My goal is to exceed your expectations and help you succeed in the online space. I work individually, with full dedication to each project, because your result is my success.' },
    'service1-title': { uk: 'Веб-Розробка', en: 'Web Development' },
    'service1-desc': { uk: 'Створюю сучасні, швидкі та адаптивні сайти — від лендінгів до портфоліо та бізнес-сторінок.', en: 'I create modern, fast, and responsive websites — from landing pages to portfolios and business pages.' },
    'service2-title': { uk: 'UI/UX Дизайн', en: 'UI/UX Design' },
    'service2-desc': { uk: 'Розробляю інтерфейси, які поєднують зручність, стиль і логіку для кращого досвіду користувачів.', en: 'I develop interfaces that combine convenience, style, and logic for a better user experience.' },
    'service3-title': { uk: 'Онлайн-Маркетинг', en: 'Online Marketing' },
    'service3-desc': { uk: 'Допоможу вашому сайту бути помітним: базова SEO-оптимізація, структура та впізнаваність.', en: 'I\'ll help your site get noticed: basic SEO optimization, structure, and brand recognition.' },
    'read-more': { uk: 'Детальніше', en: 'Read more' },
    'portfolio-subtitle': { uk: 'Подивіться мої роботи', en: 'Check out my work' },
    'portfolio-h2': { uk: 'Мої Проекти', en: 'My Projects' },
    'ira-label': { uk: 'ІРА', en: 'IRA' },
    'cta-text': { uk: 'ПРОЕКТИ НА ЗАМОВЛЕННЯ!', en: 'CUSTOM PROJECTS!' },
    'works-h2': { uk: 'Роботи', en: 'Works' },
    'portfolio-intro': { uk: 'Ви перебуваєте на сайті, на якому також показані мої вміння.', en: 'You are on a site that also showcases my skills.' },
    'skills-subtitle': { uk: 'Мої Навички', en: 'My Skills' },
    'skills-h2': { uk: 'Мої Навички', en: 'My Skills' },
    'skills-h3': { uk: 'Кожен день — новий виклик та можливість', en: 'Every day is a new challenge and opportunity' },
    'skills-p1': { uk: 'Я створюю унікальні сайти, які працюють на ваш успіх.<br> Моя мета — зробити ваш бізнес помітним та ефективним в онлайн-просторі.', en: 'I create unique websites that work for your success.<br> My goal is to make your business visible and effective in the online space.' },
    'skills-p2': { uk: 'Завдяки індивідуальному підходу та сучасним технологіям, я перетворюю ідеї у стильний і функціональний веб-дизайн, який залучає клієнтів і підвищує ваш дохід.', en: 'Thanks to an individual approach and modern technologies, I turn ideas into stylish and functional web design that attracts clients and increases your revenue.' },
    'skill1-title': { uk: 'Веб Дизайн', en: 'Web Design' },
    'skill2-title': { uk: 'Веб Розробка', en: 'Web Development' },
    'skill3-title': { uk: 'Оптимізація продуктивності', en: 'Performance Optimization' },
    'skill4-title': { uk: 'Кодування', en: 'Coding' },
    'contact-subtitle': { uk: 'Контакти', en: 'Contacts' },
    'contact-h2': { uk: 'Залишити Заявку або Задати Питання', en: 'Leave a Request or Ask a Question' },
    'company-address-title': { uk: 'Комунікація', en: 'Communication' },
    'company-address-text': { uk: 'Переважний спосіб зв\'язку — особисті повідомлення на платформі.<br>За потреби доступна електронна пошта.', en: 'The preferred method of contact is private messages on the platform.<br>Email is available if needed.' },
    'email-title': { uk: 'Email Адреса', en: 'Email Address' },
    'contact-form-title': { uk: 'Зв\'яжіться з Нами', en: 'Contact Us' },
    'placeholder-name': { uk: 'Ваше Ім\'я', en: 'Your Name' },
    'placeholder-email': { uk: 'Ваш Email', en: 'Your Email' },
    'placeholder-subject': { uk: 'Тема (необов\'язково)', en: 'Subject (optional)' },
    'placeholder-message': { uk: 'Ваше Повідомлення', en: 'Your Message' },
    'contact-submit-btn': { uk: 'Відправити Повідомлення', en: 'Send Message' },
    'footer-text': { uk: '&copy; 2025 IRA WEB DEVELOPER. Всі права захищені.', en: '&copy; 2025 IRA WEB DEVELOPER. All rights reserved.' }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (!langToggleBtn) return;

    const langLabel = langToggleBtn.querySelector('.lang-label');
    const langFlagSpan = langToggleBtn.querySelector('.lang-flag');

    const svg_uk = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 4' preserveAspectRatio='none'><rect width='6' height='2' y='0' fill='#0057B7'/><rect width='6' height='2' y='2' fill='#FFD700'/></svg>`;
    const svg_us = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 100' preserveAspectRatio='none'><rect width='190' height='100' fill='#fff'/><rect width='190' height='7.6923' y='0' fill='#B22234'/><rect width='190' height='7.6923' y='15.3846' fill='#B22234'/><rect width='190' height='7.6923' y='30.7692' fill='#B22234'/><rect width='190' height='7.6923' y='46.1538' fill='#B22234'/><rect width='190' height='7.6923' y='61.5384' fill='#B22234'/><rect width='190' height='7.6923' y='76.923' fill='#B22234'/><rect width='190' height='7.6923' y='92.3076' fill='#B22234'/><rect width='82.65' height='53.846' x='0' y='0' fill='#3C3B6E'/><path d='M8.33,1.38 L9.7,5.55 L5.8,2.78 L9.7,0.1 L8.33,4.28 L4.4,2.78 z' fill='#fff'/></svg>`;

    function setFlagAndLabel(lang) {
        const svg = (lang === 'uk') ? svg_uk : svg_us;
        const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        langFlagSpan.style.backgroundImage = `url("${dataUrl}")`;
        langLabel.textContent = (lang === 'uk') ? 'UA' : 'EN';
        langToggleBtn.setAttribute('aria-pressed', lang === 'uk' ? 'false' : 'true');
        langToggleBtn.setAttribute('aria-label', (lang === 'uk') ? 'Language: Ukrainian. Click to toggle to English.' : 'Language: English. Click to toggle to Ukrainian.');
    }

    function applyTranslations(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.innerHTML = translations[key][lang];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][lang] !== undefined) {
                el.setAttribute('placeholder', translations[key][lang]);
            }
        });

        if (window.AOS) window.AOS.refresh();
    }

    function initLang() {
        let currentLang = localStorage.getItem(STORAGE_KEY) || 'uk';
        setFlagAndLabel(currentLang);
        applyTranslations(currentLang);

        langToggleBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'uk') ? 'en' : 'uk';
            localStorage.setItem(STORAGE_KEY, currentLang);
            setFlagAndLabel(currentLang);
            applyTranslations(currentLang);
        });
    }

    initLang();
});
