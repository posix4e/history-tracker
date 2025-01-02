import Foundation
import WebKit

class HistoryTracker: NSObject, WKNavigationDelegate {
    private var webView: WKWebView
    private let dbHelper: DatabaseHelper
    
    override init() {
        let config = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: config)
        dbHelper = DatabaseHelper()
        super.init()
        webView.navigationDelegate = self
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard let url = webView.url?.absoluteString,
              let title = webView.title else { return }
        
        dbHelper.saveVisit(url: url, title: title)
    }
}

class DatabaseHelper {
    private let queue = DispatchQueue(label: "com.historytracker.db")
    private let dbPath: String
    
    init() {
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        dbPath = (documentsPath as NSString).appendingPathComponent("history.sqlite")
        
        queue.sync {
            self.createTableIfNeeded()
        }
    }
    
    private func createTableIfNeeded() {
        guard let db = openDatabase() else { return }
        let createTable = """
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                title TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        """
        sqlite3_exec(db, createTable, nil, nil, nil)
        sqlite3_close(db)
    }
    
    func saveVisit(url: String, title: String) {
        queue.async {
            guard let db = self.openDatabase() else { return }
            let insert = "INSERT INTO history (url, title) VALUES (?, ?);"
            var statement: OpaquePointer?
            
            if sqlite3_prepare_v2(db, insert, -1, &statement, nil) == SQLITE_OK {
                sqlite3_bind_text(statement, 1, url, -1, nil)
                sqlite3_bind_text(statement, 2, title, -1, nil)
                sqlite3_step(statement)
            }
            
            sqlite3_finalize(statement)
            sqlite3_close(db)
        }
    }
    
    private func openDatabase() -> OpaquePointer? {
        var db: OpaquePointer?
        if sqlite3_open(dbPath, &db) == SQLITE_OK {
            return db
        }
        return nil
    }
}