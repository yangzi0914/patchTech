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
            if (anchorLink == 'home' || anchorLink == 'about') {
                $(".header").removeClass("black");
                $('#fp-nav').removeClass("black");
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