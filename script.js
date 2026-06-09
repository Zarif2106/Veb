'use strict';

// ============ SWIPER: Hero Section ============
const swiperFirst = new Swiper('.swiper-first', {
  loop: true,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-first .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-first .swiper-button-next',
    prevEl: '.swiper-first .swiper-button-prev',
  },
});

// ============ SWIPER: About Section (Cards) ============
const swiperSecond = new Swiper('.second__slider-cards', {
  loop: true,
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.second__slider-cards .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.second__slider-cards .swiper-button-next',
    prevEl: '.second__slider-cards .swiper-button-prev',
  },
});

// ============ ACCORDION: Features Section ============
const accordionBoxes = document.querySelectorAll('.accordion-box');

accordionBoxes.forEach((box) => {
  const btn = box.querySelector('.accordion-btn');
  const content = box.querySelector('.accordion-content');

  btn.addEventListener('click', () => {
    const isActive = box.classList.contains('accordion-box_active');

    // Закрываем все
    accordionBoxes.forEach((b) => {
      b.classList.remove('accordion-box_active');
      b.querySelector('.accordion-btn').classList.remove('accordion-btn_active');
      b.querySelector('.accordion-content').style.maxHeight = null;
    });

    // Открываем текущий, если он был закрыт
    if (!isActive) {
      box.classList.add('accordion-box_active');
      btn.classList.add('accordion-btn_active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Инициализация активного аккордеона при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const activeBox = document.querySelector('.accordion-box_active');
  if (activeBox) {
    const content = activeBox.querySelector('.accordion-content');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
});

// ============ LANGUAGE SELECTOR ============
const langBtn = document.querySelector('.header__lang-btn_selected');
const langOptions = document.querySelectorAll('.select__option');

langBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  langBtn.closest('.select').classList.toggle('select_open');
});

langOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    const lang = option.getAttribute('data-btn');
    if (langBtn) {
      langBtn.textContent = lang;
    }
    langBtn?.closest('.select').classList.remove('select_open');
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header__lang-box')) {
    document.querySelectorAll('.select').forEach((s) => s.classList.remove('select_open'));
  }
});

// ============ SMOOTH SCROLL (data-goto) ============
const gotoLinks = document.querySelectorAll('[data-goto]');

gotoLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSelector = link.getAttribute('data-goto');
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Закрыть мобильное меню если открыто
      document.querySelector('.header__menu')?.classList.remove('header__menu_open');
      document.querySelector('.burger')?.classList.remove('burger_active');
    }
  });
});

// ============ BURGER MENU ============
const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__menu');

burger?.addEventListener('click', () => {
  burger.classList.toggle('burger_active');
  headerMenu?.classList.toggle('header__menu_open');
  document.body.classList.toggle('no-scroll');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.header__link').forEach((link) => {
  link.addEventListener('click', () => {
    burger?.classList.remove('burger_active');
    headerMenu?.classList.remove('header__menu_open');
    document.body.classList.remove('no-scroll');
  });
});

// ============ HEADER BACKGROUND ON SCROLL ============
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header?.classList.add('header_scrolled');
  } else {
    header?.classList.remove('header_scrolled');
  }
});

// ============ SCROLL ANIMATIONS (Intersection Observer) ============
const animatedElements = document.querySelectorAll(
  '.second__content, .third__content, .four__content, .quotes__content, .subscribe__content, .press-quotes__item, .table__item'
);

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach((el) => {
  el.classList.add('animate-hidden');
  observer.observe(el);
});

// ============ FORM SUBSCRIPTION ============
const subscribeForm = document.querySelector('.subscribe__form');

subscribeForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = subscribeForm.querySelector('input[type="email"]');
  const email = emailInput?.value.trim();

  if (email && email.includes('@') && email.includes('.')) {
    alert(`Thank you! ${email} has been subscribed.`);
    emailInput.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
});

// ============ PARALLAX EFFECT (опционально) ============
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const firstSection = document.querySelector('.first');
  
  if (firstSection) {
    const bg = firstSection.querySelector('.swiper-first');
    if (bg) {
      bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// ============ MODAL REGISTRATION ============
const registerModal = document.getElementById('registerModal');
const openRegisterModal = document.getElementById('openRegisterModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerModalOverlay = document.getElementById('registerModalOverlay');
const registerForm = document.getElementById('registerForm');
const signinForm = document.getElementById('signinForm');
const passwordInput = document.getElementById('registerPassword');
const togglePassword = document.getElementById('togglePassword');
const passwordStrength = document.getElementById('passwordStrength');

// Открытие модального окна
openRegisterModal?.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Показываем форму регистрации по умолчанию
  showRegisterForm();
});

// Закрытие модального окна
const closeModal = () => {
  registerModal.classList.remove('active');
  document.body.style.overflow = '';
  registerForm?.reset();
  signinForm?.reset();
  if (passwordStrength) passwordStrength.className = 'password__strength';
};

closeRegisterModal?.addEventListener('click', closeModal);
registerModalOverlay?.addEventListener('click', closeModal);

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && registerModal?.classList.contains('active')) {
    closeModal();
  }
});

// ============ ПОКАЗАТЬ/СКРЫТЬ ПАРОЛЬ (REGISTER) ============
togglePassword?.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  togglePassword.innerHTML = type === 'password' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
         <circle cx="12" cy="12" r="3"></circle>
       </svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
         <line x1="1" y1="1" x2="23" y2="23"></line>
       </svg>`;
});

// ============ ПРОВЕРКА СИЛЫ ПАРОЛЯ ============
passwordInput?.addEventListener('input', (e) => {
  const password = e.target.value;
  let strength = 0;
  
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  passwordStrength.className = 'password__strength';
  
  if (password.length === 0) {
    passwordStrength.style.display = 'none';
  } else {
    passwordStrength.style.display = 'block';
    if (strength <= 2) {
      passwordStrength.classList.add('weak');
    } else if (strength <= 4) {
      passwordStrength.classList.add('medium');
    } else {
      passwordStrength.classList.add('strong');
    }
  }
});

// ============ ОБРАБОТКА ФОРМЫ РЕГИСТРАЦИИ ============
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  // Валидация
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  if (!agreeTerms) {
    alert('You must agree to the Terms of Service and Privacy Policy');
    return;
  }
  
  // Имитация отправки данных
  const submitBtn = registerForm.querySelector('.modal__submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Creating Account...';
  submitBtn.disabled = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`Welcome to SOS, ${username}! Your account has been created successfully.`);
    closeModal();
    
    // Сохранение данных
    localStorage.setItem('sos_user', JSON.stringify({
      username,
      email,
      password, // В реальном приложении НЕ сохраняйте пароли!
      registeredAt: new Date().toISOString()
    }));
    
  } catch (error) {
    alert('Registration failed. Please try again.');
    console.error('Registration error:', error);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// ============ ПЕРЕКЛЮЧЕНИЕ МЕЖДУ ФОРМАМИ ============
const switchToSignin = document.getElementById('switchToSignin');
const switchToRegister = document.getElementById('switchToRegister');
const modalTitle = registerModal?.querySelector('.modal__title');
const modalSubtitle = registerModal?.querySelector('.modal__subtitle');

// Показать форму Sign In
function showSigninForm() {
  if (registerForm && signinForm) {
    registerForm.style.display = 'none';
    signinForm.style.display = 'flex';
    signinForm.style.flexDirection = 'column';
    signinForm.style.gap = '20px';
    
    // Меняем заголовок модалки
    if (modalTitle) modalTitle.textContent = 'Welcome Back';
    if (modalSubtitle) modalSubtitle.textContent = 'Sign in to continue your adventure';
  }
}

// Показать форму Sign Up
function showRegisterForm() {
  if (registerForm && signinForm) {
    signinForm.style.display = 'none';
    registerForm.style.display = 'flex';
    registerForm.style.flexDirection = 'column';
    registerForm.style.gap = '20px';
    
    // Меняем заголовок модалки
    if (modalTitle) modalTitle.textContent = 'Join SOS';
    if (modalSubtitle) modalSubtitle.textContent = 'Create your account to start playing';
  }
}

// Обработчики переключения
switchToSignin?.addEventListener('click', (e) => {
  e.preventDefault();
  showSigninForm();
});

switchToRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  showRegisterForm();
});

// ============ ПОКАЗАТЬ/СКРЫТЬ ПАРОЛЬ (SIGN IN) ============
const signinPasswordInput = document.getElementById('signinPassword');
const toggleSigninPassword = document.getElementById('toggleSigninPassword');

toggleSigninPassword?.addEventListener('click', () => {
  const type = signinPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  signinPasswordInput.setAttribute('type', type);
  
  toggleSigninPassword.innerHTML = type === 'password' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
         <circle cx="12" cy="12" r="3"></circle>
       </svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
         <line x1="1" y1="1" x2="23" y2="23"></line>
       </svg>`;
});

// ============ ОБРАБОТКА ФОРМЫ SIGN IN ============
signinForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const emailOrUsername = document.getElementById('signinEmail').value.trim();
  const password = signinPasswordInput.value;
  const rememberMe = document.getElementById('rememberMe')?.checked;
  
  // Валидация
  if (!emailOrUsername || !password) {
    alert('Please fill in all fields!');
    return;
  }
  
  // Loading state
  const submitBtn = signinForm.querySelector('.modal__submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Signing In...';
  submitBtn.disabled = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Проверка данных из localStorage
    const savedUser = JSON.parse(localStorage.getItem('sos_user') || 'null');
    
    if (savedUser && 
        (savedUser.email === emailOrUsername || savedUser.username === emailOrUsername) &&
        savedUser.password === password) {
      // Успешный вход
      alert(`Welcome back, ${savedUser.username}!`);
      
      if (rememberMe) {
        localStorage.setItem('sos_session', JSON.stringify({
          email: savedUser.email,
          username: savedUser.username,
          loginAt: new Date().toISOString()
        }));
      }
      
      closeModal();
      updateHeaderAfterLogin(savedUser.username);
      
    } else if (savedUser) {
      alert('Invalid email/username or password!');
    } else {
      // Если нет сохраненного пользователя - демо-режим
      alert(`Welcome, ${emailOrUsername}! (Demo mode)`);
      closeModal();
      updateHeaderAfterLogin(emailOrUsername.split('@')[0]);
    }
    
  } catch (error) {
    alert('Login failed. Please try again.');
    console.error('Login error:', error);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// ============ ОБНОВЛЕНИЕ HEADER ПОСЛЕ ВХОДА ============
function updateHeaderAfterLogin(username) {
  const signinBtn = document.getElementById('openSigninModal');
  const registerBtn = document.getElementById('openRegisterModal');
  
  if (signinBtn && registerBtn) {
    // Создаем профиль
    const profileBtn = document.createElement('div');
    profileBtn.className = 'header__profile';
    profileBtn.innerHTML = `
      <div class="header__profile-avatar">
        ${username.charAt(0).toUpperCase()}
      </div>
      <span class="header__profile-name">${username}</span>
    `;
    
    // Заменяем кнопки на профиль
    signinBtn.replaceWith(profileBtn);
    registerBtn.style.display = 'none';
    
    // Добавляем меню профиля
    profileBtn.addEventListener('click', () => {
      if (confirm('Do you want to logout?')) {
        localStorage.removeItem('sos_session');
        location.reload();
      }
    });
  }
}

// ============ ПРОВЕРКА СЕССИИ ПРИ ЗАГРУЗКЕ ============
document.addEventListener('DOMContentLoaded', () => {
  const session = JSON.parse(localStorage.getItem('sos_session') || 'null');
  if (session) {
    updateHeaderAfterLogin(session.username);
  }
});