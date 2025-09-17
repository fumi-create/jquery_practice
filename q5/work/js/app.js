$(function () {
    //ホバー時動くように指定。リストをまとめているクラス、.dropdwnを指定。
   $('.dropdwn > li').hover(function () {
    //find()でthisの.dropdwn_menuを持つ要素を探し出します。.stop()でアニメーションの繰り返し操作を阻止、.slideDown()で要素を上から降ろすように表示させます。
    $(this).find('.dropdwn_menu').stop().slideDown();},
    //マウスが離れた時の動作を記載。
    function () {
    $(this).find('.dropdwn_menu').stop().slideUp();
    //find()でthisの.dropdwn_menuを持つ要素を探し出します。.stop()でアニメーションの繰り返し操作を阻止、.slideup()で要素を畳みます。
  });
  });
