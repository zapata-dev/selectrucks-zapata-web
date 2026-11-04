#!/usr/bin/env python3
"""Revisa la carpeta del sitio que se entrega a Marketing antes de copiarla a zapata-dev/selectrucks-zapata-sitio.

Uso: python3 scripts/verificar_entrega.py <carpeta-del-sitio>

Revisa cuatro cosas y termina con código 1 si alguna falla:
  1. Referencias locales: cada archivo que piden las páginas (src, href, url(...) y rutas entre comillas
     como 'assets/logo.png') existe dentro de la entrega.
  2. Dominios externos: solo los de DOMINIOS_PERMITIDOS. Agregar uno nuevo (un script, una analítica) es una
     decisión que se revisa, no algo que se cuele solo.
  3. Acentos: nada de texto mal codificado («MÃ©xico», «â€“», «Corporaci?n» o el carácter de reemplazo �).
  4. Animación del Home: HERO_FRAME_COUNT coincide con las imágenes de frames-camion-rojo/.
"""
from __future__ import annotations

import os
import re
import sys
import urllib.parse
from pathlib import Path

DOMINIOS_PERMITIDOS = {
    "fonts.googleapis.com",  # tipografías
    "fonts.gstatic.com",
    "unpkg.com",  # React 18 y Babel (con integrity)
    "maps.google.com",  # enlaces «Cómo llegar» de sucursales
    "wa.me",  # botones de WhatsApp
    "www.w3.org",  # espacios de nombres de SVG, no se descarga nada
}

TEXTO = {".html", ".jsx", ".js", ".css", ".svg"}
EXTENSIONES_REF = r"png|jpe?g|webp|gif|svg|ico|css|js|jsx|html|mp4|webm|woff2?|ttf|pdf"

# Atributos src/href y url(...) de CSS.
RE_ATRIBUTO = re.compile(r"""\b(?:src|href)\s*=\s*["']([^"'{}]+)["']""")
RE_URL_CSS = re.compile(r"""url\(\s*["']?([^"')]+?)["']?\s*\)""")
# Rutas sueltas entre comillas, como 'assets/logo-selectrucks.png' dentro de data.js o un .jsx.
RE_RUTA_SUELTA = re.compile(rf"""["']([A-Za-z0-9_./ %-]{1,200}\.(?:{EXTENSIONES_REF}))(?:\?[^"']*)?["']""")
RE_DOMINIO = re.compile(r"https?://([A-Za-z0-9.-]+)")

# Texto UTF-8 que se leyó como Latin-1/Windows-1252 y se volvió a guardar.
RE_MOJIBAKE = re.compile(r"Ã[\u0080-¿]|â€|Â[·°ºª¡¿ ]")
# «?» entre dos letras dentro de una palabra, fuera de URLs y rutas («Corporaci?n», pero no «mapa.png?v=2»).
RE_INTERROGACION = re.compile(r"[A-Za-zÁÉÍÓÚáéíóúÑñ]\?[a-záéíóúñ]")
SEPARADORES = set(" \t\"'<>`(){}=,;")


def palabras_con_interrogacion(linea: str) -> list[str]:
    """Palabras con «?» entre letras («Corporaci?n»), sin contar URLs ni rutas («mapa.png?v=2»)."""
    palabras = []
    for m in RE_INTERROGACION.finditer(linea):
        ini, fin = m.start(), m.end()
        while ini > 0 and linea[ini - 1] not in SEPARADORES and m.start() - ini < 80:
            ini -= 1
        while fin < len(linea) and linea[fin] not in SEPARADORES and fin - m.end() < 80:
            fin += 1
        palabra = linea[ini:fin].rstrip(".,;:!)")
        if not re.search(r"[/.=:&]", palabra):
            palabras.append(palabra)
    return palabras


def es_local(ref: str) -> bool:
    ref = ref.strip()
    if not ref or ref.startswith(("#", "//", "data:", "mailto:", "tel:", "javascript:", "blob:")):
        return False
    if re.match(r"^[a-z][a-z0-9+.-]*:", ref, re.I):
        return False
    return "${" not in ref


def limpiar(ref: str) -> str:
    ref = ref.split("#", 1)[0].split("?", 1)[0]
    return urllib.parse.unquote(ref)


def revisar(raiz: Path) -> list[str]:
    problemas: list[str] = []
    archivos = [p for p in raiz.rglob("*") if p.is_file() and ".git" not in p.relative_to(raiz).parts]
    for archivo in sorted(archivos):
        if archivo.suffix.lower() not in TEXTO:
            continue
        rel = archivo.relative_to(raiz).as_posix()
        texto = archivo.read_text(encoding="utf-8", errors="replace")

        refs = set(RE_ATRIBUTO.findall(texto)) | set(RE_URL_CSS.findall(texto)) | set(RE_RUTA_SUELTA.findall(texto))
        for ref in sorted(refs):
            if not es_local(ref):
                continue
            destino = (archivo.parent / limpiar(ref)).resolve()
            if not destino.is_relative_to(raiz.resolve()):
                problemas.append(f"{rel}: «{ref}» apunta fuera del sitio")
            elif not destino.exists():
                problemas.append(f"{rel}: falta «{ref}»")

        for dominio in sorted({d.lower() for d in RE_DOMINIO.findall(texto)}):
            if dominio not in DOMINIOS_PERMITIDOS:
                problemas.append(f"{rel}: dominio externo no permitido «{dominio}» (ver DOMINIOS_PERMITIDOS)")

        for n, linea in enumerate(texto.splitlines(), 1):
            hallazgos = RE_MOJIBAKE.findall(linea)
            if "�" in linea:
                hallazgos.append("�")
            hallazgos += palabras_con_interrogacion(linea)
            if hallazgos:
                muestra = ", ".join(sorted(set(hallazgos))[:4])
                problemas.append(f"{rel}:{n}: acentos mal codificados ({muestra})")

    principal = raiz / "components-top.jsx"
    if principal.exists():
        m = re.search(r"HERO_FRAME_COUNT\s*=\s*(\d+)", principal.read_text(encoding="utf-8", errors="replace"))
        cuadros = len(list((raiz / "frames-camion-rojo").glob("frame_*.webp")))
        if m and int(m.group(1)) != cuadros:
            problemas.append(
                f"components-top.jsx: HERO_FRAME_COUNT = {m.group(1)}, pero frames-camion-rojo/ tiene {cuadros} imágenes"
            )
    return problemas


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__.strip().splitlines()[2], file=sys.stderr)
        return 2
    raiz = Path(sys.argv[1])
    if not raiz.is_dir():
        print(f"ALTO: {raiz} no es una carpeta", file=sys.stderr)
        return 2
    problemas = revisar(raiz)
    for p in problemas:
        print(f"::error::{p}" if "GITHUB_ACTIONS" in os.environ else f"- {p}")
    if problemas:
        print(f"\n{len(problemas)} problema(s); la entrega no se actualiza.")
        return 1
    print("Verificación de la entrega: sin problemas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
