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


// --- Page Top Button ---
const pageTopBtn = document.getElementById('pageTopBtn');

if (pageTopBtn) {
    // 當頁面捲動時，決定按鈕是否顯示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { // 向下捲動超過 400px 時顯示
            pageTopBtn.classList.add('show');
        } else {
            pageTopBtn.classList.remove('show');
        }
    });

    // 點擊按鈕後，平滑地捲動至頁面頂端
    pageTopBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- 【新增】內文區塊滾動進入動畫 ---
document.addEventListener('DOMContentLoaded', () => {
  // 選取所有需要動畫的區塊
  const sections = document.querySelectorAll('.showcase-section');

  // 如果頁面上有這些區塊才執行
  if (sections.length > 0) {
    // 建立一個觀察器
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // 當目標元素進入可視區域時
        if (entry.isIntersecting) {
          // 為該元素加上 'is-visible' class 來觸發動畫
          entry.target.classList.add('is-visible');
          // 動畫觸發後就停止觀察，避免重複觸發
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, // 使用瀏覽器視窗作為根
      rootMargin: '0px',
      threshold: 0.1 // 當元素的可視性達到 10% 時觸發
    });

    // 讓觀察器開始觀察每一個區塊
    sections.forEach(section => {
      observer.observe(section);
    });
  }
});

// --- 【新增】讓圖片區塊可以用滑鼠拖曳捲動 ---
document.addEventListener('DOMContentLoaded', () => {
  // 選取頁面上所有的 showcase-container
  const sliders = document.querySelectorAll('.showcase-container');

  sliders.forEach(slider => {
    // --- 狀態變數 ---
    let isDown = false;
    let hasDragged = false;
    let startX;
    let scrollLeft;
    
    // --- 動畫與物理效果變數 ---
    let velocity = 0;
    let animationFrameId;
    let targetScrollLeft;

    // --- 用於精準計算速度的追蹤器 ---
    let velocityTracker = [];

    // --- 事件處理函式 ---

    // 1. 滑鼠按下
    const handleMouseDown = (e) => {
      // 檢查點擊是否在捲動軸上
      if (e.offsetY > slider.clientHeight) { return; }

      isDown = true;
      hasDragged = false;
      slider.classList.add('active');
      
      // 停止所有正在進行的動畫
      cancelAnimationFrame(animationFrameId);
      
      // 記錄初始狀態
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      targetScrollLeft = scrollLeft;

      // 重設並初始化速度追蹤器
      velocity = 0;
      velocityTracker = [];
      velocityTracker.push({ time: Date.now(), x: e.pageX });

      // 綁定全域事件
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      // 立即啟動拖曳動畫迴圈
      animationFrameId = requestAnimationFrame(dragLoop);
    };

    // 2. 滑鼠移動
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const currentX = e.pageX;
      const walk = currentX - startX;
      targetScrollLeft = scrollLeft - walk;

      // 持續記錄軌跡以計算速度
      const now = Date.now();
      velocityTracker.push({ time: now, x: currentX });
      // 只保留最近 100ms 的紀錄
      while (now - velocityTracker[0].time > 100) {
        velocityTracker.shift();
      }

      if (Math.abs(walk) > 5) {
        hasDragged = true;
      }
    };

    // 3. 滑鼠放開
    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('active');

      // 解除全域事件
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      // 停止拖曳動畫
      cancelAnimationFrame(animationFrameId);

      // --- 根據軌跡紀錄，計算出更穩定的平均速度 ---
      const now = Date.now();
      // 清理超時的紀錄
      while (velocityTracker.length > 0 && now - velocityTracker[0].time > 100) {
        velocityTracker.shift();
      }

      if (hasDragged && velocityTracker.length >= 2) {
        const firstPoint = velocityTracker[0];
        const lastPoint = velocityTracker[velocityTracker.length - 1];
        const deltaX = lastPoint.x - firstPoint.x;
        const deltaTime = lastPoint.time - firstPoint.time;
        
        if (deltaTime > 10) { // 確保時間間隔有效
          velocity = (deltaX / deltaTime) * (1000 / 60); // 轉換為 影格/秒 的速度單位
        } else {
          velocity = 0;
        }
      } else {
        velocity = 0;
      }
      
      // 設定速度上限，防止極端跳動
      const MAX_VELOCITY = 120;
      if (velocity > MAX_VELOCITY) velocity = MAX_VELOCITY;
      if (velocity < -MAX_VELOCITY) velocity = -MAX_VELOCITY;
      
      // 只有在速度足夠時才啟動慣性動畫
      if (Math.abs(velocity) > 1) {
        animationFrameId = requestAnimationFrame(momentumLoop);
      }
    };

    // --- 動畫迴圈 ---

    // A. 拖曳中的平滑迴圈
    const dragLoop = () => {
      if (!isDown) return;
      const current = slider.scrollLeft;
      const target = targetScrollLeft;
      // 使用線性插值平滑滾動，減少抖動
      slider.scrollLeft += (target - current) * 0.2;
      animationFrameId = requestAnimationFrame(dragLoop);
    };

    // B. 放開後的慣性迴圈
    const momentumLoop = () => {
      slider.scrollLeft += velocity;
      velocity *= 0.95; // 摩擦力
      if (Math.abs(velocity) > 0.5) {
        animationFrameId = requestAnimationFrame(momentumLoop);
      }
    };
    
    // --- 初始事件綁定 ---
    slider.addEventListener('mousedown', handleMouseDown);

    // --- 連結點擊保護 ---
    const links = slider.querySelectorAll('.showcase-item');
    links.forEach(link => {
      link.addEventListener('dragstart', (e) => e.preventDefault());
      link.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
        }
      });
    });
  });
});

// --- Hero Section 自動輪播與手動控制 (支援圖片與影片) ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero .hero-slide'); 
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const defaultSlideDuration = 7000; // 圖片或循環影片的預設輪播時間 (7秒)

    if (!slides.length) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    if (slides.length <= 1) { 
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        
        slides[0].classList.add('active'); // Ensure first slide is active
        const firstSlideVideo = slides[0].querySelector('video');
        if (firstSlideVideo) {
            firstSlideVideo.play().catch(error => console.warn("Single video slide autoplay failed:", error));
        }
        return;
    }

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                if (i !== index) { 
                    video.currentTime = 0;
                }
            }
        });

        slides[index].classList.add('active');
        const currentVideo = slides[index].querySelector('video');

        if (currentVideo) {
            // Ensure video is reset if it's the one being activated
            if (currentVideo.currentTime > 0 && !currentVideo.loop && currentVideo.paused) {
                currentVideo.currentTime = 0;
            }
            currentVideo.play().catch(error => {
                console.warn("Video autoplay failed for slide " + index + ":", error);
            });
        }
        resetSlideshowTimer();
    }

    function nextSlideFn() { // Renamed to avoid conflict with global nextSlide if any
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlideFn() { // Renamed
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function resetSlideshowTimer() {
        clearInterval(slideInterval); 
        clearTimeout(slideInterval); // Also clear timeout if onended was used

        const activeSlide = slides[currentSlide];
        const video = activeSlide.querySelector('video');

        if (video) {
            video.onended = null; // Clear previous onended handler

            if (!video.loop) {
                video.onended = () => {
                     // Add a small delay to prevent immediate re-trigger if video is very short or ends quickly
                    setTimeout(() => {
                        // Check if the video is still the active one and actually ended (not paused manually)
                        if (slides[currentSlide] === activeSlide && video.ended) {
                           nextSlideFn();
                        }
                    }, 50); // 50ms delay
                };
                // Fallback timer in case onended doesn't fire or video is stuck
                slideInterval = setTimeout(nextSlideFn, Math.max(defaultSlideDuration, (video.duration * 1000) + 500 || defaultSlideDuration + 500));

            } else {
                slideInterval = setTimeout(nextSlideFn, defaultSlideDuration);
            }
        } else {
            slideInterval = setTimeout(nextSlideFn, defaultSlideDuration);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentVideo = slides[currentSlide].querySelector('video');
            if (currentVideo && !currentVideo.loop) {
                currentVideo.onended = null;
            }
            clearTimeout(slideInterval); // Clear any pending timeout
            clearInterval(slideInterval);
            nextSlideFn();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentVideo = slides[currentSlide].querySelector('video');
            if (currentVideo && !currentVideo.loop) {
                currentVideo.onended = null;
            }
            clearTimeout(slideInterval); // Clear any pending timeout
            clearInterval(slideInterval);
            prevSlideFn();
        });
    }
    
    showSlide(currentSlide); 
});
