# Cleanup Script - Remove unused files from wedding invitation project

Write-Host "Cleaning up unused files..." -ForegroundColor Cyan

# Remove test API endpoint
if (Test-Path "api\test.js") {
    Remove-Item "api\test.js" -Force
    Write-Host "✓ Removed api/test.js" -ForegroundColor Green
}

# Remove old Wishes component backups
if (Test-Path "src\pages\Wishes_old.jsx") {
    Remove-Item "src\pages\Wishes_old.jsx" -Force
    Write-Host "✓ Removed src/pages/Wishes_old.jsx" -ForegroundColor Green
}

if (Test-Path "src\pages\Wishes_new.jsx") {
    Remove-Item "src\pages\Wishes_new.jsx" -Force
    Write-Host "✓ Removed src/pages/Wishes_new.jsx" -ForegroundColor Green
}

# Remove old data directory (replaced by Vercel KV)
if (Test-Path "data") {
    Remove-Item "data" -Recurse -Force
    Write-Host "✓ Removed data/ directory" -ForegroundColor Green
}

# Remove redundant deployment documentation
if (Test-Path "DEPLOYMENT.md") {
    Remove-Item "DEPLOYMENT.md" -Force
    Write-Host "✓ Removed DEPLOYMENT.md (use VERCEL_KV_SETUP.md instead)" -ForegroundColor Green
}

Write-Host "`nCleanup complete! ✨" -ForegroundColor Green
Write-Host "Your project is now clean and ready for deployment." -ForegroundColor Cyan
