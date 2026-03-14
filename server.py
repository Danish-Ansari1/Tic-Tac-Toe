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
