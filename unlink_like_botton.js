/**
 * [概要]
 * 不要ないいねを期間を絞って取り消すことが可能
 * 
 * [使用方法]
 * 1. startDate, ednDateで対象日付の範囲を指定する
 * 2. debugFlagをtrueにする
 * 3. Twitterをのいいねのページで開発者ツールに貼り付ける
 * 
 * [オプション]
 * debugFlag : 実際にいいねの取り消しは行わず、対象となったツイートをログに出力
 *             取り消し対象の確認に使用する
 */

const startDate   = new Date('2010-01-01');
const endDate     = new Date('2020-01-25');
const debugFlag   = true

async function unlinkLike() {
  const articleCollection = document.getElementsByTagName('article');
  const articleArray = [...articleCollection];
  articleArray.forEach(
    function (article) {
      const unlink = article.querySelector('[data-testid="unlike"]');
      const timeTag = article.getElementsByTagName('time');
      if (!unlink || !timeTag) {
        return;
      }
      const time = new Date(timeTag[0].dateTime);
      if (startDate <= time && time <= endDate) {
        if (debugFlag) {
          console.log(article.innerText);
        } else {
          unlink.click()
        }
      }
    }
  )
  if (await isScrollBottom()) {
   alert('end');
   return;
  }
  window.scrollBy(0, window.innerHeight);
  unlinkLike();
}

var lastPageYOffset = null;
const sleep         = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
async function isScrollBottom() {
  await sleep(300); // 無限スクロールの読み込み時間を待機
  const scrollTop = window.pageYOffset;
  if (scrollTop === lastPageYOffset) {
    return true;
  }
  lastPageYOffset = scrollTop;
  return false;
}

function exec () {
  unlinkLike();
}

exec();
