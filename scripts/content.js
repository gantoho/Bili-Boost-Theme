(function() {
    console.log(
        `
%cBili Boost Loaded Success
%c作者：%c%s
%cGithub: %s
        `,
        'color: #40c5f1;',
        'color: #FF6699;',
        'color:rgb(0, 119, 255); font-weight: bold;',
        '@gantoho',
        'color:#00ffaa; font-weight: bold;',
        'https://github.com/ganto/Bili-Boost-Theme'
    );    
})();
document.addEventListener('DOMContentLoaded', function() {
    /** 暗黑模式 */ 
    function loadTheme(theme) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://s1.hdslb.com/bfs/seed/jinkela/short/bili-theme/${theme}.css`;  // 动态加载light/dark.css
        link.id = 'theme-style';
        
        // 移除旧主题样式
        const oldLink = document.getElementById('theme-style');
        if (oldLink) oldLink.remove();
        
        document.head.appendChild(link);
    }

    // 初始化暗黑模式
    function initDarkMode() {
        chrome.storage.sync.get(['darkMode'], function(result) {
            // console.log('初始化暗黑模式', result);
            if (result.darkMode) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // 启用暗黑模式
    function enableDarkMode() {
        // document.body.classList.add('dark-mode');
        loadTheme('dark');
    }

    // 禁用暗黑模式
    function disableDarkMode() {
        // document.body.classList.remove('dark-mode');
        loadTheme('light');
    }


    // 监听消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // 如果当前页面是哔哩哔哩页面，则不启用按钮功能
        console.log('收到消息:', request);
        if (!window.location.href.includes('bilibili.com')) {
            return true;
        }
        if (request.action === "toggleDarkMode") {
            if (request.enabled) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
            sendResponse({success: true});
        }
        return true;
    });

    // 确保在DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
    /** 暗黑模式 */ 
})
