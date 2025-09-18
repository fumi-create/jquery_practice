
$(function () {
  // .btn__submit(アカウント作成ボタン)をクリックした際にコンソールログに表示イベントを作成。
  $('.btn__submit').on('click', function () {
    console.log('名字');//ラベルのコンソール表示
    console.log($('#family__name').val());//#family__nameをもつ要素を.val()で値を取得。電話番号まで同じ要領で読み込みます。

    console.log('名前');
    console.log($('#given__name').val());

    console.log('生年月日');
    console.log($('.year').val() + '年' + $('.month').val() + '月' + $('.day').val() + '日');// + を使用して、文字列を結合させて表示

    console.log('性別');
    console.log($('[name="gender"]:checked').val());

    console.log('職業');
    console.log($('.occupation').val());

    console.log('アカウント名');
    console.log($('#account__name').val());

    console.log('メールアドレス');
    console.log($('#email').val());

    console.log('パスワード');
    console.log($('#password').val());

    console.log('確認用パスワード');
    console.log($('#duplication__password').val());

    console.log('住所');
    console.log($('#address').val());

    console.log('電話番号');
    console.log($('#tel').val());

    console.log('購読情報');
    $('[name="subscription"]:checked').each(function () {//name="subscription"をもつインプットボタンがクリックされた際に実行。:checkedでチェックされたものだけ表示するよう絞り込みます。
      //.each（）でループ処理を行います。
      console.log($(this).val());//上記内容をコンソール表示します。
    })
  });
});