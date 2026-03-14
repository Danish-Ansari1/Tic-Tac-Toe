import http.server
import socketserver
import os
import webbrowser

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == '__main__':
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving Tic Tac Toe at http://localhost:{PORT}")
            # Automatically open the browser
            webbrowser.open(f"http://localhost:{PORT}")
            print("Press Ctrl+C to stop the local server.")
            httpd.serve_forever()
    except OSError as e:
        print(f"Server couldn't start on port {PORT}. Error: {e}")
        import os

if __name__ == "__main__":
    # Render को इस पोर्ट की ज़रूरत होती है
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
