$(function () {
    //ボタンクリック時に動くように指定。ボタンのリストのクラス.nav liを代入。
    $('.nav li').click(function () {
        //.index()でリスト番号を取得。xに数字を代入。
        const indexNum = $(this).index();
        //クリックした際に、要素を隠しているクラスのis-hiddenをaddclassで全体に付与します。
        $('.description li').addClass('is-hidden'); 
        //.eq(x)でvar x = $('.nav li').index();で取得したリストを読み取り、クリックされた要素にだけ.removeClassでis-hiddenを取り除きます。
        $('.description li').eq(indexNum).removeClass('is-hidden') })
});