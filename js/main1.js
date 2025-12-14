document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const html = document.documentElement;
    const overflowHidden = 'oveflowHidden';
    const menuBurger = document.querySelector('.menu_burger');
    const discountBanner = document.querySelector('.discount_banner');
    const header = document.querySelector('.header');
    const slider = document.querySelector('.slider_top_block');
    const menuHeader = document.querySelector('.menu-header');
    const tmenuOffset = header.offsetTop;

    let lastScrollY = window.scrollY; 
    let isScrollingUp = false; 

    function checkScroll() {
        const currentScrollY = window.scrollY;
        
        isScrollingUp = currentScrollY < lastScrollY;
        
        if (window.scrollY > tmenuOffset + 10) {
            header.classList.add("fixed_block");
            discountBanner.classList.add("fixed_discount");
            menuBurger.classList.add('fixed_burger');
            
            if (isScrollingUp && menuHeader) {
                menuHeader.classList.add('show_menu');
                header.classList.add('show_header');
                discountBanner.classList.add('show_discount');
            } else if (menuHeader) {
                menuHeader.classList.remove('show_menu');
                header.classList.remove('show_header');
                discountBanner.classList.remove('show_discount');
            }
        } else {
            header.classList.remove("fixed_block");
            discountBanner.classList.remove("fixed_discount");
            menuBurger.classList.remove('fixed_burger');
            if (menuHeader) {
                menuHeader.classList.remove('show_menu');
                header.classList.remove('show_header');
                discountBanner.classList.remove('show_discount');
            }
        }
        
        lastScrollY = currentScrollY;
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll);

    if (menuHeader) {
        const secondLevelItems = menuHeader.querySelectorAll('.navbar-nav > li > ul > li');
        
        secondLevelItems.forEach(item => {
            const hasSubmenu = item.querySelector('ul');
            
            item.addEventListener('mouseenter', function() {
                secondLevelItems.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active-parent');
                    }
                });
                
                if (hasSubmenu) {
                    this.classList.add('active-parent');
                }
            });
        });

        const thirdLevelItems = menuHeader.querySelectorAll('.navbar-nav > li > ul > li > ul > li');
        
        thirdLevelItems.forEach(item => {
            const hasSubmenu = item.querySelector('ul');
            
            item.addEventListener('mouseenter', function() {
                const parentUl = this.parentElement;
                const siblings = parentUl.querySelectorAll(':scope > li');
                
                siblings.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active-parent');
                    }
                });
                
                if (hasSubmenu) {
                    this.classList.add('active-parent');
                }
            });
        });

        const firstLevelItems = menuHeader.querySelectorAll('.navbar-nav > li');
        
        firstLevelItems.forEach(item => {
            item.addEventListener('mouseleave', function() {
                const allActiveParents = this.querySelectorAll('.active-parent');
                allActiveParents.forEach(parent => {
                    parent.classList.remove('active-parent');
                });
            });
        });
    }

    if (discountBanner) {
        const closeBanner = discountBanner.querySelector('.close-banner');

        closeBanner.addEventListener('click', function() {
            discountBanner.classList.remove('show');
            header.classList.remove('top');
            if (slider) slider.classList.remove('top');
            if (menuBurger) menuBurger.classList.remove('top');
        })
    } 

    const contactsBtn = document.querySelector('.contactsBtn');

    if (contactsBtn) {
        const contactsBlock = document.querySelector('.contacts_block');

        contactsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            contactsBlock.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (
                !contactsBlock.contains(e.target) &&
                !contactsBtn.contains(e.target)
            ) {
                contactsBlock.classList.remove('show');
            }
        });
    }


    const tooltipButtons = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    if(tooltipButtons.length){
        tooltipButtons.forEach(button => {
            const tooltip = new bootstrap.Tooltip(button, {
                html: true,
                trigger: 'manual', // управляем вручную
                placement: 'top',
                customClass: 'product-tooltip',
            });

            let tooltipElement;

            const showTooltip = () => {
                tooltip.show();
                tooltipElement = document.querySelector('.tooltip.show');
                if (tooltipElement) {
                    tooltipElement.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
                    tooltipElement.addEventListener('mouseleave', hideTooltip);
                }
            };

            const hideTooltip = () => {
                tooltip.hide();
            };

            let hideTimeout;

            button.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                showTooltip();
            });

            button.addEventListener('mouseleave', () => {
                hideTimeout = setTimeout(() => {
                    hideTooltip();
                }, 500); // задержка чтобы успеть перейти курсором
            });
        });
    }

    const wrappers = document.querySelectorAll('.tooltip-wrapper');

      wrappers.forEach(wrapper => {
        const tooltip = wrapper.querySelector('.custom-tooltip');
        let hideTimeout;

        const showTooltip = () => {
          clearTimeout(hideTimeout);
          tooltip.classList.add('show');
        };

        const hideTooltip = () => {
          hideTimeout = setTimeout(() => {
            tooltip.classList.remove('show');
          }, 300);
        };

        wrapper.addEventListener('mouseenter', showTooltip);
        wrapper.addEventListener('mouseleave', hideTooltip);

        tooltip.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
        tooltip.addEventListener('mouseleave', hideTooltip);
      });


    const sliderTop = document.querySelector('.mySwiper_banner');

    if (sliderTop) {
        const swiper = new Swiper('.mySwiper_banner', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-top',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            on: {
                autoplayTimeLeft(s, time, progress) {
                    const activeButton = document.querySelector('.swiper-pagination-top .swiper-pagination-bullet-active::before');
                    if (activeButton) {
                        const remainingTime = (time / 1000);
                        activeButton.style.animationDuration = `${remainingTime}s`;
                    }
                },
                slideChange() {
                    setTimeout(() => {
                        const activeButton = document.querySelector('.swiper-pagination-top .swiper-pagination-bullet-active');
                        if (activeButton) {
                            const beforeEl = activeButton.querySelector('::before');
                            if (beforeEl) {
                                beforeEl.style.animation = 'none';
                                setTimeout(() => {
                                    beforeEl.style.animation = 'progressBar 6s linear infinite';
                                }, 10);
                            }
                        }
                    }, 50);
                }
            }
        });
    }

    const imageTooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    if (imageTooltip.length) {
        imageTooltip.forEach(el => {
            new bootstrap.Tooltip(el)
        });
    }

    const sliderProductsHits = document.querySelector('.hits .mySwiper_products');

    if (sliderProductsHits) {

        const swiperHits = new Swiper(".hits .mySwiper_products", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".hits .arrow_btn.next",
                prevEl: ".hits .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const sliderProductsNews = document.querySelector('.news .mySwiper_products');

    if (sliderProductsNews) {

        const swiperNews = new Swiper(".news .mySwiper_products", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".news .arrow_btn.next",
                prevEl: ".news .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const sliderProductsBuys = document.querySelector('.buys .mySwiper_products');

    if (sliderProductsBuys) {

        const swiperBuys = new Swiper(".buys .mySwiper_products", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".buys .arrow_btn.next",
                prevEl: ".buys .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const sliderProductsLikes = document.querySelector('.likes .mySwiper_products');

    if (sliderProductsLikes) {

        const swiperLikes = new Swiper(".likes .mySwiper_products", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".likes .arrow_btn.next",
                prevEl: ".likes .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const favoriteAdd = document.querySelectorAll('.favorite-add');

    if (favoriteAdd.length) {
        favoriteAdd.forEach((btn) => {
            btn.addEventListener('click', function() {
                btn.classList.toggle('plus');
            })
        })
    }

    const accordionHeader = document.querySelectorAll('.accordion-header');

    if (accordionHeader) {

        accordionHeader.forEach(header => {
            header.addEventListener('click', function() {
                const parent = this.closest('.accordion-item');

                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });

                parent.classList.toggle('active');
            });
        });
    }

    const btnCopy = document.querySelectorAll(".btn_copy");

    if(btnCopy.length){
        btnCopy.forEach(function(btn) {
            btn.addEventListener("click", function() {
                const textBlock = btn.closest(".modal-body").querySelector(".text-copy");
                if (textBlock) {
                    const text = textBlock.innerText;

                    navigator.clipboard.writeText(text).then(
                        () => {
                            btn.classList.add("copied");
                            setTimeout(() => btn.classList.remove("copied"), 1500);
                        },
                        (err) => {
                            console.error("Ошибка копирования:", err);
                        }
                    );
                }
            });
        });
    }

    const burger = document.querySelector('.burger_btn');

    if(burger){
        burger.addEventListener('click', function(){
            burger.classList.toggle('opened');
            menuBurger.classList.toggle('opened');
            html.classList.toggle(overflowHidden);
        })
    }

    const showroomBtnMobile = document.querySelector('.showroom_mobile_btn');
    const showroomModalMobile = document.querySelector('.showroom_mobile_modal');

    if(showroomBtnMobile){
        showroomBtnMobile.addEventListener('click', function(){
            showroomModalMobile.classList.add('loaded')    
        });
        
        showroomModalMobile.querySelector('.title').addEventListener('click', function(){
            showroomModalMobile.classList.remove('loaded');
        })
    }

    const clockBtnMobile = document.querySelector('.clock_btn');
    const clockModalMobile = document.querySelector('.clock_modal');

    if(clockBtnMobile){
        clockBtnMobile.addEventListener('click', function(){
            clockModalMobile.classList.add('loaded')    
        });
        
        clockModalMobile.querySelector('.btn_button').addEventListener('click', function(){
            clockModalMobile.classList.remove('loaded');
        })
    }


    const menuWrap = document.querySelector('.menu_top .navbar-nav');

    if (menuWrap){

        const handleMenuItems = (wrap, hasName) => {
            const menuItems = wrap.querySelectorAll('li a');

            menuItems.forEach(anchor => {
                const submenu = anchor.parentElement.querySelector('ul');

                if (hasName) {
                    const nameParent = document.createElement('li');
                    nameParent.classList.add('name_parent');

                    const parentLi = anchor.closest('li');

                    if (submenu) {
                        parentLi.classList.add('parent_li');
                        submenu.prepend(nameParent);
                        nameParent.textContent = anchor?.textContent || '';
                    }

                    nameParent.addEventListener('click', ({ target }) => {
                        const activeMenu = menuWrap.querySelector('ul.activity');
                        activeMenu?.classList.remove('activity');

                        const parentElement = target.closest('.loaded');
                        parentElement?.classList.remove('loaded', 'activity');

                        const activityParent = parentElement?.closest('.loaded');
                        activityParent?.classList.add('activity');
                    });
                }

                if (submenu) {
                    const arrow = document.createElement('i');
                    arrow.classList.add('arrow');
                    anchor.append(arrow);

                    arrow.addEventListener('click', (event) => {
                        event.preventDefault();

                        const currentLi = arrow.closest('li');
                        currentLi.parentElement.querySelectorAll('li').forEach(siblingLi => {
                            if (siblingLi !== currentLi) siblingLi.classList.remove('hasSubmenu');
                        });
                        
                        const isActiveLi = currentLi.classList.contains('active');
                        if(isActiveLi) {
                            currentLi.classList.remove('active');
                        } else {
                            currentLi.classList.toggle('hasSubmenu');
        
                            if (hasName) {
                                const siblingUl = currentLi.querySelector('ul');
                                const activeMenu = menuWrap.querySelector('ul.activity');
                                
                                activeMenu?.classList.remove('activity');
                                siblingUl?.classList.add('loaded', 'activity');
                            }
                        }
                    });
                }
            });
        };

        handleMenuItems(menuWrap, true);
    }

    const sliderRoom = document.querySelector('.mySwiper_room');

    if (sliderRoom) {
        const swiperRoom = new Swiper('.mySwiper_room', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-room',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            on: {
                autoplayTimeLeft(s, time, progress) {
                    const activeButton = document.querySelector('.swiper-pagination-room .swiper-pagination-bullet-active::before');
                    if (activeButton) {
                        const remainingTime = (time / 1000);
                        activeButton.style.animationDuration = `${remainingTime}s`;
                    }
                },
                slideChange() {
                    setTimeout(() => {
                        const activeButton = document.querySelector('.swiper-pagination-room .swiper-pagination-bullet-active');
                        if (activeButton) {
                            const beforeEl = activeButton.querySelector('::before');
                            if (beforeEl) {
                                beforeEl.style.animation = 'none';
                                setTimeout(() => {
                                    beforeEl.style.animation = 'progressBar 6s linear infinite';
                                }, 10);
                            }
                        }
                    }, 50);
                }
            }
        });
    }

    const loadingBtn = document.querySelector('.loading_btn');

    if(loadingBtn){
        loadingBtn.addEventListener('click', function(e){
            e.preventDefault();
            loadingBtn.classList.add('loaded');

            setTimeout(function(){
                loadingBtn.classList.remove('loaded');
            }, 2000)
        });
    }

    const sliderReview = document.querySelector('.mySwiper_review');

    if (sliderReview) {

        const swiperReview = new Swiper(".mySwiper_review", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".review_section .arrow_btn.next",
                prevEl: ".review_section .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const sliderDetals = document.querySelector('.mySwiper_project_detals');

    if (sliderDetals) {

        const swiperDetals = new Swiper(".mySwiper_project_detals", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".project_detals_section .arrow_btn.next",
                prevEl: ".project_detals_section .arrow_btn.prev",
            }
        });
    }

    const sliderBn = document.querySelector('.mySwiper_bn');

    if (sliderBn) {
        const swiperBn = new Swiper('.mySwiper_bn', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-bn',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: ".slider_bn_block .arrow_btn.next",
                prevEl: ".slider_bn_block .arrow_btn.prev",
            },
            speed: 1000,
            on: {
                autoplayTimeLeft(s, time, progress) {
                    const activeButton = document.querySelector('.swiper-pagination-room .swiper-pagination-bullet-active::before');
                    if (activeButton) {
                        const remainingTime = (time / 1000);
                        activeButton.style.animationDuration = `${remainingTime}s`;
                    }
                },
                slideChange() {
                    setTimeout(() => {
                        const activeButton = document.querySelector('.swiper-pagination-room .swiper-pagination-bullet-active');
                        if (activeButton) {
                            const beforeEl = activeButton.querySelector('::before');
                            if (beforeEl) {
                                beforeEl.style.animation = 'none';
                                setTimeout(() => {
                                    beforeEl.style.animation = 'progressBar 6s linear infinite';
                                }, 10);
                            }
                        }
                    }, 50);
                }
            }
        });
    }

    const sliderTabs = document.querySelector('.mySwiper_tabs');

    if (sliderTabs) {

        const swiperTabs = new Swiper(".mySwiper_tabs", {
            slidesPerView: 1,
            spaceBetween: 16,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".tabs_imag .arrow_btn.next",
                prevEl: ".tabs_imag .arrow_btn.prev",
            }
        });
    }

    const sliderModal = document.querySelector('.mySwiper_modal');

    if (sliderModal) {
        const swiperModal = new Swiper('.mySwiper_modal', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
            },
            mousewheel: {
                invert: false,
            },
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
        });

        const thumbnails = document.querySelectorAll('.thumbnail');
        const zoomLinks = document.querySelectorAll('.zoom');
        const modalEl = document.getElementById('showTabModal');

        // Клики по превьюшкам в модалке
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                swiperModal.slideTo(index);
                updateActiveThumbnail(index);
            });
        });

        // Клики по zoom в карточках
        zoomLinks.forEach((zoom, i) => {
            zoom.addEventListener('click', (e) => {
                e.preventDefault();

                // Берём ссылку на картинку
                const href = zoom.getAttribute('href');

                // Находим слайд в модалке с таким src
                const slides = sliderModal.querySelectorAll('.swiper-slide img, .swiper-slide video');
                let targetIndex = 0;
                slides.forEach((slide, idx) => {
                    if (slide.getAttribute('src') === href || slide.getAttribute('poster') === href) {
                        targetIndex = idx;
                    }
                });

                // После открытия модалки выставляем слайд
                modalEl.addEventListener('shown.bs.modal', () => {
                    swiperModal.slideTo(targetIndex);
                    updateActiveThumbnail(targetIndex);
                }, { once: true });
            });
        });

        function updateActiveThumbnail(activeIndex) {
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === activeIndex);
            });
        }

        swiperModal.on('slideChange', () => {
            updateActiveThumbnail(swiperModal.realIndex);
        });
    }

    const btnMore = document.querySelector(".btn_button.more");

    if (btnMore) {
        const textBlock = document.querySelector(".hide_text");
        const span = btnMore.querySelector("span");

        btnMore.addEventListener("click", function () {
            textBlock.classList.toggle("active");
            btnMore.classList.toggle("active");

            if (textBlock.classList.contains("active")) {
                span.textContent = "Скрыть";
            } else {
                span.textContent = "Подробнее";
            }
        });
    }

    let categorySwiper = null;
        
    function initSwiper() {
        const projectsSlider = document.querySelector(".projects-swiper");

        if(!projectsSlider) return;

        if (window.innerWidth <= 991) {
            if (!categorySwiper) {
                categorySwiper = new Swiper('.projects-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    loop: true
                });
            }
        } else {
            if (categorySwiper) {
                categorySwiper.destroy(true, true);
                categorySwiper = null;
            }
        }
    }
    
    window.addEventListener('load', initSwiper);
    
    window.addEventListener('resize', debounce(initSwiper, 250));
    
    // Функция debounce для оптимизации
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    let swiperInstance = null;

    function initSwiper2() {
        const InstanceSlider = document.querySelector(".service_price-swiper");

        if(!InstanceSlider) return;

        const windowWidth = window.innerWidth;

        if (windowWidth >= 560 && windowWidth < 1300) {
            if (!swiperInstance) {
                swiperInstance = new Swiper(".service_price-swiper", {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    loop: true
                });
            }
        } else {
            if (swiperInstance) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
            }
        }
    }

    initSwiper2();
    window.addEventListener("resize", initSwiper2);

    const phoneFields = document.querySelectorAll(".phone-input");

    if(phoneFields.length){
        phoneFields.forEach(field => {
            const input = field.querySelector("input");
            const clearBtn = field.querySelector(".clear-btn");

            IMask(input, {
                mask: "+{7} 000 000-00-00"
            });

            input.addEventListener("input", function () {
                clearBtn.style.display = input.value.length > 0 ? "block" : "none";
            });

            clearBtn.addEventListener("click", function () {
                input.value = "";
                clearBtn.style.display = "none";
                input.focus();
            });
        });
    }

    const sliderInterior = document.querySelector('.interiors_review');

    if (sliderInterior) {

        const swiperInterior = new Swiper(".interiors_review", {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".interiors_section .arrow_btn.next",
                prevEl: ".interiors_section .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 4 }
            }
        });
    }

    const fileFields = document.querySelectorAll(".field.file input[type='file']");

    if(fileFields.length){
        fileFields.forEach(input => {
            input.addEventListener("change", function() {
                const label = this.closest("label").querySelector("span");
                if (this.files.length > 0) {
                    label.textContent = this.files[0].name; // название файла
                } else {
                    label.textContent = "Прикрепить файл"; // если файл убрали
                }
            });
        });
    }

    const sliderSay = document.querySelector('.say_section');

    if (sliderSay) {

        const swiperSay = new Swiper(".say_review", {
            slidesPerView: 3,
            spaceBetween: 16,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".say_section .arrow_btn.next",
                prevEl: ".say_section .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                992: { slidesPerView: 3 }
            }
        });
    }

    const sliderReviewModal = document.querySelector('.review-slider-modal');

    if (sliderReviewModal) {

        const swiperReviewModal = new Swiper(".review-slider-swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".review-slider-modal .arrow_btn.next",
                prevEl: ".review-slider-modal .arrow_btn.prev",
            }
        });
    }

    let comfortSwiper = null;
        
    function initComfortSwiper2() {
        const comfortSlider = document.querySelector(".comfort-swiper");

        if(!comfortSlider) return;

        if (window.innerWidth <= 991) {
            if (!comfortSwiper) {
                comfortSwiper = new Swiper('.comfort-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    loop: true
                });
            }
        } else {
            if (comfortSwiper) {
                comfortSwiper.destroy(true, true);
                comfortSwiper = null;
            }
        }
    }

    window.addEventListener('load', initComfortSwiper2);
    
    window.addEventListener('resize', debounce(initComfortSwiper2, 250));


    let faqSliderSwiper = null;
        
    function initFaqSwiper() {
        const slider = document.querySelector(".faq-slider-swiper");

        if(!slider) return;

        if (window.innerWidth <= 991) {
            if (!faqSliderSwiper) {
                faqSliderSwiper = new Swiper('.faq-slider-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    loop: true
                });
            }
        } else {
            if (faqSliderSwiper) {
                faqSliderSwiper.destroy(true, true);
                faqSliderSwiper = null;
            }
        }
    }

    window.addEventListener('load', initFaqSwiper);
    
    window.addEventListener('resize', debounce(initFaqSwiper, 250));

    const articleSlider = document.querySelectorAll(".article_section");

    if (articleSlider.length) {
        articleSlider.forEach((slider) => {
            const sliderClass = slider.querySelector('.article-swiper');

            let articleSwiper = null;

            function initArticleSwiper() {
                if (window.innerWidth <= 991) {
                    if (!articleSwiper) {
                        articleSwiper = new Swiper(sliderClass, {
                            slidesPerView: 'auto',
                            spaceBetween: 12,
                            loop: true
                        });
                    }
                } else {
                    if (articleSwiper) {
                        articleSwiper.destroy(true, true);
                        articleSwiper = null;
                    }
                }
            }

            window.addEventListener('load', initArticleSwiper);
            window.addEventListener('resize', debounce(initArticleSwiper, 250));
        });
    }

    function initResponsiveSwiper(selector, swiperClass) {
        let swiperInstance = null;
        const row = document.querySelector(selector);
        
        if (!row) return;
        
        function enableSwiper() {
            if (!swiperInstance && window.innerWidth <= 1426) {
                const children = Array.from(row.children);
                row.classList.add("swiper");
                row.classList.remove("row");
                row.innerHTML = `<div class="swiper-wrapper">
                    ${children.map(child => `<div class="swiper-slide">${child.outerHTML}</div>`).join("")}
                </div>`;
                swiperInstance = new Swiper(selector, {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                });
            }
        }
        
        function disableSwiper() {
            if (swiperInstance && window.innerWidth > 1426) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
                const slides = row.querySelectorAll(".swiper-slide .col");
                row.classList.remove("swiper");
                row.classList.add("row");
                row.innerHTML = "";
                slides.forEach(slide => row.appendChild(slide));
            }
        }
        
        function checkSwiper() {
            if (window.innerWidth <= 1426) {
                enableSwiper();
            } else {
                disableSwiper();
            }
        }
        
        checkSwiper();
        window.addEventListener("resize", checkSwiper);
    }

    initResponsiveSwiper(".js-subcat-row", "js-subcat-row");
    initResponsiveSwiper(".js-subcat2-row", "js-subcat2-row");

    const textBlock = document.querySelector(".js-text");
    const moreBtn = document.querySelector(".js-more");

    if (textBlock && moreBtn) {
        moreBtn.addEventListener("click", () => {
            textBlock.classList.toggle("open");
            moreBtn.textContent = textBlock.classList.contains("open") 
                ? "Скрыть" 
                : "Показать еще";
        });
    }

    let viewedSwiper = null;
        
    function initComfortSwiper() {
        const viewedSlider = document.querySelector(".viewed-swiper");

        if(!viewedSlider) return;

        if (window.innerWidth <= 991) {
            if (!viewedSwiper) {
                viewedSwiper = new Swiper('.viewed-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    loop: true
                });
            }
        } else {
            if (viewedSwiper) {
                viewedSwiper.destroy(true, true);
                viewedSwiper = null;
            }
        }
    }

    const menuLinks = document.querySelectorAll('.anchor_menu a[href^="#"]');

    if(menuLinks.length){
        const sections = document.querySelectorAll('section');
        const menuItems = document.querySelectorAll('.anchor_menu li');
        
        function smoothScroll(target) {
            const element = document.querySelector(target);
            if (element) {
                const offsetTop = element.offsetTop - 150; 
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                
                menuItems.forEach(item => item.classList.remove('active'));
                
                this.parentElement.classList.add('active');
                
                smoothScroll(target);
            });
        });
        
        function updateActiveMenu() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 150; 
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = '#' + section.querySelector('h2, h3').id;
                }
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                const link = item.querySelector('a');
                if (link && link.getAttribute('href') === currentSection) {
                    item.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveMenu);
        
        updateActiveMenu();
    }

    const contentSwiperWrap = document.querySelector('.contentSwiperWrap');

    if(contentSwiperWrap){
        const swiperThumbs = new Swiper(".contentSwiperThumb", {
            spaceBetween: 12,
            slidesPerView: 'auto',
            
            watchSlidesProgress: true,
        });

        const swiperMain = new Swiper(".contentSwiper", {
            spaceBetween: 12,
            slidesPerView: 1,
            freeMode: true,
            thumbs: {
                swiper: swiperThumbs,
            },
        });
    }

    const sliderModalNew = document.querySelectorAll(".slider_modal");

    if (sliderModalNew.length) {
        sliderModalNew.forEach((slider) => {
            const sliderClass = slider.querySelector('.mySwiper_slider_modal');
            const nextBtn = slider.querySelector('.arrow_btn.next');
            const prevBtn = slider.querySelector('.arrow_btn.prev');
            const pagination = slider.querySelector('.swiper-pagination-slider_modal');

            if (!sliderClass) return;

            const modalSwiper = new Swiper(sliderClass, {
                slidesPerView: 1,
                spaceBetween: 12,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                pagination: {
                    el: pagination,
                    clickable: true,
                }
            });
        });
    }

    const galleryContainer = document.querySelector('.gallery-container');

    if(galleryContainer){
        let galleryThumbs = new Swiper(".gallery-thumbs", {
            slidesPerView: 'auto',
            direction: 'vertical',
            spaceBetween: 12,
            loop: true,
        });

        let galleryMain = new Swiper(".gallery-main", {
            loop: true,
            pagination: {
                el: '.swiper-pagination-gal',
                clickable: true,
            },
            navigation: {
                nextEl: '.gallery-main .next',
                prevEl: '.gallery-main .prev',
            },
            effect: 'fade',
                fadeEffect: {
                crossFade: true
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });

        // galleryMain.on('slideChangeTransitionStart', function() {
        //     galleryThumbs.slideTo(galleryMain.activeIndex);
        // });

        // galleryThumbs.on('transitionStart', function(){
        //     galleryMain.slideTo(galleryThumbs.activeIndex);
        // });


        const mySwiperModal = new Swiper('.mySwiper_modal', {
            loop: true,
            navigation: {
                nextEl: '.mySwiper_modal .swiper-button-next',
                prevEl: '.mySwiper_modal .swiper-button-prev',
            },
        });

        const mainGalleryImages = document.querySelectorAll('.gallery-main .swiper-slide img');

        mainGalleryImages.forEach((image, index) => {
            image.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('showTabModal'));
                modal.show();

                mySwiperModal.slideToLoop(index);
            });
        });
    }

    const colors = document.querySelectorAll('.product_detals .colors .color, #filterModal .colors .color');

    if(colors.length) {
        colors.forEach(color => {
            color.addEventListener('click', () => {
                colors.forEach(c => c.classList.remove('active'));
                color.classList.add('active');
            });
        });
    }

    const productDetalsBlock = document.querySelector('.product_detals');

    if(productDetalsBlock){

        const state = {
            size: null,
            mechanism: null,
            additional: [],
            angle: null
        };

        function formatPrice(price) {
            return price.toLocaleString('ru-RU') + ' ₽';
        }

        function calculateTotal() {
            const totalPrice = document.querySelector('.prices .current'); 

            console.log(totalPrice)

            let total = +totalPrice.getAttribute('data-current');

            if (state.size) {
                total += state.size.price;
            }
            if (state.mechanism) {
                total += state.mechanism.price;
            }
            state.additional.forEach(item => total += item.price);

            return total;
        }

        function togglePricesClass(classPrice) {
            const prices = document.querySelector(classPrice);
            if (!prices) return;

            if (state.size || state.mechanism || state.additional.length > 0) {
                prices.classList.add('has-options');
            } else {
                prices.classList.remove('has-options');
            }
        }



        function updatePriceTable() {
            const priceBreakdown = document.getElementById('priceBreakdown');
            const priceBreakdown2 = document.getElementById('priceBreakdown2');
            const totalPrice = document.querySelector('.product_detals .prices .current'); 
            const totalPrice2 = document.querySelector('.fixed_product .prices .current'); 

            if (!priceBreakdown || !totalPrice) return;

            let html = '';

            if (state.size) {
                html += `
                    <div class="d-flex">
                        <div class="name">Размер ${state.size.name}</div>
                        <div class="price">${formatPrice(state.size.price)}</div>
                    </div>
                `;
            }

            if (state.mechanism) {
                html += `
                    <div class="d-flex">
                        <div class="name">${state.mechanism.name}</div>
                        <div class="price">+${formatPrice(state.mechanism.price)}</div>
                    </div>
                `;
            }

            state.additional.forEach(item => {
                html += `
                    <div class="d-flex">
                        <div class="name">${item.name}</div>
                        <div class="price">+${formatPrice(item.price)}</div>
                    </div>
                `;
            });

            priceBreakdown.innerHTML = html;
            priceBreakdown2.innerHTML = html;

            totalPrice.textContent = formatPrice(calculateTotal());
            totalPrice2.textContent = formatPrice(calculateTotal());

            togglePricesClass('.product_detals .prices');
            togglePricesClass('.fixed_product .prices');
        }


        function updateAccordionTitles() {
            const sizeTitle = document.getElementById('sizeTitle');

            if (state.size) {
                sizeTitle.innerHTML = `Размер <span class="accordion-title-update">${state.size.name}</span>`;
            } else {
                sizeTitle.innerHTML = 'Размер';
            }

            const mechanismTitle = document.getElementById('mechanismTitle');
            if (state.mechanism) {
                mechanismTitle.innerHTML = `Механизмы <span class="accordion-title-update">${state.mechanism.name}</span>`;
            } else {
                mechanismTitle.innerHTML = 'Механизмы';
            }

            const additionalTitle = document.getElementById('additionalTitle');
            if (state.additional.length > 0) {
                const count = state.additional.length;
                additionalTitle.innerHTML = `Дополнительно <span class="accordion-title-update">+${count}</span>`;
            } else {
                additionalTitle.innerHTML = 'Дополнительно';
            }

            const angleTitle = document.getElementById('angleTitle');
            if (state.angle) {
                angleTitle.innerHTML = `Угол кровати <span class="accordion-title-update">${state.angle}</span>`;
            } else {
                angleTitle.innerHTML = 'Угол кровати';
            }
        }


        const sizes = document.querySelectorAll('.product_detals .size_block_item');
        if (sizes.length) {
            sizes.forEach(size => {
                size.addEventListener('click', () => {
                    if (size.classList.contains('disabled')) return;
                    
                    sizes.forEach(c => c.classList.remove('active'));
                    size.classList.add('active');
                    
                    state.size = {
                        name: size.dataset.size,
                        price: parseInt(size.dataset.price)
                    };
                    
                    updateAccordionTitles();
                    updatePriceTable();
                });
            });
        }

        const params = document.querySelectorAll('.product_detals .param_block_item');
        if (params.length) {
            params.forEach(param => {
                param.addEventListener('click', () => {
                    params.forEach(c => c.classList.remove('active'));
                    param.classList.add('active');
                    
                    state.angle = param.dataset.angle;
                    
                    updateAccordionTitles();
                });
            });
        }

        document.querySelectorAll('.d-flex.flex-column[data-group="mechanism"]').forEach(group => {
            const mods = group.querySelectorAll('.mod:not(.disabled)');
            mods.forEach(mod => {
                const radio = mod.querySelector('.radio');
                if (!radio) return;
                
                mod.addEventListener('click', () => {
                    const wasActive = mod.classList.contains('active');
                    
                    mods.forEach(m => m.classList.remove('active'));
                    
                    if (!wasActive) {
                        mod.classList.add('active');
                        
                        state.mechanism = {
                            name: mod.dataset.name,
                            price: parseInt(mod.dataset.price)
                        };
                    } else {
                        state.mechanism = null;
                    }
                    
                    updateAccordionTitles();
                    updatePriceTable();
                });
            });
        });

        document.querySelectorAll('.d-flex.flex-column[data-group="additional"] .mod .checkbox').forEach(box => {
            const mod = box.closest('.mod');
            if (!mod.classList.contains('disabled')) {
                mod.addEventListener('click', () => {
                    mod.classList.toggle('active');
                    
                    const item = {
                        name: mod.dataset.name,
                        price: parseInt(mod.dataset.price)
                    };
                    
                    if (mod.classList.contains('active')) {
                        state.additional.push(item);
                    } else {
                        state.additional = state.additional.filter(
                            existing => existing.name !== item.name
                        );
                    }
                    
                    updateAccordionTitles();
                    updatePriceTable();
                });
            }
        });

        updateAccordionTitles();
        //updatePriceTable();

        function priceHandler(selector, selectorId){
            selector.addEventListener('click', () => {
                if (!selector.classList.contains('has-options')) return; 

                const priceTable = selectorId;
                if (priceTable) {
                    priceTable.classList.toggle('open'); 
                }
            });
        }

        const pricesBlock = document.querySelector('.product_detals .prices');

        if (pricesBlock) {
            priceHandler(pricesBlock, document.getElementById('priceBreakdown'));
        }

        const pricesBlock2 = document.querySelector('.fixed_product .prices');

        if (pricesBlock2) {
            priceHandler(pricesBlock2, document.getElementById('priceBreakdown2'));
        }

        const modal = document.getElementById('accordionModal');
        const modalTitle = modal.querySelector('.accordion-modal__title');
        const modalBody = modal.querySelector('.accordion-modal__body');
        const modalClose = modal.querySelector('.accordion-modal__close');

        document.querySelectorAll('.product_detals .accordion-button').forEach(btn => {
            btn.addEventListener('click', e => {
            if (window.innerWidth <= 768) { 
                e.preventDefault();

                let title = btn.innerText.trim();
                let targetId = btn.getAttribute('data-bs-target');
                let content = document.querySelector(targetId).querySelector('.accordion-inner').innerHTML;

                modalTitle.textContent = title;
                modalBody.innerHTML = content;

                modal.classList.add('active');
            }
          });
        });

        modalBody.addEventListener('click', e => {
            const item = e.target.closest('[data-type]');
            if (!item || item.classList.contains('disabled')) return;

            const type = item.dataset.type;

            // снять active только у элементов этого же типа
            modalBody.querySelectorAll(`[data-type="${type}"]`).forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // обновляем state
            if (type === 'size') {
                state.size = {
                    name: item.dataset.size,
                    price: parseInt(item.dataset.price)
                };
            } else if (type === 'mechanism') {
                state.mechanism = {
                    name: item.dataset.name,
                    price: parseInt(item.dataset.price)
                };
            } else if (type === 'angle') {
                state.angle = item.dataset.angle; 
            } else if (type === 'additional') {
                if (item.classList.contains('active')) {
                    state.additional.push({
                        name: item.dataset.name,
                        price: parseInt(item.dataset.price)
                    });
                } else {
                    state.additional = state.additional.filter(a => a.name !== item.dataset.additional);
                }
            }

            updateAccordionTitles();
            updatePriceTable();
        });



        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');

            const opened = document.querySelector('.accordion-collapse.show');
            const openedItem = document.querySelector('.accordion-item.active');

            if (opened) {
                opened.classList.remove('show');
                openedItem.classList.remove('active');
                const btn = document.querySelector(`[data-bs-target="#${opened.id}"]`);
                if (btn) btn.classList.add('collapsed');
            }
        });

    }

    const reviewsSwiper = document.querySelector('.reviewsSwiper');

    if(reviewsSwiper){
        let reviewsMain = new Swiper(".reviewsSwiper", {
            slidesPerView: 'auto',
            spaceBetween: 8,
            loop: true,
            centeredSlides: true,
            roundLengths: true,
            navigation: {
                nextEl: ".reviewsSwiper .arrow_btn.next",
                prevEl: ".reviewsSwiper .arrow_btn.prev",
            },
            breakpoints: {
                0: { slidesPerView: 'auto', centeredSlides: false },
                992: { slidesPerView: 'auto' }
            }
        });
    }

    let reviewCardSliderSwiper = null;
        
    function initreviewCardSwiper() {
        const reviewCardCwiper = document.querySelector(".review-card-swiper");

        if(!reviewCardCwiper) return;

        if (window.innerWidth <= 767) {
            if (!reviewCardSliderSwiper) {
                reviewCardSliderSwiper = new Swiper('.review-card-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    loop: true
                });
            }
        } else {
            if (reviewCardSliderSwiper) {
                reviewCardSliderSwiper.destroy(true, true);
                reviewCardSliderSwiper = null;
            }
        }
    }

    window.addEventListener('load', initreviewCardSwiper);
    
    window.addEventListener('resize', debounce(initreviewCardSwiper, 250));


    const minRange = document.getElementById('minRange');
    const maxRange = document.getElementById('maxRange');

    if(minRange && maxRange) {
        const sliderRange = document.getElementById('sliderRange');
        const minValue = document.getElementById('minValue');
        const maxValue = document.getElementById('maxValue');
        
        function formatPrice(price) {
            return new Intl.NumberFormat('ru-RU').format(price);
        }
        
        function updateSlider() {
            const min = parseInt(minRange.value);
            const max = parseInt(maxRange.value);
            const minPercent = ((min - 7500) / (65500 - 7500)) * 100;
            const maxPercent = ((max - 7500) / (65500 - 7500)) * 100;
            
            if (min >= max) {
                if (minRange === document.activeElement) {
                    minRange.value = max - 500;
                } else {
                    maxRange.value = min + 500;
                }
                updateSlider();
                return;
            }
            
            sliderRange.style.left = minPercent + '%';
            sliderRange.style.width = (maxPercent - minPercent) + '%';
            
            minValue.textContent = formatPrice(min);
            maxValue.textContent = formatPrice(max);
        }
        
        minRange.addEventListener('input', updateSlider);
        maxRange.addEventListener('input', updateSlider);

        updateSlider();
    }

    const soartList = document.querySelectorAll('.soart_list a');
    if (soartList.length) {
        soartList.forEach(soart => {
            soart.addEventListener('click', (e) => {
                e.preventDefault();
                soartList.forEach(c => c.classList.remove('active'));
                soart.classList.add('active');
            });
        });
    }

    const soartBtnMobile = document.querySelector('.soart_btn_mobile');

    if(soartBtnMobile){
        const modalSoart = document.querySelector('.modal_soart');

        soartBtnMobile.addEventListener('click', function(){
            modalSoart.classList.add('opened');
        });

        modalSoart.querySelector('.soart_title').addEventListener('click', function(){
            modalSoart.classList.remove('opened');
        });
    }

    document.addEventListener("scroll", function () {
        const block = document.querySelector(".fixed_product"); 
        if(block){
            const triggerPoint = 400; 

            if (window.scrollY > triggerPoint) {
                block.classList.add("opened");
            } else {
                block.classList.remove("opened");
            }
        }
    });

    if(document.querySelector(".up_btn")){
        document.querySelector(".up_btn").addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const buyBtn = document.querySelectorAll(".buy_btn.btn_button");
    if(buyBtn.length){
        buyBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                const toast = document.getElementById("cartToast");
                toast.classList.add("show");

                setTimeout(() => {
                    toast.classList.remove("show");
                }, 2000);
            });
        });
    }

    

});



// Скрипт для поиска в модальном окне
document.addEventListener('DOMContentLoaded', function() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.querySelector('.search_input');
    const recentResult = document.querySelector('.recent_result');
    const emptyResult = document.querySelector('.empty_result');
    const listProductsModal = document.querySelector('.list_products_modal');
    const allResult = document.querySelector('.all_rezult');
    
    // Имитация данных продуктов для поиска
    const mockProducts = [
        {
            id: 1,
            name: 'Стул Malevich',
            age: 'от 2 до 7 лет',
            currentPrice: '16 700 ₽',
            oldPrice: '24 000 ₽',
            image: 'files/prod.jpg',
            hoverImage: 'files/prod-hov.jpg',
            colors: ['#3983a0', '#b792c5', '#e9e2d2', '#55abc4', '#9c4a3e', '#f1c73e', '#97b777', '#44659b']
        },
        {
            id: 2,
            name: 'Детская кровать',
            age: 'от 3 до 10 лет',
            currentPrice: '25 500 ₽',
            oldPrice: '30 000 ₽',
            image: 'files/prod.jpg',
            hoverImage: 'files/prod-hov.jpg',
            colors: ['#3983a0', '#b792c5', '#e9e2d2']
        },
        {
            id: 3,
            name: 'Детский стул',
            age: 'от 1 до 5 лет',
            currentPrice: '8 900 ₽',
            oldPrice: '12 000 ₽',
            image: 'files/prod.jpg',
            hoverImage: 'files/prod-hov.jpg',
            colors: ['#55abc4', '#9c4a3e', '#f1c73e', '#97b777']
        }
    ];

    // Получение недавних поисков из localStorage
    function getRecentSearches() {
        const searches = localStorage.getItem('recentSearches');
        return searches ? JSON.parse(searches) : ['Детская кровать', 'Стул', 'Детский стул'];
    }

    // Сохранение поиска в localStorage
    function saveRecentSearch(query) {
        let searches = getRecentSearches();
        
        searches = searches.filter(search => search.toLowerCase() !== query.toLowerCase());
        searches.unshift(query);
        searches = searches.slice(0, 10);
        
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        updateRecentSearches();
    }

    // Обновление списка недавних поисков
    function updateRecentSearches() {
        const searches = getRecentSearches();
        recentResult.innerHTML = '';
        
        searches.forEach(search => {
            const item = document.createElement('div');
            item.className = 'item d-flex align-items-center';
            item.innerHTML = `
                <a href="#" class="d-flex align-items-center search-recent-link">
                    <i class="bi bi-recent"></i>${search}
                </a>
                <div class="delete" data-search="${search}">
                    <i class="bi bi-x"></i>
                </div>
            `;
            recentResult.appendChild(item);
        });

        document.querySelectorAll('.search-recent-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const query = this.textContent.trim();
                searchInput.value = query;
                performSearch(query);
            });
        });

        document.querySelectorAll('.delete').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function() {
                const searchToDelete = this.dataset.search;
                deleteRecentSearch(searchToDelete);
            });
        });
    }

    function deleteRecentSearch(searchQuery) {
        let searches = getRecentSearches();
        searches = searches.filter(search => search !== searchQuery);
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        updateRecentSearches();
    }

    // Создание HTML для продукта
    function createProductHTML(product) {
        const colorsHTML = product.colors.map(color => 
            `<div class="color rounded-circle" style="background: ${color};"></div>`
        ).join('');
        
        const moreColors = product.colors.length > 8 ? `<div class="more small text-muted">+${product.colors.length - 8}</div>` : '';

        return `
            <div class="card product_item border-0">
                <div class="image">
                    <div class="age">${product.age}</div>
                    <a href="#">
                        <img src="${product.image}" class="card-img-top" alt="">
                        <img src="${product.hoverImage}" class="card-img-top hov" alt="">
                    </a>
                </div>
                <div class="card-body">
                    <div class="colors d-flex flex-wrap align-items-center">
                        ${colorsHTML}
                        ${moreColors}
                    </div>
                    <div class="name mb-1">
                        <a href="#" class="text-decoration-none">${product.name}</a>
                        <div class="favorite-add"></div>
                    </div>
                    <div class="price d-flex gap-2 align-items-center">
                        <span class="current text-dark">${product.currentPrice}</span>
                        ${product.oldPrice ? `<span class="old text-muted text-decoration-line-through">${product.oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function performSearch(query) {
        if (!query.trim()) {
            showInitialState();
            return;
        }

        const filteredProducts = mockProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            showEmptyResult();
        } else {
            showSearchResults(filteredProducts, query);
        }
    }

    function showInitialState() {
        recentResult.style.display = 'flex';
        emptyResult.style.display = 'none';
        listProductsModal.style.display = 'none';
        allResult.style.display = 'none';
    }

    function showEmptyResult() {
        recentResult.style.display = 'none';
        emptyResult.style.display = 'block';
        listProductsModal.style.display = 'none';
        allResult.style.display = 'none';
    }

    function showSearchResults(products, query) {
        recentResult.style.display = 'none';
        emptyResult.style.display = 'none';
        listProductsModal.style.display = 'block';
        allResult.style.display = 'block';

        const displayProducts = products.slice(0, 6);
        listProductsModal.innerHTML = displayProducts.map(product => createProductHTML(product)).join('');

        const allResultLink = allResult.querySelector('a');
        if (allResultLink) {
            allResultLink.href = `/search?q=${encodeURIComponent(query)}`;
            allResultLink.textContent = `К результату поиска (${products.length})`;
        }

        saveRecentSearch(query);
    }

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value;
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300); 
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        }
    });

    searchModal.addEventListener('shown.bs.modal', function() {
        searchInput.focus();
        if (!searchInput.value.trim()) {
            showInitialState();
            updateRecentSearches();
        }
    });

    searchModal.addEventListener('hidden.bs.modal', function() {
        searchInput.value = '';
        showInitialState();
    });

    updateRecentSearches();
    showInitialState();

    document.addEventListener('click', function(e) {
        if (e.target.closest('.all_rezult a')) {
            const query = searchInput.value.trim();
            if (query) {
                saveRecentSearch(query);
            }
        }
    });


});


$(function() {

    $('.phone-input input').on('blur', function() {
        let phoneWrapper = $(this).parents('.field'),
            thisNumber = $(this).val().split(''),
            lastIndex = thisNumber.length - 1,
            lastItem = thisNumber[lastIndex];
        if (isNaN(lastItem)) {
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Введите номер телефона полностью </div>');
            }
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.removeClass('error');
            phoneWrapper.find('.empty_number').remove();
        }
    });

    $('.field input').on('input', function() {
        let phoneWrapper = $(this).parents('.field'),
            thisNumber = $(this).val();
        if (thisNumber && phoneWrapper.hasClass('error')) {
            phoneWrapper.find('.error_text_r').remove();
        }
    });

    $('input,textarea').on('blur', function() {
        if ($(this).parents('.field').hasClass('error')) {
            $(this).parents('.field').removeClass('error');
            $(this).parents('.field').find('.error_text').remove();
        }
    })

    $('input[type="checkbox"]').on('change', function(event) {
        let fieldRequired = $(this).closest('.field.required');

        if (fieldRequired.length > 0) {
            if (!$(this).is(":checked")) {
                fieldRequired.addClass('no_checked');
            } else {
                fieldRequired.removeClass('no_checked error');
                fieldRequired.find('.error_text').remove();
            }
        }
    });

    $('.email-input input').on('blur', function() {
        let emailWrapper = $(this).parents('.field');
        let email = $(this).val();
        // Строгая проверка e-mail
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email.length > 0 && !emailRegex.test(email)) {
            emailWrapper.addClass('incorrect-phone');

            if (!emailWrapper.find('.empty_number').length) {
                emailWrapper.append('<div class="error_text empty_number">Вы ввели некорректный e-mail</div>');
            }
        } else {
            emailWrapper.removeClass('incorrect-phone error');
            emailWrapper.find('.empty_number').remove();
        }
    });

    $('.field select').on('change', function() {
        var field = $(this).closest('.field');

        // При выборе значения удаляем ошибку
        if ($(this).val() && $(this).val() !== '' && $(this).val() !== '0' && $(this).val() !== 'default') {
            field.removeClass('error');
            field.find('.jq-selectbox').removeClass('error');
            field.find('.error_text').remove();
        }
    });

    $('.form_button').on('click', function(e) {
        let form = $(this).parents('form');
        let hasErrors = false;

        $(this).parents('form').find('.field').each(function() {
            // Валидация текстовых полей
            var valueInput = $(this).find('input').val();
            if ($(this).hasClass('required') && valueInput == '') {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text error_text_r">Обязательное поле</div>');
                }
            }

            // Валидация textarea
            var valueTextarea = $(this).find('textarea').val();
            if ($(this).hasClass('required') && valueTextarea == '') {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text error_text_r">Обязательное поле</div>');
                }
            }

            // Валидация чекбоксов
            if ($(this).hasClass('required') && $(this).find('input[type="checkbox"]').length) {
                if (!$(this).find('input[type="checkbox"]').is(":checked")) {
                    $(this).addClass('error no_checked');
                    if (!$(this).find('.error_text').length) {
                        $(this).append('<div class="error_text error_text_r">Обязательное поле</div>');
                    }
                } else {
                    $(this).removeClass('error no_checked');
                    $(this).find('.error_text').remove();
                }
            }

            // Валидация селектов
            if ($(this).hasClass('required') && $(this).find('select').length) {
                var selectValue = $(this).find('select').val();
                // Проверяем, выбрано ли какое-то значение (не пустое и не placeholder)
                if (!selectValue || selectValue === '' || selectValue === '0' || selectValue === 'default') {
                    $(this).addClass('error');
                    if (!$(this).find('.error_text').length) {
                        $(this).append('<div class="error_text error_text_r">Обязательное поле</div>');
                    }
                } else {
                    $(this).removeClass('error');
                    $(this).find('.error_text').remove();
                }
            }
        });

        // --- Проверка паролей ---
        let passwordField = form.find('input[placeholder="Новый пароль"]');
        let confirmField = form.find('input[placeholder="Подтверждение пароля"]');

        if (passwordField.length > 0) {
            let password = passwordField.val().trim();
            let confirmPassword = confirmField.val().trim();

            // длина пароля
            if (password.length < 6) {
                let parent = passwordField.closest('.field');
                parent.addClass('error');
                parent.find('.error_text').remove();
                parent.append('<div class="error_text">Пароль должен быть не менее 6 символов</div>');
                hasErrors = true;
            }

            // совпадение паролей
            if (password !== confirmPassword) {
                let parent = confirmField.closest('.field');
                parent.addClass('error');
                parent.find('.error_text').remove();
                parent.append('<div class="error_text">Пароли не совпадают</div>');
                hasErrors = true;
            }
        }

        // if ($(this).closest('form').find('.field').hasClass('incorrect-phone') || $(this).closest('form').find('.field').hasClass('error')) {
        //     e.preventDefault();
        // } else {
        //     e.preventDefault(); // пока для теста

        //     console.log("Форма прошла проверку, можно отправлять");
        // }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const stItems = document.querySelectorAll('.story-trigger');

    if(!stItems.length) return;

    let swiper;
    let currentStoryIndex = 0;
    let storyTimeout;
    let isPaused = false;
    let touchStartY = 0;
    let touchEndY = 0;

    const storiesData = {
        currentCategory: 0,
        currentStory: 0
    };

    // Получение длительности истории из атрибута data-duration (в миллисекундах)
    function getStoryDuration(storyElement) {
        const duration = storyElement.getAttribute('data-duration');
        return duration ? parseInt(duration) : 5000; // По умолчанию 5 секунд
    }

    function stopAllStories() {
        clearTimeout(storyTimeout);

        const allSlides = document.querySelectorAll('.story-slide');
        allSlides.forEach(slide => {
            const fills = slide.querySelectorAll('.progress-segment-fill');
            fills.forEach(fill => {
                fill.style.animation = 'none';
            });
        });
    }

    function initSwiper(initialSlide = 0) {
        if (swiper) {
            swiper.destroy(true, true);
        }

        swiper = new Swiper('.storiesSwiper', {
            direction: 'horizontal',
            initialSlide: initialSlide,
            speed: 1000,
            allowTouchMove: true,
            centeredSlides: true,
            roundLengths: true,
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop: false,
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              561: {
                slidesPerView: 'auto',
                spaceBetween: 40,
              }
            },
            on: {
                init: function() {
                    storiesData.currentCategory = this.activeIndex;
                    storiesData.currentStory = 0;
                    resetCategoryStories(this.activeIndex);
                    showStory(this.activeIndex, 0);
                },
                slideChangeTransitionStart: function() {
                    stopAllStories();
                    clearTimeout(storyTimeout);
                },
                slideChangeTransitionEnd: function() {
                    storiesData.currentCategory = this.activeIndex;
                    storiesData.currentStory = 0;
                    resetCategoryStories(this.activeIndex);
                    showStory(this.activeIndex, 0);
                }
            }
        });
    }

    function resetCategoryStories(categoryIndex) {
        const slide = document.querySelectorAll('.story-slide')[categoryIndex];
        if (!slide) return;

        const stories = slide.querySelectorAll('.story-item');
        stories.forEach((story, index) => {
            story.classList.toggle('active', index === 0);
        });

        const segments = slide.querySelectorAll('.progress-segment');
        segments.forEach((segment, index) => {
            segment.classList.remove('active', 'completed');
            const fill = segment.querySelector('.progress-segment-fill');
            fill.style.animation = 'none';
            fill.offsetHeight;

            if (index === 0) {
                segment.classList.add('active');
            }
        });
    }

    function showStory(categoryIndex, storyIndex) {
        clearTimeout(storyTimeout);

        const slide = document.querySelectorAll('.story-slide')[categoryIndex];
        if (!slide) return;

        const stories = slide.querySelectorAll('.story-item');
        const segments = slide.querySelectorAll('.progress-segment');

        stories.forEach(story => story.classList.remove('active'));
        if (stories[storyIndex]) {
            stories[storyIndex].classList.add('active');
        }

        // Получаем длительность текущей истории
        const currentStory = stories[storyIndex];
        const duration = getStoryDuration(currentStory);
        const durationInSeconds = duration / 1000;

        segments.forEach((segment, index) => {
            const fill = segment.querySelector('.progress-segment-fill');
            segment.classList.remove('active', 'completed');
            fill.style.animation = 'none';
            fill.offsetHeight;

            if (index < storyIndex) {
                segment.classList.add('completed');
            } else if (index === storyIndex) {
                segment.classList.add('active');
                fill.style.animation = `progressFill ${durationInSeconds}s linear forwards`;
            }
        });

        storyTimeout = setTimeout(() => {
            nextStory();
        }, duration);
    }

    function nextStory() {
        const slide = document.querySelectorAll('.story-slide')[storiesData.currentCategory];
        const totalStories = slide.querySelectorAll('.story-item').length;

        if (storiesData.currentStory < totalStories - 1) {
            storiesData.currentStory++;
            showStory(storiesData.currentCategory, storiesData.currentStory);
        } else {
            if (swiper.isEnd) {
                closeStories();
            } else {
                swiper.slideNext();
            }
        }
    }

    function prevStory() {
        if (storiesData.currentStory > 0) {
            storiesData.currentStory--;
            showStory(storiesData.currentCategory, storiesData.currentStory);
        } else {
            if (!swiper.isBeginning) {
                swiper.slidePrev();
                setTimeout(() => {
                    const slide = document.querySelectorAll('.story-slide')[storiesData.currentCategory];
                    const totalStories = slide.querySelectorAll('.story-item').length;
                    storiesData.currentStory = totalStories - 1;
                    showStory(storiesData.currentCategory, storiesData.currentStory);
                }, 100);
            }
        }
    }

    function openStories(categoryIndex) {
        const modal = document.getElementById('storiesModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        storiesData.currentCategory = categoryIndex;
        storiesData.currentStory = 0;

        initSwiper(categoryIndex);
        showStory(categoryIndex, 0);
    }

    function closeStories() {
        const modal = document.getElementById('storiesModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        clearTimeout(storyTimeout);

        if (swiper) {
            swiper.destroy(true, true);
        }
    }

    function pauseStory() {
        isPaused = true;
        clearTimeout(storyTimeout);

        const slide = document.querySelectorAll('.story-slide')[storiesData.currentCategory];
        const activeSegment = slide.querySelector('.progress-segment.active .progress-segment-fill');
        if (activeSegment) {
            activeSegment.style.animationPlayState = 'paused';
        }
    }

    function resumeStory() {
        isPaused = false;

        const slide = document.querySelectorAll('.story-slide')[storiesData.currentCategory];
        const activeSegment = slide.querySelector('.progress-segment.active .progress-segment-fill');
        if (activeSegment) {
            activeSegment.style.animationPlayState = 'running';
        }

        const stories = slide.querySelectorAll('.story-item');
        const currentStory = stories[storiesData.currentStory];
        const duration = getStoryDuration(currentStory);

        storyTimeout = setTimeout(() => {
            nextStory();
        }, duration);
    }

    // Обработка свайпа вверх/вниз для закрытия на мобильных
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeDistance = Math.abs(touchEndY - touchStartY);
        const minSwipeDistance = 100; // Минимальное расстояние для срабатывания свайпа

        if (swipeDistance > minSwipeDistance) {
            // Свайп вверх или вниз
            if (touchEndY < touchStartY || touchEndY > touchStartY) {
                closeStories();
            }
        }
    }

    // Hotkeys
    function handleKeyDown(e) {
        const modal = document.getElementById('storiesModal');
        if (!modal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeStories();
                break;
            case 'ArrowLeft':
                prevStory();
                break;
            case 'ArrowRight':
                nextStory();
                break;
        }
    }

    const closeSt = document.querySelector('.close_stories');
    closeSt.addEventListener('click', closeStories);

    // Обработчики событий
    document.querySelectorAll('.story-trigger').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.preventDefault();
            const categoryIndex = parseInt(trigger.dataset.category);
            openStories(categoryIndex);
        });
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('close-stories')) {
            closeStories();
        }
        if (e.target.classList.contains('story-nav-prev')) {
            prevStory();
        }
        if (e.target.classList.contains('story-nav-next')) {
            nextStory();
        }
    });

    document.addEventListener('mousedown', pauseStory);
    document.addEventListener('mouseup', resumeStory);

    // Hotkeys
    document.addEventListener('keydown', handleKeyDown);

    // Touch события для свайпа
    const modal = document.getElementById('storiesModal');
    modal.addEventListener('touchstart', handleTouchStart, { passive: true });
    modal.addEventListener('touchend', handleTouchEnd, { passive: true });
});