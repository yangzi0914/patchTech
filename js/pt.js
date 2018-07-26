$(document).ready(function () {
    alert($('#section1').height());
    $('#fullpage').fullpage({
        menu: '#menu',
        anchors: ['home', 'service', 'about', 'detail', 'contactUs'],
        navigation: true,
        navigationPosition: 'right',
        scrollOverflow: true,
        afterLoad: function (anchorLink) {
            var loadedSection = this;
            if (anchorLink == 'home' || anchorLink == 'service' || anchorLink == 'about') {
                $('#fp-nav').removeClass("black");
                if (anchorLink == 'service') {
                    $(".header").addClass("black");
                } else {
                    $(".header").removeClass("black");
                }
            } else {
                $(".header").addClass("black");
                $("#fp-nav").addClass("black");
            }

            if (anchorLink == 'detail') {
                $(".header").addClass("mask");
                $("#menu").addClass("mask");
            }
        },
        onLeave: function (index) {
            if (index == '4') {
                $(".header").removeClass("mask");
                $("#menu").removeClass("mask");
            }
        }
    })
})