import '../css/app.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    gsap.to('.scroll', {
      scrollTrigger: {
        trigger: '.scroll', // 要素".a"がビューポートに入ったときにアニメーション開始
        start: 'center center', // アニメーション開始位置
        toggleClass: 'active',
        markers: true // マーカー表示
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'strong.inout',
      className: '+=on',

      onComplete: () => {
        console.log('complete!!!!');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', new App());
