describe('Background Script', () => {
  let mockChrome;
  
  beforeEach(() => {
    // Mock chrome API
    mockChrome = {
      tabs: {
        onUpdated: {
          addListener: jest.fn()
        }
      }
    };
    global.chrome = mockChrome;
    
    // Mock IndexedDB
    const mockIDBRequest = {
      onerror: null,
      onsuccess: null,
      onupgradeneeded: null,
      result: {
        createObjectStore: jest.fn().mockReturnValue({
          createIndex: jest.fn()
        }),
        objectStoreNames: {
          contains: jest.fn().mockReturnValue(false)
        }
      }
    };
    
    global.indexedDB = {
      open: jest.fn().mockReturnValue(mockIDBRequest)
    };
  });

  test('initializes database on startup', () => {
    require('../src/background');
    expect(global.indexedDB.open).toHaveBeenCalledWith('historyTrackerDB', 1);
  });

  test('registers tab update listener', () => {
    require('../src/background');
    expect(mockChrome.tabs.onUpdated.addListener).toHaveBeenCalled();
  });
});