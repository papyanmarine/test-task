let stars = Array.from(document.querySelectorAll('.product__star svg'));
stars.map((star, index) =>{
    star.addEventListener('click', function () {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('fill');
        }
    })
})

/*old and new price*/

const price={
    oldPrice: '250.00',
    newPrice: '160.00'
}

let oldPrice = document.querySelector('.old-price');
let newPrice = document.querySelector('.new-price');

function updatePrice(element, value) {
    return element.innerHTML += ' ' + value;
}
updatePrice(oldPrice, price.oldPrice);
updatePrice(newPrice, price.newPrice);


const countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();

let x = setInterval(function() {

  let now = new Date().getTime();
    
  let distance = countDownDate - now;

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("timer").innerHTML = hours + ":"
  + minutes + ":" + seconds;
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "FINISHED";
  }
}, 1000);

$(document).ready(function() {
    // click for select
    $('.selected-wrap').on('click', function () {
        $(this).children('.arrow').toggleClass('arrow-rotate');
        $(this).next('.product__select').toggle();
    })
    $('.select__option').on('click', function () {
        $(this).parent().prev().children('.selected').text($(this).text());
    })
    
    let productMainSlider = $("#product__main-slider");
    let productSmallSlider = $("#product__small-slider");
    let slidesPerPage = 4; //globaly define number of elements per page
    let syncedSecondary = true;
    if($('.product__small-slider .owl-item').hasClass('current')){
        $('.product__small-slider .owl-item').addClass("current-ops");
    }

    productMainSlider.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        autoplay: false, 
        dots: false,
        loop: true,
        animateOut: 'fadeOut',
        responsiveRefreshRate: 200,
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);

    productSmallSlider
        .on('initialized.owl.carousel', function() {
            productSmallSlider.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //let current = el.item.index;

        //if you disable loop you have to comment this block
        let count = el.item.count - 1;
        let current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        

        //end block

        productSmallSlider
            .find(".owl-item")
            .removeClass("current")
            .removeClass("current-ops")
            .eq(current)
            .addClass("current current-ops");
        let onscreen = productSmallSlider.find('.owl-item.active').length - 1;
        let start = productSmallSlider.find('.owl-item.active').first().index();
        let end = productSmallSlider.find('.owl-item.active').last().index();

        if (current > end) {
            productSmallSlider.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            productSmallSlider.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            let number = el.item.index;
            productMainSlider.data('owl.carousel').to(number, 100, true);
        }
    }

    productSmallSlider.on("click", ".owl-item", function(e) {
        e.preventDefault();
        let number = $(this).index();
        productMainSlider.data('owl.carousel').to(number, 300, true);
    });
});

