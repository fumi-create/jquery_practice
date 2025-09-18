$(function() {
  $('.select-box').on('change', function() {
    //絞り込みの条件が変わった際にイベントが起こるように設定。クリックする対象の.select-boxを指定。
    const listselect = $(this).val();
//選択したカテゴリーを取得して、定数の中に入れます。.val()を取得して現在の値を入れます。

//以下条件式を記載
$('.food-list > li').each(function() {
  //each()を利用して、.food-list内のliをループ処理します。
      if (listselect === 'all' || $(this).data('category-type') === listselect) {
      //もし、選択されたリストがすべて(all)なら　||　選んだリスト(listselect)を$(this).data('category-type')でデータを取得。選んだデータがどのliに該当するか判断。
        $(this).show();
        //上記条件が満たされた場合、.show();で当てはまるliを表示。
      } else {
        $(this).hide();
        //上記条件が満たされなかった場合、.hide();でliを非表示にする。
      }
    });
  });
});