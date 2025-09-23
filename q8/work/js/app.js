// API
// const settings = {
//   "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
//   "method": "GET",
// }
// $.ajax(settings).done(function (response) {
//   const result = response['@graph'];
//   displayResult(result)
// }).fail(function (err) {
//   displayError(err)
// });

$(function () {
  //以下検索結果を表記
  function display(data) {//displayを結果を表示する関数として設定。引数としてdataを受け取るようにする。
    $('.message').remove(); // 既存のメッセージを.remove()で削除
    const items = data?.[0]?.items;//データをdata?.[0]でundefinedを返すように指定。

    if (items && items.length > 0) {//もし検索結果が存在した場合　itemsとitems.length(itemsの総数)が0より多い場合の条件式
      $.each(items, function (index, book) {//eachを利用してループ処理。itemsに対して、indexでitems内の数をカウント、book(itemsの配列内の要素(title:～)をbookという変数指定)でデータを取り出す。
        const title = book.title ? book.title : 'タイトル不明';//三項演算子を利用。.titleに値があればそれを変数titleに代入。なければ'タイトル不明'を代入。以下著者・出版社も同様に作成。
        const author = book['dc:creator'] ? book['dc:creator'] : '著者不明';
        const publisher = book['dc:publisher']?.[0] ? book['dc:publisher'][0] : '出版社不明';
        const link = book.link['@id'];//親書誌（シリーズ名）の書誌詳細ページのURIにアクセスする記述。URIを変数linkに代入。
        const html = ` 
          <li class='lists-item'>
            <div class='list-inner'>
              <p>タイトル：${title}</p>
              <p>著者：${author}</p>
              <p>出版社：${publisher}</p>
              <a href='${link}' target='_blank'>書籍情報</a>
            </div>
          </li>
        `;//const htmlを利用して画面に表示するためのhtmlを作成。先ほど定義した4つの変数を埋め込んでいます。liとdivにはそれぞれcssからレイアウト用のクラスを指定。a href~は新しいウィンドウでリンクが開けるようにtarget='_blank'を指定。
        $('.lists').prepend(html);//.listクラスの先頭にhtmlの内容を.prepend()で新しいコンテンツを追加。
      });
    } else {
      // 検索結果がなかった場合
      $('.lists').before('<div class=\'message\'>検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');//.beforeを使って、.prepend(html)で結果が表示されるコンテンツの前に検索結果が見つかりませんでした。<br>別のキーワードで検索してください。を挿入。
    }
  }

  function Success(response) {//Ajax通信が成功した際の記述。
    display(response['@graph']);//response['@graph']を使用して、書籍データの配列を取り出します。それを変数displayに引き渡たす。
  }

  function Fail(xhr) {//Ajax通信が失敗した際の記述
    $('.lists').empty(); // .empty()で.listsクラスを持つコンテンツを空にする。
    $('.message').remove(); // .messageを持つコンテンツを.remove();で削除
    let error = '予期せぬエラーが起きました。<br>再読み込みを行ってください。';//letで変数 errorに予期せぬエラーが起きました。<br>再読み込みを行ってくださいを定義

    if (xhr.status === 0) {//xhr.statusがゼロ、ネットワークエラーが起きた場合の記述
      error = '正常に通信できませんでした。<br>インターネットの接続を確認してください。';//変数 errorにエラーメッセージを定義
    } else if (xhr.status === 400) {//xhr.statusが400、クライアントエラーが起きた場合の記述。
      error = '検索キーワードが有効ではありません。<br>1文字以上で検索してください。';//変数 errorにエラーメッセージを定義
    }
    $('.lists').before(`<div class='message'>${error}</div>`);//.beforeを使って、errorを挿入。
  }

  let pageCount = 1;//ページ番号を追跡するための変数を設定
  let keyword = '';//キーワードを保存するための変数を設定

  $('.search-btn').on('click', function () {//.search-btnクラスを持つ要素がクリックされた際に作動
    const searchWord = $('#search-input').val();//#search-input(検索ワードを入力)に入力されたデータを.val();で取得し、変数searchWordに渡す。

    if (searchWord === '') {//もしsearchWordの中身がなかった場合
      Fail({ status: 400 }); //else if (xhr.status === 400)で設定したエラーメッセージを表示。
      return; // ここで処理を終了
    }

    // 検索ワードが変わったらページカウントをリセット
    if (searchWord !== keyword) {//もし、searchWordの内容が変更された(!==、等しくない)場合
      pageCount = 1;//ページカウントを1にします。
      $('.lists').empty();//.listsクラスを持つ要素を.empty();で空にします。
      keyword = searchWord;//searchWordの値をkeywordに保存します。
    } else { //検索ワードが変わっていない場合の条件を記入
      pageCount++;
    }

    //ajax通信の記述
    $.ajax({
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,//CiNii BooksのAPI通信URLに?title=${searchWord}(本のタイトル、searchWordで取得したもの)と、${pageCount}(現在のページ番号)を埋め込む。&count=20で、1ページの検索結果表示を20件に指定。&format=jsonで、データ形式をJSONに指定。
      method: 'GET',//method:でサーバーへのリクエストの種類を指定。今回はGETを指定
    })
      .done(Success)//リクエスト成功時、Success、Ajax通信が成功した際の記述を呼び出す。
      .fail(Fail);//リクエスト失敗時、Fail、Ajax通信が失敗した際の記述を呼び出す。
  });

  // 以下、リセットボタンの記述
  $('.reset-btn').on('click', function () {//.reset-btnクラスを持つコンテンツがクリックされた際に作動
    pageCount = 1;//ページ番号を1に指定
    keyword = '';//キーワードを保存するための変数を空欄に。
    $('.lists').empty();//.listsクラスを持つ要素を.empty();で空に。
    $('.message').remove();// .messageを持つコンテンツを.remove();で削除
    $('#search-input').val('');//#search-input(検索ワードを入力)に入力されたデータを''で空にします。
  });
 });


//WordSのSですが、selectの頭文字のSを取って命名しました。命名規則に沿っていなかったため修正いたしました。
//xhrですが、XMLHttpRequestの略です。調べている際に引数にxhrを使用している事例を見かけたため、私も使用しました。