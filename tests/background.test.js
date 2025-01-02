const { jest } = require('@jest/globals');

describe('Background Script', () => {
  let db;
  
  beforeEach(() => {
    // Clear IndexedDB before each test
    indexedDB.deleteDatabase('historyTrackerDB');
    
    // Reset chrome API mocks
    jest.clearAllMocks();
    
    // Clear module cache
    jest.resetModules();
  });

  test('initializes database on startup', (done) => {
    require('../src/background');
    
    const request = indexedDB.open('historyTrackerDB', 1);
    
    request.onerror = () => {
      done('Database failed to open');
    };
    
    request.onsuccess = () => {
      db = request.result;
      expect(db.objectStoreNames.contains('history')).toBe(true);
      done();
    };
  });

  test('registers tab update listener', () => {
    require('../src/background');
    expect(chrome.tabs.onUpdated.addListener).toHaveBeenCalled();
  });

  test('saves visit to database when tab is updated', (done) => {
    require('../src/background');
    
    const request = indexedDB.open('historyTrackerDB', 1);
    request.onsuccess = () => {
      db = request.result;
      
      // Simulate tab update
      const tabInfo = {
        url: 'https://example.com',
        title: 'Example Page'
      };
      
      // Get the listener function that was registered
      const listener = chrome.tabs.onUpdated.addListener.mock.calls[0][0];
      
      // Call the listener with a completed status
      listener(1, { status: 'complete' }, tabInfo);
      
      // Check if the visit was saved
      const transaction = db.transaction(['history'], 'readonly');
      const store = transaction.objectStore('history');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        const visits = getAllRequest.result;
        expect(visits.length).toBe(1);
        expect(visits[0].url).toBe('https://example.com');
        expect(visits[0].title).toBe('Example Page');
        done();
      };
    };
  });
});