import gsap from 'gsap';

export default class FullScreen {
  constructor() {
    this.container = document.querySelector('[data-full-screen="container"]');
    this.sections = this.container.querySelectorAll(
      '[data-full-screen="section"]'
    );
    this.H = window.innerHeight * this.sections.length;
    this.currentSection = 0;
    this.wheelFlag = false;
    this.prevTime = new Date().getTime();
    this.curTime = new Date().getTime();

    this.init();
  }

  init() {
    window.addEventListener('wheel', this.onScroll.bind(this), {
      passive: false
    });
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  onScroll(e) {
    e.preventDefault(); // デフォルトのスクロール動作を削除

    if (this.wheelFlag) {
      return;
    }

    // 前回の実行時間からある程度時間を開ける
    this.curTime = new Date().getTime();

    const timeDiff = this.curTime - this.prevTime;
    console.log(timeDiff);

    if (timeDiff < 1200) {
      console.log('diff');
      return;
    }

    console.log(Math.abs(e.deltaY));

    if (Math.abs(e.deltaY) < 20) return;

    this.wheelFlag = true;
    this.prevTime = this.curTime;

    if (e.deltaY > 0) {
      // ホイールが下方向だったら
      if (this.currentSection >= this.sections.length - 1) {
        this.currentSection = this.sections.length - 1;
      } else {
        this.currentSection++;
      }
    } else if (e.deltaY < 0) {
      if (this.currentSection <= 0) {
        this.currentSection = 0;
      } else {
        this.currentSection--;
      }
    }

    this.target = (this.currentSection / this.sections.length) * this.H;

    // TODO : スクロールが浅い時に現在のスライドを表示
    // スクロール処理
    this.slideTo();
  }

  onResize() {
    this.H = window.innerHeight * this.sections.length;

    this.current = (this.currentSection / this.sections.length) * this.H;
    this.container.style.transform = `translate3d(0, -${this.current}px, 0)`;
  }

  slideTo() {
    const target = this.target;
    const container = this.container;

    gsap.to(container, {
      y: -target,
      duration: 1,
      ease: 'strong.inout',

      onComplete: () => {
        this.wheelFlag = false;
      }
    });
  }
}
