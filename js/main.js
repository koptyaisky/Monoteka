$(document).ready(function() {
    var mySwiper = new Swiper ('.collection-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
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
            observeParents: true
            // breakpoints: {
            //     1200: {
            //         slidesPerView: 3
            //     },
            //     1024: {
            //         slidesPerView: 2
            //     },
            //     640: {
            //         slidesPerView: 1
            //     }
            // }
        });
    });

    $('.products-tabs-caption').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.main-products-tabs').find('.products-tabs-grid').find('.products-tabs-item').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('.products-size-grid').on('click', '.products-size-item:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

});
