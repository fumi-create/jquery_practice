$(function () {
    //ボタンクリック時に動くように指定。ボタン全体をまとめてるクラス.drawer_buttonを代入。
   $('.drawer_button').click(function () {
      //ボタンクリック時に背景色が表示されるように設定。ボタン全体をまとめてるクラス.drawer_buttonを代入。
   $('.drawer_bg').fadeToggle();
    //.fadeToggleを使用して、背景を表示させます。
});
  $('.drawer_button').click(function () {
    //ボタンクリック時に動くように指定。ボタン全体をまとめてるクラス.drawer_buttonを代入。
    $(this).toggleClass('active');
    //ボタンをクリックした後の動きの部分にactiveクラスが割り振られている。.toggleClassでクラスの着脱を行ってメニューとクローズボタンを切り替える。
    $('nav').toggleClass('open');
    //メニューを動かすクラスにはopenが付与されています。.toggleClassでクリックした際にクラスが着脱されるように設定します。
  });
  });
