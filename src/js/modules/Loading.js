export default class Loading {
  constructor() {
    this.images = document.querySelectorAll('img'); // ページ内の画像取得
    this.percent = document.querySelector('.percent'); // ゲージ
    this.count = 0;
    this.current;

    if (!this.percent) {
      return;
    }
    // 画像の読み込み
    for (let i = 0; i < this.images.length; i++) {
      const img = new Image(); // 画像の作成
      // 画像読み込み完了したとき
      img.onload = function () {
        this.count += 1;
      }.bind(this);
      // 画像読み込み失敗したとき
      img.onerror = function () {
        this.count += 1;
      }.bind(this);
      img.src = this.images[i].src; // 画像にsrcを指定して読み込み開始
    }

    // ローディング処理
    const nowLoading = setInterval(
      function () {
        // 現在の読み込み具合のパーセントを取得
        this.current = Math.floor((this.count / this.images.length) * 100);
        if (isNaN(this.current)) {
          this.current = 100;
        }
        // パーセント表示の書き換え
        this.percent.innerHTML = `${this.current}%`;
        if (this.count == this.images.length || isNaN(this.current)) {
          // ローディングの終了
          clearInterval(nowLoading);
        }
      }.bind(this),
      100
    );
  }
}
