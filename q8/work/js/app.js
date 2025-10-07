$(function () {
	//Ajax通信が成功した際の記述。
	function onAjaxSuccess(response) {
		$('.message').remove(); // 既存のメッセージを.remove()で削除
		// データを response['@graph']?.[0] で取得
		const items = response['@graph']?.[0]?.items;

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

	//Ajax通信が失敗した際の記述
	function onAjaxError(jqXHR, textStatus, errorThrown) {
		$('.lists').empty(); // .empty()で.listsクラスを持つコンテンツを空にする。
		$('.message').remove(); // .messageを持つコンテンツを.remove();で削除

		let error = '予期せぬエラーが起きました。<br>再読み込みを行ってください。';//letで変数 errorに予期せぬエラーが起きました。<br>再読み込みを行ってくださいを定義

		// jqXHR.statusに基づいてエラーメッセージを分岐
		const status = jqXHR.status;

		if (textStatus === 'timeout') {
			// ステータスコードではなく、jQueryのタイムアウト（textStatus）で検出
			error = '通信がタイムアウトしました。<br>インターネットの接続を確認してください。';
		} else if (textStatus === 'abort') {
			// 処理を中断した場合など（textStatus）で検出
			error = '検索処理が中断されました。';
		} else if (status === 404) {
			// 404 Not Found
			error = '指定されたリソースが見つかりませんでした。';
		} else if (status >= 500) {
			// 5xx Server Error
			error = 'サーバーで問題が発生しました。<br>時間をおいてから再度お試しください。';
		} else if (status >= 400) {
			// 4xx Client Error (404以外)
			error = 'リクエストに問題が発生しました。<br>入力内容を確認してください。';
		} else if (status === 0) {
			// statusが0の場合: ネットワークエラー、CORSブロック、サーバーからの応答なしなど
			error = '正常に通信できませんでした。<br>インターネットの接続を確認するか、しばらくしてからお試しください。';
		} else {
			// その他の不明なエラー
			error = `サーバーで問題が発生しました。（Status: ${status}）<br>時間をおいてから再度お試しください。`;
		}

		$('.lists').before(`<div class='message'>${error}</div>`);//.beforeを使って、errorを挿入。
	}

	let pageCount = 1;//ページ番号を追跡するための変数を設定
	let keyword = '';//キーワードを保存するための変数を設定

	$('.search-btn').on('click', function () {//.search-btnクラスを持つ要素がクリックされた際に作動
		const searchWord = $('#search-input').val();//#search-input(検索ワードを入力)に入力されたデータを.val();で取得し、変数searchWordに渡す。

		if (searchWord === '') {//もしsearchWordの中身がなかった場

			// エラーメッセージを表示
			$('.lists').empty(); // .empty()で一旦リストを空にする
			$('.message').remove(); // .remove()で既存のメッセージを削除
			const validationMessage = '検索キーワードが有効ではありません。<br>1文字以上で検索してください。';// エラーメッセージを定義
			$('.lists').before(`<div class='message'>${validationMessage}</div>`);// エラーメッセージを挿入

			return;
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
			timeout: 10000 // タイムアウトを設定（例：10秒）
		})
			.done(onAjaxSuccess)//リクエスト成功時、onAjaxSuccess、Ajax通信が成功した際の記述を呼び出す。
			.fail(function (jqXHR, textStatus, errorThrown) {
				// onAjaxError関数が引数（jqXHR, textStatus, errorThrown）を受け取って処理するように修正したため、それを呼び出します。
				onAjaxError(jqXHR, textStatus, errorThrown);
			});
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






