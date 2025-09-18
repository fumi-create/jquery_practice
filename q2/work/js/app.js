
$(function () {
    //ボタンクリック時に動くように指定。ボタン全体をまとめてるクラス.modal_open_buttonを代入。
  $('.modal_open_button').click(function () {
    $('.modal_win').fadeIn();
    //モーダルウィンドウのクラス.modal_winをフェードインさせます。
  });
  $('.modal_close_button').click(function () {
    //モーダルウィンドウを閉じる記述。×をクリックしたら閉じるように指定します。
    $('.modal_win').fadeOut();
    //モーダルウィンドウのクラス.modal_winをフェードアウトさせます。
  });
});