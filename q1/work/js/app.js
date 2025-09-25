
$(function() {
  //jQueryのコードを追記
  //読み込み時に色を緑に変更。.cssはjQueryでcssに変更を加える際に使用します。今回は文字色の変更のためcolorと変更したい色を記載。
  $('#q1').css("color", "green");
  //クリック時にボタンの色変更。.clickで、クリックした際に効果が出るようにしています。
  $('#q2').click(function() {
    //クリック時のイベント記載。$(this)を使うことによって'#q2'をクリックした際にイベントを引き起こすことができます。
    $(this).css("background-color", "pink");
  });

  //クリック時のイベント記載。.fadeOutの中に、ミリ秒でフェードアウトする時間を記載。
  $('#q3').click(function() {
    $(this).fadeOut(3000);
  });

  //クリック時のイベント記載。addClassでcssのサイズ変更が記載されているクラス、"large"を呼び出します。
  $('#q4').click(function() {
    $(this).addClass("large");
  });

  //クリック時のイベント記載。prepend(先頭)、append(末尾)、after(要素の前)、before(要素の後ろ)に()内の要素を追加します。今回はテキストを挿入
  $('#q5').click(function() {
    $(this).prepend("DOMの中の前").append("DOMの中の後").before("DOMの前").after("DOMの後");
  });

  //クリック時のイベント記載。動きを付けるanimeteを使用。移動距離と秒を中に記載。
  $('#q6').click(function() {
    $(this).animate({
      "margin-top": 100,
      "margin-left": 100
    }, 2000);
  });

  //クリック時のイベント記載。click内にコンソールログ表示。thisで＃q7を指定。
  $('#q7').click(function() {
    console.log(this);
  });

  //ホバー時のイベント記載。addClassでcssのサイズ変更が記載されているクラス、"large"を呼び出します。
  $('#q8').hover(function() {
    $(this).addClass("large");
  }, function() {
    //マウスを離した時のイベント。.removeClassでlargeクラスを取り除きます。
    $(this).removeClass("large");
  });

  //クリック時のイベント記載。今回はリストに適用するためliを指定。.index()で番号を取得。xに数字を代入。alert内に表示内容を記載。今回はxを記載。
  $('#q9 li').click(function() {
    const a = $(this).index();
    alert(a);
  });

  //操作するのは#q10のリストのため記載。
  $('#q10 li').click(function() {
    //クリック時のイベント記載。今回はリストに適用するためliを指定。.index()でクリックした要素が何番目かを取得。Xに代入。
    const a = $(this).index();
    //変更対象の#q11 liを記載。.eq(x)でq11のリストの何番目かを認識。addClassで、cssのlarge-textを呼び出し。
    $('#q11 li').eq(a).addClass('large-text');
  });
});
//変数xですが、数学でよく使用するx(数字を代入する値)としてわかりやすいかと思い命名しました。