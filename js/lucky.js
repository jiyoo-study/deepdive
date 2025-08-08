document.addEventListener('DOMContentLoaded', function() {
    new Swiper(".mySwiper", {
        // 슬라이드 너비가 고정되어 있으므로 'auto'로 설정
        slidesPerView: "auto",
        spaceBetween: 32,
        freeMode: true, 
        pagination: {
            clickable: true,
        },
    });
});