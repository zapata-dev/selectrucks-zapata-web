#!/usr/bin/env bash
# Pone en el repositorio de entrega para Marketing (zapata-dev/selectrucks-zapata-sitio, ya clonado en <destino>)
# la versión actual del sitio. Lo usa .github/workflows/entrega-marketing.yml en cada cambio a main.
#
# Uso: bash scripts/actualizar_entrega.sh <destino>
#      bash scripts/actualizar_entrega.sh --solo-verificar     (arma y revisa, sin tocar ningún repositorio)
#
# Qué entra:
#   - sitio/: las páginas, estilos, scripts, datos, assets/ y frames-camion-rojo/ del repositorio,
#   - entrega/README.md como README.md.
# Qué NO entra (EXCLUIR, abajo): el README interno, render.yaml, extraer-frames.ps1, las versiones «standalone»
# (copias de 5 MB con todo incrustado, y sus fuentes) y las carpetas de trabajo (.github/, scripts/, entrega/,
# docs/, tests/ y cualquier cosa que empiece con «_»).
#
# Antes de tocar <destino> revisa que no se cuele nada prohibido, corre scripts/verificar_entrega.py y gitleaks.
# Si algo falla, se detiene y <destino> queda igual. Al final deja un commit solo si hubo cambios; subirlo le
# toca a quien lo llama.
set -euo pipefail

DESTINO="${1:?uso: actualizar_entrega.sh <destino> | --solo-verificar}"
RAIZ="$(git rev-parse --show-toplevel)"
REF="$(git -C "$RAIZ" rev-parse --short HEAD)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if [ "$DESTINO" != "--solo-verificar" ]; then
  [ -d "$DESTINO/.git" ] || { echo "ALTO: $DESTINO no es un repositorio git"; exit 1; }
fi

# Lo que no viaja a Marketing (rutas del repositorio; se aceptan comodines).
EXCLUIR=(
  ".github" "scripts" "entrega" "docs" "tests" "_*"
  ".gitattributes" ".gitignore" "README.md" "AGENTS.md" "CLAUDE.md"
  "render.yaml" "extraer-frames.ps1"
  "* (standalone).html" "standalone-*src.html" "*.standalone.jsx"
)

# 1) Armar la versión en una carpeta temporal, desde lo que está en el commit (no de archivos sueltos sin subir).
mkdir -p "$TMP/sitio"
git -C "$RAIZ" archive HEAD | tar -x -C "$TMP/sitio"
for patron in "${EXCLUIR[@]}"; do
  find "$TMP/sitio" -mindepth 1 -maxdepth 1 -name "$patron" -exec rm -rf {} +
done
cp "$RAIZ/entrega/README.md" "$TMP/README.md"

# 2) Nada fuera de lo permitido.
fuera="$(cd "$TMP" && find . -mindepth 1 -maxdepth 1 ! -name sitio ! -name README.md)"
[ -z "$fuera" ] || { echo "ALTO: sobra $fuera"; exit 1; }
seguridad="$(grep -rlIwE 'Qualys|DAST|QID' "$TMP" || true)"
[ -z "$seguridad" ] || { echo "ALTO: material de seguridad en la entrega:"; echo "$seguridad"; exit 1; }
prohibidos="$(find "$TMP" \( -name '_*' -o -name 'AGENTS.md' -o -name 'CLAUDE.md' -o -name '*.xlsx' -o -name '.env*' \
  -o -name '*.pem' -o -name '*.key' -o -name '*.ps1' -o -name '*.mp4' -o -name '*(standalone)*' \))"
[ -z "$prohibidos" ] || { echo "ALTO: archivos prohibidos:"; echo "$prohibidos"; exit 1; }

# 3) Verificación del sitio (referencias, dominios externos, acentos) y gitleaks sobre lo que se va a entregar.
python3 "$RAIZ/scripts/verificar_entrega.py" "$TMP/sitio"
gitleaks dir --redact --no-banner "$TMP"

if [ "$DESTINO" = "--solo-verificar" ]; then
  echo "Entrega verificada ($(find "$TMP/sitio" -type f | wc -l) archivos, $(du -sh "$TMP/sitio" | cut -f1)); no se tocó ningún repositorio."
  exit 0
fi

# 4) Reemplazar el contenido de <destino> (conserva su .git) y dejar un commit si hubo cambios.
find "$DESTINO" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a "$TMP"/. "$DESTINO"/
git -C "$DESTINO" add -A
if git -C "$DESTINO" diff --cached --quiet; then
  echo "Sin cambios para la entrega."
  exit 0
fi
git -C "$DESTINO" commit -q -m "Actualización desde selectrucks-zapata-web@$REF"
gitleaks git --redact --no-banner --log-opts="-1" "$DESTINO"
git -C "$DESTINO" log -1 --format='Listo: %h %s'
