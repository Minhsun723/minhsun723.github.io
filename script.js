// --- 導覽列捲動變色效果 ---
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    // 只有當選單沒打開時，才根據捲動改變 header 樣式
    if (window.scrollY > scrollThreshold && !header.classList.contains('menu-open')) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 全螢幕手機選單功能 ---
const menuToggleBtn = document.querySelector('.menu-toggle-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
const header = document.querySelector('header');
const body = document.querySelector('body');

// 定義開啟選單的動作
function openMenu() {
    mobileMenuPanel.classList.add('active');
    header.classList.add('menu-open'); // 讓 header 隱藏
    body.classList.add('no-scroll'); // 鎖定背景滾動
}

// 定義關閉選單的動作
function closeMenu() {
    mobileMenuPanel.classList.remove('active');
    header.classList.remove('menu-open'); // 讓 header 恢復
    body.classList.remove('no-scroll'); // 解鎖背景滾動
    
    // 檢查關閉選單後，頁面是否仍在捲動狀態，若是則補上 .scrolled
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

// 監聽「開啟」按鈕
menuToggleBtn.addEventListener('click', openMenu);

// 監聽「關閉」按鈕
menuCloseBtn.addEventListener('click', closeMenu);

// 監聽點擊選單中的任一連結，自動關閉選單
document.querySelectorAll('.mobile-menu-panel a').forEach(navLink => {
    navLink.addEventListener('click', closeMenu);
});

// --- 語言切換選單功能 ---
const langToggleBtn = document.querySelector('.language-toggle-btn');
const langMenu = document.querySelector('.language-menu');
const langSwitcher = document.querySelector('.language-switcher');

// 檢查元素是否存在，避免在沒有這些元素的頁面出錯
if (langToggleBtn && langMenu && langSwitcher) {
    // 滑鼠移入 language-switcher 時顯示選單
    langSwitcher.addEventListener('mouseover', function() {
        langMenu.classList.add('show');
        langToggleBtn.setAttribute('aria-expanded', 'true');
    });

    // 滑鼠移出 language-switcher 時隱藏選單
    langSwitcher.addEventListener('mouseleave', function() {
        langMenu.classList.remove('show');
        langToggleBtn.setAttribute('aria-expanded', 'false');
    });

    // 點擊選單中的任一語言選項後，執行頁面跳轉
    langMenu.addEventListener('click', function(event) {
        // 檢查點擊的目標是否為一個 <a> 連結
        if (event.target.tagName === 'A' && event.target.href) {

            // 1. 阻止連結的默認點擊行為，以便我們手動控制
            event.preventDefault();

            // 2. 取得連結中的目標網址 (href)
            const destinationUrl = event.target.href;

            // 3. 指示瀏覽器跳轉到該網址
            //    (只有當目標網址不是當前頁面時才跳轉，避免不必要的重新整理)
            if (destinationUrl !== window.location.href) {
            window.location.href = destinationUrl;
            }
        }
    });

    // 鍵盤聚焦時顯示選單
    langToggleBtn.addEventListener('focus', function() {
        langMenu.classList.add('show');
        langToggleBtn.setAttribute('aria-expanded', 'true');
    });

    // 鍵盤離開焦點時隱藏選單
    langToggleBtn.addEventListener('blur', function() {
        langMenu.classList.remove('show');
        langToggleBtn.setAttribute('aria-expanded', 'false');
    });
}