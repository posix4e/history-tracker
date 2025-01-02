const DB_NAME = 'historyTrackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'history';

let db;

function initDB() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  
  request.onerror = (event) => {
    console.error('Database error:', event.target.error);
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      store.createIndex('url', 'url', { unique: false });
      store.createIndex('timestamp', 'timestamp', { unique: false });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;
  };
}

function saveVisit(url, title) {
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  const visit = {
    url: url,
    title: title,
    timestamp: new Date().toISOString()
  };
  
  store.add(visit);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    saveVisit(tab.url, tab.title);
  }
});

initDB();