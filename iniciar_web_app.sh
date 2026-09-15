#!/bin/bash
echo "======================================================="
echo "  Iniciando Servidor Web Multiplataforma de Calicatas"
echo "======================================================="
echo ""

# Navegar al directorio donde reside este script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Detectar comando python disponible
if command -v python3 &>/dev/null; then
    python3 start_web_app.py
elif command -v python &>/dev/null; then
    python start_web_app.py
else
    echo "[ERROR] Python no está instalado o no se encuentra en el PATH."
    exit 1
fi
