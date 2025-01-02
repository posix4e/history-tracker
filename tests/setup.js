require('fake-indexeddb/auto');
require('@testing-library/jest-dom');

// Mock chrome API
global.chrome = {
  tabs: {
    onUpdated: {
      addListener: jest.fn()
    },
    query: jest.fn()
  },
  runtime: {
    getManifest: jest.fn().mockReturnValue({ version: '1.0.0' }),
    getURL: jest.fn(path => `chrome-extension://mock-id/${path}`)
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn()
    }
  }
};