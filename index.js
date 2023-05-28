const apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント

// お知らせとして表示するブログ記事の数
const numBlogPosts = 3;

// ブログデータを取得する関数
const getBlogData = () => {
  // APIからデータを取得します
  fetch(`${apiIndex}?limit=${numBlogPosts}`, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
    }
  })
  .then(res => res.json())
  .then(json => {
    for (let i = 0; i < numBlogPosts; i++) {
      // 取得したデータを元に表示を更新します
      if (json.contents.length > i) {
        let latestId = json.contents[i].id;
        fetchSingleBlogData(latestId, i); // 各記事データを取得
      } else {
        document.getElementById(`blog-post-${i}`).style.display = "none"; // データがなければ該当の記事を非表示にします
      }
    }
  })
}

// 個々のブログデータを取得する関数
const fetchSingleBlogData = (latestId, index) => {
  let apiUrl = `${apiIndex}/${latestId}`; // 最新のIDを使ってAPIのURLを組み立てる
  // 個々の記事データをAPIから取得します
  fetch(apiUrl, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
    }
  })
  .then(res => res.json())
  .then(json => {
    // 取得したデータを使って表示を更新します
    document.getElementById(`date${index}`).innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日'); // 日付を表示
    document.getElementById(`title${index}`).innerHTML = json.title; // タイトルを表示
    let imgElement = document.getElementById(`eyecatch${index}`);
    imgElement.src = json.eyecatch.url; // アイキャッチ画像を表示
    imgElement.setAttribute("loading", "lazy"); // 遅延読み込み属性を追加

    // 記事へのリンクを設定
    let blogPostElement = document.getElementById(`blog-post-${index}`);
    blogPostElement.addEventListener('click', () => window.open('https://caress2250.github.io/github.io/', '_blank'));
  })
}

// ページの他の要素がすべてロードされた後にブログデータを読み込みます
window.onload = getBlogData;