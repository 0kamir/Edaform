import http.server
import socketserver
import webbrowser
import os
import sys

DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'web_app')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def find_available_port(start_port=8000, max_attempts=10):
    for port in range(start_port, start_port + max_attempts):
        try:
            server = ReusableTCPServer(("", port), Handler)
            return server, port
        except OSError:
            continue
    return None, None

server, port = find_available_port(8000)
if not server:
    print("Error: No se pudo enlazar ningún puerto disponible entre 8000 y 8010.")
    sys.exit(1)

url = f"http://localhost:{port}"
print(f"\n=======================================================")
print(f"  Edaform — Calicatas WebGIS (USDA)")
print(f"  Servidor local activo en: {url}")
print(f"  Presiona Ctrl+C para detener.")
print(f"=======================================================\n")

try:
    webbrowser.open(url)
except Exception:
    pass

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nServidor detenido correctamente.")
finally:
    server.server_close()
