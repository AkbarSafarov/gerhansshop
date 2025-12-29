document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const html = document.documentElement;
    const overflowHidden = 'oveflowHidden';
    const discountBanner = document.querySelector('.discount_banner');
    const header = document.querySelector('.header');
    const slider = document.querySelector('.slider_top_block');
    const menuHeader = document.querySelector('.menu-header');
    const tmenuOffset = header.offsetTop;

    let lastScrollY = window.scrollY; 
    let isScrollingUp = false; 

    const menuItems = document.querySelectorAll('.menu_header .name li');
    const images = document.querySelectorAll('.menu_header .img li');
    
    if(menuItems.length) {
        menuItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                images.forEach(img => {
                    img.style.display = 'none';
                });
                
                if (images[index]) {
                    images[index].style.display = 'list-item';
                }
            });
        });
    }

    const sliderMain = document.querySelector('.slider_main');

    if(sliderMain){
        const menuSwiper = new Swiper('.menu-swiper', {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.menu-button-next',
                prevEl: '.menu-button-prev',
            },
            slideToClickedSlide: true
        });

        const contentSwiper = new Swiper('.content-swiper', {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true
        });

        menuSwiper.on('click', function() {
            const clickedIndex = this.clickedIndex;
            if (clickedIndex !== undefined) {
                const realIdx = this.slides[clickedIndex].getAttribute('data-swiper-slide-index');
                contentSwiper.slideToLoop(parseInt(realIdx));
            }
        });

        menuSwiper.on('slideChange', function() {
            contentSwiper.slideToLoop(this.realIndex);
        });

        contentSwiper.on('slideChange', function() {
            menuSwiper.slideToLoop(this.realIndex);
        });
    }

    const sliderSpes = document.querySelector('.spes_block');

    if(sliderSpes){
        const tabLinks = document.querySelectorAll('.spes_tab_title ul li a');
        const tabBodies = document.querySelectorAll('.tab_body');
        
        tabBodies.forEach(tab => tab.classList.remove('active'));
        tabBodies[0].classList.add('active');
        
        tabLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                tabLinks.forEach(item => item.parentElement.classList.remove('active'));
                tabBodies.forEach(body => body.classList.remove('active'));
                
                this.parentElement.classList.add('active');
                tabBodies[index].classList.add('active');
            });

            initSwiper(index);
        });
        
        function initSwiper(tabIndex) {
            const activeTab = tabBodies[tabIndex];
            const swiperContainer = activeTab.querySelector('.swiper_product');
            
            if (swiperContainer && !swiperContainer.swiper) {
                new Swiper(swiperContainer, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: swiperContainer.closest('.tab_body').querySelector('.swiper-button-next'),
                        prevEl: swiperContainer.closest('.tab_body').querySelector('.swiper-button-prev'),
                    },
                    scrollbar: {
                        el: swiperContainer.closest('.tab_body').querySelector('.swiper-scrollbar'),
                        draggable: true,
                        dragSize: 132, 
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        }
                    }
                });
            }
        }
    }

    const contentSwiperWrap = document.querySelector('.card_image');

    if(contentSwiperWrap){
        const swiperThumbs = new Swiper(".gall-thumb-swiper", {
            spaceBetween: 10,
            slidesPerView: 3,
            
            watchSlidesProgress: true,
        });

        const swiperMain = new Swiper(".gall-swiper", {
            spaceBetween: 0,
            slidesPerView: 1,
            freeMode: true,
            thumbs: {
                swiper: swiperThumbs,
            },
        });

        lightGallery(document.querySelector('.gall-swiper'), {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a'
        });
    }

    let basePrice = 0;
    let totalPrice = 0;

    const basePriceElement = document.querySelector('.cart_top .action_card .current strong');

    if (!basePriceElement) {
        console.error('Элемент с базовой ценой не найден!');
    } else {
        basePrice = parseInt(basePriceElement.textContent.replace(/\s/g, ''));
        
        if (isNaN(basePrice) || basePrice <= 0) {
            console.error('Некорректная базовая цена:', basePriceElement.textContent);
            basePrice = 0;
        } else {
            totalPrice = basePrice;
        }
    }

    const radioBtns = document.querySelectorAll('.select_product .radio_btn');
    const checkBtns = document.querySelectorAll('.chech_product .check_btn');
    const priceElements = document.querySelectorAll('.action_card .current strong');

    if (radioBtns.length === 0) {
        console.warn('Radio кнопки не найдены');
    }

    if (checkBtns.length === 0) {
        console.warn('Checkbox кнопки не найдены');
    }

    if (priceElements.length === 0) {
        console.error('Элементы для отображения цены не найдены!');
    }

    radioBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const product = this.closest('.select_product');
            
            if (!product) {
                console.error('Родительский элемент .select_product не найден');
                return;
            }
            
            const priceElement = product.querySelector('.price');
            
            if (!priceElement) {
                console.error('Элемент цены не найден в продукте');
                return;
            }
            
            const price = parseInt(priceElement.textContent.replace(/\s/g, ''));
            
            if (isNaN(price)) {
                console.error('Некорректная цена продукта:', priceElement.textContent);
                return;
            }
            
            radioBtns.forEach(rb => rb.classList.remove('active'));
            
            this.classList.add('active');
            
            calculateTotal();
        });
    });

    checkBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const product = this.closest('.chech_product');
            
            if (!product) {
                console.error('Родительский элемент .chech_product не найден');
                return;
            }
            
            const priceElement = product.querySelector('.price');
            
            if (!priceElement) {
                console.error('Элемент цены не найден в продукте');
                return;
            }
            
            const price = parseInt(priceElement.textContent.replace(/\s/g, ''));
            
            if (isNaN(price)) {
                console.error('Некорректная цена продукта:', priceElement.textContent);
                return;
            }
            
            this.classList.toggle('active');
            
            calculateTotal();
        });
    });

    function calculateTotal() {
        totalPrice = basePrice;
        
        const activeRadio = document.querySelector('.select_product .radio_btn.active');
        if (activeRadio) {
            const radioProduct = activeRadio.closest('.select_product');
            
            if (radioProduct) {
                const priceElement = radioProduct.querySelector('.price');
                
                if (priceElement) {
                    const radioPrice = parseInt(priceElement.textContent.replace(/\s/g, ''));
                    
                    if (!isNaN(radioPrice)) {
                        totalPrice += radioPrice;
                    } else {
                        console.error('Некорректная цена в radio продукте');
                    }
                }
            }
        }
        
        const activeChecks = document.querySelectorAll('.chech_product .check_btn.active');
        activeChecks.forEach((check) => {
            const checkProduct = check.closest('.chech_product');
            
            if (checkProduct) {
                const priceElement = checkProduct.querySelector('.price');
                
                if (priceElement) {
                    const checkPrice = parseInt(priceElement.textContent.replace(/\s/g, ''));
                    
                    if (!isNaN(checkPrice)) {
                        totalPrice += checkPrice;
                    } else {
                        console.error('Некорректная цена в checkbox продукте');
                    }
                }
            }
        });
        
        updatePriceDisplay();
    }

    function updatePriceDisplay() {
        if (priceElements.length === 0) {
            console.error('Нет элементов для обновления цены');
            return;
        }
        
        priceElements.forEach((el) => {
            if (el) {
                el.textContent = totalPrice.toLocaleString('ru-RU');
            }
        });
    }

    const cartMiniLink = document.querySelector('.cart_mini_link');
    const cartMini = document.querySelector('.cart_mini');
    const qtyBtns = document.querySelectorAll('.qty_btn');
    const removeBtns = document.querySelectorAll('.remove_btn');
    const clearCartBtn = document.querySelector('.clear_cart');
    const qtyMainElement = document.querySelector('.qty_main .qty');
    const totalPriceElement = document.querySelector('.qty_main span');

    if (cartMiniLink && cartMini) {
        cartMiniLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            cartMini.classList.toggle('active');
        });
        
        cartMini.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        document.addEventListener('click', function() {
            cartMini.classList.remove('active');
        });
    }

    qtyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCart = this.closest('.product_cart');
            const input = productCart.querySelector('.qty_input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                input.value = value + 1;
            } else if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            }
            
            updateCartTotal();
        });
    });

    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCart = this.closest('.product_cart');
            productCart.remove();
            updateCartTotal();
        });
    });

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            const cartBody = document.querySelector('.cart_mini_body');
            if (cartBody) {
                cartBody.innerHTML = '';
                updateCartTotal();
            }
        });
    }

    function updateCartTotal() {
        const products = document.querySelectorAll('.product_cart');
        let totalQty = 0;
        let totalPrice = 0;
        
        products.forEach(product => {
            const qty = parseInt(product.querySelector('.qty_input').value);
            const priceText = product.querySelector('.product_price').textContent;
            const price = parseInt(priceText.replace(/\s/g, '').match(/\d+/)[0]);
            
            totalQty += qty;
            totalPrice += price * qty;
        });
        
        if (qtyMainElement) {
            qtyMainElement.textContent = totalQty;
        }
        
        if (totalPriceElement) {
            totalPriceElement.textContent = totalPrice.toLocaleString('ru-RU') + ' ';
        }
    }

    updateCartTotal();


    const menuBtn = document.querySelector('.burger');
    const menuWrapper = document.querySelector('.menu_burger');
    const menuClose = document.querySelector('.menuClose');
    const openedMenu = 'opened';

    if (!menuBtn || !menuWrapper || !menuClose) return;

    menuBtn.addEventListener('click', function() {
        menuWrapper.classList.toggle(openedMenu);
        menuBtn.classList.toggle(openedMenu);
        HTML.classList.toggle(overflowHidden);

        console.log(123)
    });

    menuClose.addEventListener('click', function() {
        menuWrapper.classList.remove(openedMenu);
        menuBtn.classList.remove(openedMenu);
        HTML.classList.remove(overflowHidden);
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.burger') || e.target.closest('.menu_scroll')) return;

        if (menuWrapper.classList.contains(openedMenu)) {
            menuWrapper.classList.remove(openedMenu);
            menuBtn.classList.remove(openedMenu);
            HTML.classList.remove(overflowHidden);
        }
    });

    if (menuWrapper){

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

        handleMenuItems(menuWrapper, false);
    }
});