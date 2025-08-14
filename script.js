// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

    // 1. ПЛАВНАЯ ПРОКРУТКА ПРИ КЛИКЕ НА ССЫЛКИ НАВИГАЦИИ
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = this.getAttribute('href'); // Получаем ID секции
            const targetSection = document.querySelector(targetId); // Находим секцию

            if (targetSection) {
                // Плавно прокручиваем к секции с учетом высоты навигации
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. ИЗМЕНЕНИЕ НАВИГАЦИИ ПРИ ПРОКРУТКЕ
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            // Если прокрутили больше 100px, делаем навигацию более непрозрачной
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            // Возвращаем исходную прозрачность
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
    const observerOptions = {
        threshold: 0.1, // Элемент считается видимым, когда видно 10% его высоты
        rootMargin: '0px 0px -50px 0px' // Запускаем анимацию чуть раньше
    };

    // Создаем наблюдатель для отслеживания видимости элементов
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент попал в область видимости
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Находим все элементы, которые нужно анимировать
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-post, .about-content');

    // Добавляем класс для начального состояния анимации
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el); // Начинаем наблюдение за элементом
    });

    // 4. ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Предотвращаем отправку формы

            // Получаем данные из формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            // Имитируем отправку (в реальном проекте здесь был бы AJAX запрос)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Отправляется...';
            submitBtn.disabled = true;

            // Имитируем задержку отправки
            setTimeout(() => {
                alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
                this.reset(); // Очищаем форму
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // 5. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ДЛЯ ЗАГОЛОВКА
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;

    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        // Запускаем печать через небольшую задержку
        setTimeout(type, 500);
    }

    // Запускаем эффект печатной машинки
    typeWriter(heroTitle, originalText, 80);

    // 6. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ФОНА
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .about, .portfolio, .contacts');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5; // Скорость параллакса
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // 7. ПОДСВЕТКА АКТИВНОГО ПУНКТА НАВИГАЦИИ
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Убираем активный класс у всех ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// 8. ФУНКЦИЯ ДЛЯ ПЛАВНОГО ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Запускаем проверку при прокрутке
window.addEventListener('scroll', animateOnScroll);

// 9. ПРЕЛОАДЕР (ОПЦИОНАЛЬНО)
window.addEventListener('load', function() {
    // Скрываем прелоадер после загрузки страницы
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});