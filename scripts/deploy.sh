#!/bin/bash
set -e

# ─────────────────────────────────────────────────
# Configuración — ajusta estas variables según tu EC2
# ─────────────────────────────────────────────────
APP_DIR="/var/www/html"
BACKUP_DIR="/var/www/backup"
BUILD_FILE="$HOME/build.tar.gz"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "→ Iniciando deploy React/Vite"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Verificar que llegó el build
if [ ! -f "$BUILD_FILE" ]; then
  echo "✗ No se encontró $BUILD_FILE. Abortando."
  exit 1
fi

# 2. Backup del build actual
if [ -d "$APP_DIR" ]; then
  echo "→ Haciendo backup del build anterior..."
  sudo mkdir -p "$BACKUP_DIR"
  sudo rm -rf "$BACKUP_DIR"/*
  sudo cp -r "$APP_DIR/." "$BACKUP_DIR/"
  echo "✓ Backup guardado en $BACKUP_DIR"
fi

# 3. Limpiar directorio y descomprimir nuevo build
echo "→ Descomprimiendo nuevo build..."
sudo mkdir -p "$APP_DIR"
sudo rm -rf "$APP_DIR"/*
sudo tar -xzf "$BUILD_FILE" -C "$APP_DIR" --strip-components=1

# 4. Ajustar permisos para Nginx
echo "→ Ajustando permisos..."
sudo chmod -R 755 "$APP_DIR"
sudo chown -R www-data:www-data "$APP_DIR" 2>/dev/null || sudo chown -R nginx:nginx "$APP_DIR" 2>/dev/null || true

# 5. Validar y (re)iniciar Nginx
echo "→ Reiniciando Nginx..."
sudo nginx -t && sudo systemctl reload-or-restart nginx
echo "✓ Nginx reiniciado"

# 6. Limpiar archivo temporal
rm -f "$BUILD_FILE"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Deploy completado exitosamente"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
