#!/bin/bash
set -e

# ─────────────────────────────────────────────────
# Configuración — ajusta estas variables según tu EC2
# ─────────────────────────────────────────────────
APP_DIR="/var/www/html"          # Directorio raíz que sirve Nginx
BACKUP_DIR="/var/www/backup"     # Directorio de respaldo (opcional)
BUILD_FILE="$HOME/build.tar.gz"  # Ruta donde llega el archivo vía SCP

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "→ Iniciando deploy React/Vite"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Verificar que llegó el build
if [ ! -f "$BUILD_FILE" ]; then
  echo "✗ No se encontró $BUILD_FILE. Abortando."
  exit 1
fi

# 2. Backup del build actual (por si hay que hacer rollback)
if [ -d "$APP_DIR" ]; then
  echo "→ Haciendo backup del build anterior..."
  mkdir -p "$BACKUP_DIR"
  rm -rf "$BACKUP_DIR/dist"
  cp -r "$APP_DIR/." "$BACKUP_DIR/"
  echo "✓ Backup guardado en $BACKUP_DIR"
fi

# 3. Limpiar directorio y descomprimir nuevo build
echo "→ Descomprimiendo nuevo build..."
mkdir -p "$APP_DIR"
rm -rf "$APP_DIR"/*
tar -xzf "$BUILD_FILE" -C "$APP_DIR" --strip-components=1

# 4. Ajustar permisos para Nginx
echo "→ Ajustando permisos..."
chmod -R 755 "$APP_DIR"
chown -R www-data:www-data "$APP_DIR" 2>/dev/null || chown -R nginx:nginx "$APP_DIR" 2>/dev/null || true

# 5. Recargar Nginx de forma graceful
echo "→ Recargando Nginx..."
sudo nginx -t && sudo nginx -s reload

# 6. Limpiar archivo temporal
rm -f "$BUILD_FILE"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Deploy completado exitosamente"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
