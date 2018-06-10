const detector = require('detector');
import './components/icons';
import {Modal} from './components/modals';
import {validate} from './components/validation';

import {tns} from '../../node_modules/tiny-slider/src/tiny-slider.module.js';

// Get Modal
Modal.createModalHolder();
Modal.getModal(() => {
    initFunc();
});

// Modal inner functions
function initFunc() {
    // Forms validation
    validate('modal-form', (e) => {
        
        Modal.testModal('thanks-modal');
        
        e.preventDefault();
    });
}

// Sliders
const heroSlider = document.querySelectorAll('.hero__slider');
for (let i = 0; i < heroSlider.length; i++) {
    const slider = heroSlider[i];
    
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: true,
        autoHeight: true
    });
    const nav = slider.parentElement.parentElement.querySelector('.tns-nav');
    const btns = slider.parentElement.parentElement.querySelector('.tns-controls');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', nav);
    slider.parentElement.parentElement.querySelector('.tns-inner').insertAdjacentElement('beforeend', btns);
}

const processSlider = document.querySelectorAll('.process__list');
for (let i = 0; i < processSlider.length; i++) {
    const slider = processSlider[i];
    
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        autoHeight: true,
        responsive: {
            1025: {
                disable: true
            }
        }
    });
    
    const nav = slider.parentElement.parentElement.querySelector('.tns-nav');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', nav);
}

// Anchors
const header = document.querySelector('header.header'),
    anchors = document.querySelectorAll('a.anchor'),
    scrollBlocks = document.querySelectorAll('.scroll-block'),
    footer = document.querySelector('.footer');

if (anchors) {
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', e => {
            const link = anchors[i].getAttribute('href');
            let destination = document.querySelector(link).getBoundingClientRect().top + window.pageYOffset + 30;
            
            window.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: destination
            });
            
            e.preventDefault();
        });
    }
}

function currentScroll() {
    for (let i = 0; i < scrollBlocks.length; i++) {
        let block = scrollBlocks[i];
        const id = block.getAttribute('id');
        
        for (let j = 0; j < anchors.length; j++) {
            let anchor = anchors[j];
            const link = anchor.getAttribute('href');
            let distance = 0;
            
            if (block.classList.contains('footer')) {
                distance = block.offsetTop - 500;
            } else {
                distance = block.offsetTop;
            }
            
            if (window.pageYOffset >= distance && window.pageYOffset <= (block.clientHeight + block.offsetTop)) {
                if (link === `#${id}`) {
                    anchor.classList.add('current');
                } else {
                    anchor.classList.remove('current');
                }
            } else {
                if (link === `#${id}`) {
                    anchor.classList.remove('current');
                }
            }
        }
    }
}

// Header background color
const lightSection = document.querySelectorAll('.light-section');
function headerBg() {
    for (let i = 0; i < lightSection.length; i++) {
        let section = lightSection[i];
        if (window.pageYOffset >= section.offsetTop && window.pageYOffset <= (section.clientHeight + section.offsetTop)) {
            header.classList.add(`header_light-${i}`);
        } else {
            header.classList.remove(`header_light-${i}`);
        }
    }
}

// Parallax
function parallax(target, parent, speed, rotate) {
    const item = document.querySelector(target);
    const itemParent = document.querySelector(parent);
    const pos = window.pageYOffset + window.innerHeight;
    const itemParentPos = itemParent.getBoundingClientRect().top + window.pageYOffset;
    const itemParentHeight = itemParent.clientHeight;
    const newPos = (pos - itemParentPos) * speed;
    let newRotate = 0;
    
    if (rotate) {
        newRotate = (pos - itemParentPos) * rotate;
    }
    
    if (item) {
        if (pos > itemParentPos - window.innerHeight && pos <= (itemParentHeight + itemParentPos + window.innerHeight)) {
            item.style.transform = `translateY(${newPos}px) rotate(${newRotate}deg)`;
        } else {
            item.style.transform = `translateY(0px) rotate(0deg)`;
        }
    }
}

// Animate class
function animateClass(target) {
    const items = document.querySelectorAll(target);
    
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemPos = item.getBoundingClientRect().top + window.pageYOffset;
            const pos = window.pageYOffset - (item.clientHeight / 3);
            
            if (pos > itemPos - window.innerHeight) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        }
    }
}

// Window Scroll
window.addEventListener('scroll', () => {
    windowScroll();
});

function windowScroll() {
    if (window.pageYOffset > 30) {
        header.classList.add('header__fixed');
    } else {
        header.classList.remove('header__fixed');
    }
    
    if (scrollBlocks) {
        currentScroll();
    }
    if (lightSection) {
        headerBg();
    }
    
    // Launch animation on desktop only
    if (!document.querySelector('html').classList.contains('mobile')) {
        parallax('.for-partners__background', '.for-partners', 0.35, 0.15);
        parallax('.proposal__background img', '.proposal', 0.2,);
        parallax('.about__bear img', '.about', 0.1);
        parallax('.about__background img', '.about', 0.2);
        
        // add animate classes
        animateClass('.hero__slide');
        animateClass('.production__promo');
        animateClass('.production__bottom');
        animateClass('.benefits__item');
        animateClass('.more__item');
        animateClass('.process__item');
    }
}

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    const pageHtml = document.querySelector('html');
    pageHtml.classList.add(detector.os.name);
    pageHtml.classList.add(detector.device.name);
    pageHtml.classList.add(detector.browser.name);
    pageHtml.classList.add(detector.browser.version);
    if (detector.device.name === 'pc' || detector.device.name === 'mac') {
        pageHtml.classList.add('desktop');
    } else {
        pageHtml.classList.add('mobile');
    }
    pageHtml.classList.add('loaded');
    
    windowScroll();
});





