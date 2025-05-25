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

  // 延遲讓 header 淡出，避免選單開啟前閃爍
  setTimeout(() => {
    header.classList.add('menu-open');
  }, 100); // 與 CSS 動畫時間一致

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

// 監聽「漢堡開啟」按鈕
if (menuToggleBtn) {
  menuToggleBtn.addEventListener('click', openMenu);
}

// 監聽「關閉」按鈕
if (menuCloseBtn) {
  menuCloseBtn.addEventListener('click', closeMenu);
}

// 監聽點擊全螢幕選單中的任一連結，自動關閉選單
document.querySelectorAll('.mobile-menu-panel a').forEach(navLink => {
  navLink.addEventListener('click', closeMenu);
});


// --- 桌面版語言切換選單功能 ---
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
      // 阻止連結的默認點擊行為
      event.preventDefault();
      const destinationUrl = event.target.href;
      // 只有當目標網址不是當前頁面時才跳轉
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

// 修正桌面版地球圖示點擊會跳到頂部的問題
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', function(event) {
    event.preventDefault(); // 阻止 <a href="#"> 導致跳回頁首
  });
}

// --- 手機版彈出式語言選單功能 (新版邏輯) ---
const mobileLangToggle = document.querySelector('.language-toggle-btn-mobile');
const mobileLangMenu = document.querySelector('.language-menu-mobile');

if (mobileLangToggle && mobileLangMenu) {
  // 監聽地球圖示的「點擊」事件
  mobileLangToggle.addEventListener('click', function(event) {
    event.preventDefault(); // 阻止 <a> 標籤的預設跳轉行為
    event.stopPropagation(); // 阻止事件冒泡，避免馬上被 document 的點擊事件關閉

    // 切換選單的顯示狀態
    const isShown = mobileLangMenu.classList.toggle('show');
    // 更新無障礙屬性
    mobileLangToggle.setAttribute('aria-expanded', isShown);
  });

  // 監聽整個頁面的點擊事件，用來在點擊外部時關閉選單
  document.addEventListener('click', function(event) {
    // 檢查選單是否為開啟狀態，以及點擊的目標是否不在選單或切換按鈕之內
    if (mobileLangMenu.classList.contains('show') && !mobileLangToggle.contains(event.target)) {
      mobileLangMenu.classList.remove('show');
      mobileLangToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
