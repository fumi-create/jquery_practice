$(function() {
  $('.select-box').on('change', function() {
    // 絞り込みの条件が変わった際にイベントが起こるように設定。クリックする対象の.select-boxを指定。
    const categoryFilter = $(this).val();
    // 選択したカテゴリーを取得して、定数の中に入れます。.val()を取得して現在の値を入れます。

    // 以下条件式を記載
    if (categoryFilter === 'all') {
      // allが選択された場合は全てのリストアイテムを表示
      $('.food-list > li').show();
    } else {
      // all以外が選択された場合はループ処理
      $('.food-list > li').each(function() {
        // each()を利用して、.food-list内のliをループ処理します。
        if ($(this).data('category-type') === categoryFilter) {
          // 選んだリスト(selectedCategory)を$(this).data('category-type')でデータを取得。選んだデータがどのliに該当するか判断。
          $(this).show();
          // 上記条件が満たされた場合、.show();で当てはまるliを表示。
        } else {
          $(this).hide();
          // 上記条件が満たされなかった場合、.hide();でliを非表示にする。
        }
      });
    }
  });
});