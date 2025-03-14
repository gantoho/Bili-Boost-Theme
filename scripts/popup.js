document.addEventListener('DOMContentLoaded', function() {
  /** 暗黑模式 */ 
  const toggleThemeMode = document.getElementById('darkModeToggle');
  
  // 获取当前状态
  chrome.storage.sync.get(['darkMode'], function(result) {
    toggleThemeMode.checked = result.darkMode || false;
  });
  
  // 监听开关变化
  toggleThemeMode.addEventListener('change', async function() {
    const enabled = toggleThemeMode.checked;
    
    try {
      // 保存设置
      await chrome.storage.sync.set({darkMode: enabled});
      
      // 获取当前标签页
      const tabs = await chrome.tabs.query({active: true, currentWindow: true});
      const currentTab = tabs[0];
      // console.log('currentTab', currentTab);
      
      // 注入内容脚本（如果尚未注入）
      await chrome.scripting.executeScript({
        target: {tabId: currentTab.id},
        files: ['content.js']
      }).catch(() => {
        // 如果脚本已经存在，忽略错误
      });
      
      // 发送消息
      chrome.tabs.sendMessage(currentTab.id, {
        action: "toggleDarkMode",
        enabled: enabled
      }, function(response) {
        // if (chrome.runtime.lastError) {
        //   console.log('重试中...');
        //   // 如果失败，尝试重新加载页面
        //   chrome.tabs.reload(currentTab.id);
        // }
        console.error('Error:', response);
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  });
  /** 暗黑模式 */ 
});
