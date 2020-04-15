$(document).ready(function() {
    /*
        slider on first banner
     */
    var mySwiper = new Swiper ('.collection-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        speed: 1000,
        longSwipes: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                speed: 800
            }
        }
    });

    /*
        slider in tabs products
     */
    var productSwipers = [];
    $('.products-tabs-swiper').each(function(i) {
        console.log(i);
        var itemSlider = $(this);
        productSwipers[i] = new Swiper(itemSlider, {
            speed: 600,
            spaceBetween: 0,
            navigation: {
                nextEl: $(this).next('.products-swiper-navigation').find('.swiper-button-next'),
                prevEl: $(this).next('.products-swiper-navigation').find('.swiper-button-prev'),
            },
            loop: true,
            slidesPerView: 4,
            observer: true,
            observeParents: true,
            breakpoints: {
                1200: {
                    slidesPerView: 4
                },
                992: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2
                },
                320: {
                    slidesPerView: 1
                }
            }
        });
    });

    /*
        init tabs products scroll
     */
    var instance = $('.products-tabs-caption').overlayScrollbars ({
        className: "os-theme-dark",
    }).overlayScrollbars();

    /*
        init actions tabs products
     */
    $('.products-tabs-caption').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.main-products-tabs').find('.products-tabs-grid').find('.products-tabs-item').removeClass('active').eq($(this).index()).addClass('active');
        var wrapper = $(this).closest('.products-tabs-caption').get()[0];

        var tabsArray = Array.isArray(instance);
        if(tabsArray) {
            instance.forEach(function (v, i) {
                var tmp = $(v.getElements('target')).get()[0];
                if (tmp === wrapper) {
                    v.scroll($(wrapper).find('.tabs-caption-item.active'), 400);
                }
            });
        } else {
            instance.scroll($(wrapper).find('.tabs-caption-item.active'), 400);
        }
    });

    /*
        toggle active size products
     */
    $('.products-size-grid').on('click', '.products-size-item:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    /*
        open/close search block
     */
    $("#open-search").click(function() {
        $(".layout-bg, .search-block").addClass('show');
    });
    $(".close-search-block").click(function() {
        $(".layout-bg, .search-block, .search-form-result").removeClass('show');
        $(".search-form-input").val("");
    });
    $(document).on('input', '.search-form-input', function () {
        var valSearch = $(this).val();

        if (valSearch !== '') {
            $('.search-form-result').addClass('show');
        } else {
            $('.search-form-result').removeClass('show');
        }
    });

    /*
        open/close mobile menu
     */
    $('.burger').click(function() {
        $('.header-menu.mobile-menu').addClass('open');
        $('.layout-bg').addClass('show');
        bodyScrollLock.disableBodyScroll(document.querySelector(".header-menu.mobile-menu"));
    });
    $('.close-mobile-menu').click(function() {
        $('.header-menu.mobile-menu').removeClass('open');
        $('.layout-bg').removeClass('show');
        bodyScrollLock.enableBodyScroll(document.querySelector(".header-menu.mobile-menu"));
    });

    /*
        action on click to bg - close search or mobile menu
     */
    $('.layout-bg').click(function() {
        $(this).removeClass('show');
        if($('.search-block').hasClass('show')) {
            $('.search-block, .search-form-result').removeClass('show');
            $(".search-form-input").val("");
        }
        if($('.header-menu.mobile-menu').hasClass('open')) {
            $('.header-menu.mobile-menu').removeClass('open');
            bodyScrollLock.enableBodyScroll(document.querySelector(".header-menu.mobile-menu"));
        }
    });

    /*
        animation header on scroll
     */
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if  (scroll > 5) {
            $('.header-section').addClass('on-scroll');
        } else {
            $('.header-section').removeClass('on-scroll');
        }
    });

    /*
        modal added to cart
     */
    $('.add-cart').click(function() {
        $('.popup-added').addClass('show-modal');
        return false;
    });
    $('.actions-continue').click(function() {
        $('.popup-added').removeClass('show-modal');
        return false;
    });
    $(document).click(function (e) {
        var div = $(".popup-content");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.popup-added').removeClass('show-modal');
        }
    });

    /*
        show/hide large catalog
     */
    $('.full-catalog-link').mouseenter(function() {
        $('header').addClass('open-catalog');
    }).mouseleave(function() {
        $('header').removeClass('open-catalog');
    });
});
