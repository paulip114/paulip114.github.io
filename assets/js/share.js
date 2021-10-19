// 選擇和 DOM 有關的元素
const btn = document.querySelector(".btn-share");
const result = document.querySelector(".result");

// 當使用者點擊分享時要帶入的資訊
const shareData = {
    url: 'https://paulip114.github.io/', // 要分享的 URL
    title: "Paul's Resume", // 要分享的標題
    text: 'Share it if it is good!',  
};

btn.addEventListener('click', () => {
    // 判斷瀏覽器是否支援 Web Share API
    if (navigator.share) {
        handleNavigatorShare();
    } else {
        handleNotSupportNavigatorShare();
    }
});

// 當瀏覽器支援 Web Share API 時
async function handleNavigatorShare() {
    try {
        await navigator.share(shareData);
        result.textContent = 'Thank you for your sharing';
    } catch (err) {
        // 使用者拒絕分享或發生錯誤
        const { name } = err;
        if (name === 'AbortError') {
            result.textContent = 'You have unshared this post';
        } else {
            result.textContent = err;
            console.log('Error', err);
        }
    }
}

// 當瀏覽器不支援 Web Share API 時，點下去變成複製
function handleNotSupportNavigatorShare() {
    const contentToCopy = document.querySelector('#content-to-copy');
    contentToCopy.value = shareData.url;
    contentToCopy.setAttribute('type', 'text'); // 不是 hidden 才能複製
    contentToCopy.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? '成功' : '失敗';
        alert(`${shareData.url} - 複製${msg}`);
    } catch (err) {
        alert('Oops, unable to copy');
    }

    /* unselect the range */
    contentToCopy.setAttribute('type', 'hidden');
    window.getSelection().removeAllRanges();
}
