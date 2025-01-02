document.addEventListener('DOMContentLoaded', () => {
  const DB_NAME = 'historyTrackerDB';
  const STORE_NAME = 'history';
  
  const request = indexedDB.open(DB_NAME);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    
    const request = index.openCursor(null, 'prev');
    const historyList = document.getElementById('history-list');
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
          <a href="${item.url}">${item.title || item.url}</a>
          <div class="timestamp">${new Date(item.timestamp).toLocaleString()}</div>
        `;
        historyList.appendChild(div);
        cursor.continue();
      }
    };
  };
});