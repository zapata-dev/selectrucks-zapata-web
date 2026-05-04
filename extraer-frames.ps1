# extraer-frames.ps1
# Extrae frames del video del camión rojo como archivos .webp para la animación de scroll
# Ejecutar desde: selectrucks-zapata web design/project/
# Prerequisito: ffmpeg instalado (winget install Gyan.FFmpeg)

$VideoPath = "..\Despiece camion rojo.mp4"
$OutputDir = ".\frames-camion-rojo"
$FPS = 15
$Width = 1280
$Quality = 80

Write-Host "`n=== Selectrucks Hero — Extracción de frames ===" -ForegroundColor Cyan

# Verificar ffmpeg
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "`n[ERROR] ffmpeg no encontrado. Instalar con:" -ForegroundColor Red
    Write-Host "  winget install Gyan.FFmpeg" -ForegroundColor Yellow
    Write-Host "  (Reiniciar terminal después de instalar)`n"
    exit 1
}

# Verificar video
if (-not (Test-Path $VideoPath)) {
    Write-Host "`n[ERROR] Video no encontrado: $VideoPath" -ForegroundColor Red
    exit 1
}

# Crear carpeta de salida
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
Write-Host "`n[1/3] Carpeta creada: $OutputDir" -ForegroundColor Green

# Extraer frames
Write-Host "[2/3] Extrayendo frames a $FPS fps, ancho $Width px, calidad $Quality..." -ForegroundColor Cyan
$Timer = [System.Diagnostics.Stopwatch]::StartNew()

ffmpeg -i $VideoPath `
    -vf "fps=$FPS,scale=${Width}:-1" `
    -q:v $Quality `
    "$OutputDir\frame_%04d.webp" `
    -y

$Timer.Stop()

# Contar frames generados
$FrameCount = (Get-ChildItem "$OutputDir\*.webp" -ErrorAction SilentlyContinue).Count

if ($FrameCount -eq 0) {
    Write-Host "`n[ERROR] No se generaron frames. Revisar ffmpeg output arriba." -ForegroundColor Red
    exit 1
}

Write-Host "`n[3/3] Extracción completa en $([math]::Round($Timer.Elapsed.TotalSeconds, 1))s" -ForegroundColor Green
Write-Host "  Frames generados: $FrameCount" -ForegroundColor White
Write-Host "  Tamaño total:     $([math]::Round((Get-ChildItem "$OutputDir\*.webp" | Measure-Object -Property Length -Sum).Sum / 1MB, 1)) MB" -ForegroundColor White

Write-Host "`n[SIGUIENTE PASO] Actualizar HERO_FRAME_COUNT en components-top.jsx:" -ForegroundColor Yellow
Write-Host "  const HERO_FRAME_COUNT = $FrameCount;" -ForegroundColor White
Write-Host ""
