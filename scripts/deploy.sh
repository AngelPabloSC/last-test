#!/bin/bash
set -e

# ─────────────────────────────────────────────────
# Configuración — ajusta estas variables según tu EC2
# ─────────────────────────────────────────────────
APP_DIR="/var/www/html"
BACKUP_DIR="/var/www/backup"
BUILD_FILE="$HOME/build.tar.gz"
NGINX_CONF="/etc/nginx/sites-available/nova-solutions"
DOMAIN="nova-solutions.us"

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
  mkdir -p "$BACKUP_DIR"
  rm -rf "$BACKUP_DIR"/*
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

# 5. Escribir config de Nginx con SPA fallback
echo "→ Configurando Nginx..."
sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    root $APP_DIR;
    index index.html;

    # Rutas prerendereadas y SPA fallback
    # Intenta: archivo exacto → ruta/index.html → /index.html (React Router)
    location / {
        try_files \$uri \$uri/index.html \$uri.html /index.html;
    }

    # Cache de 1 año para assets con hash (Vite genera nombres únicos)
    location ~* \.(js|css|woff2|woff|ttf|otf|ico|png|jpg|jpeg|svg|webp|gif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    # Sin cache para index.html (siempre sirve la versión más nueva)
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Rutas del admin y login nunca se cachean (requieren auth dinámica)
    location ~* ^/(login|admin) {
        try_files \$uri \$uri/index.html /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 404 del servidor → React Router lo maneja con su propia página 404
    error_page 404 /index.html;
}
EOF

# Activar config si no está enlazada
if [ ! -L /etc/nginx/sites-enabled/nova-solutions ]; then
  sudo ln -s "$NGINX_CONF" /etc/nginx/sites-enabled/nova-solutions
  echo "✓ Config de Nginx activada"
fi

# 6. Validar y recargar Nginx
echo "→ Recargando Nginx..."
sudo nginx -t && sudo nginx -s reload
echo "✓ Nginx recargado"

# 7. Limpiar archivo temporal
rm -f "$BUILD_FILE"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Deploy completado exitosamente"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
