$(document).ready(function() {
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
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        breakpoints: {
            576: {
                speed: 800
            }
        }
    });


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

    var instance = $('.products-tabs-caption').overlayScrollbars ({
        className: "os-theme-dark",
    }).overlayScrollbars();

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

    $('.products-size-grid').on('click', '.products-size-item:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    /*
        показывать/скрывать результаты введного слова
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

    $('.burger').click(function() {
        $('.header-left .header-menu').addClass('open');
        $('.layout-bg').addClass('show');
        bodyScrollLock.disableBodyScroll(document.querySelector(".header-left .header-menu"));
    });
    $('.close-mobile-menu').click(function() {
        $('.header-left .header-menu').removeClass('open');
        $('.layout-bg').removeClass('show');
        bodyScrollLock.enableBodyScroll(document.querySelector(".header-left .header-menu"));
    });

    $('.layout-bg').click(function() {
        $(".layout-bg").removeClass('show');
        if($('.search-block').hasClass('show')) {
            $('.search-block, .search-form-result').removeClass('show');
            $(".search-form-input").val("");
        }
        if($('.header-left .header-menu').hasClass('open')) {
            $('.header-left .header-menu').removeClass('open');
            bodyScrollLock.enableBodyScroll(document.querySelector(".header-left .header-menu"));
        }
    });

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if  (scroll > 5) {
            $('.header-section').addClass('on-scroll');
        } else {
            $('.header-section').removeClass('on-scroll');
        }
    });


});
