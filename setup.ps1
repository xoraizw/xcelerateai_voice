# VAPI Demo Share Setup Script
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   VAPI Demo Share - Setup Wizard" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if .env exists
if (Test-Path .env) {
    Write-Host "✓ Found .env file" -ForegroundColor Green
    
    # Check if VAPI key is configured
    $envContent = Get-Content .env -Raw
    if ($envContent -match 'NEXT_PUBLIC_VAPI_PUBLIC_KEY=""' -or $envContent -match 'NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_') {
        Write-Host "⚠ VAPI keys not configured yet" -ForegroundColor Yellow
        Write-Host "`nTo configure VAPI:" -ForegroundColor White
        Write-Host "1. Visit https://dashboard.vapi.ai" -ForegroundColor White
        Write-Host "2. Go to Settings → API Keys" -ForegroundColor White
        Write-Host "3. Copy your Public Key" -ForegroundColor White
        Write-Host "4. Edit .env file and add your key" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✓ VAPI keys configured" -ForegroundColor Green
    }
} else {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    Write-Host "Copying .env.example to .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ Created .env file - Please add your VAPI keys" -ForegroundColor Green
}

# Check if node_modules exists
if (Test-Path node_modules) {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠ Dependencies not installed" -ForegroundColor Yellow
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if database exists
if (Test-Path prisma\dev.db) {
    Write-Host "✓ Database exists" -ForegroundColor Green
} else {
    Write-Host "⚠ Database not found" -ForegroundColor Yellow
    Write-Host "Creating database..." -ForegroundColor Yellow
    npx prisma db push
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Make sure your VAPI keys are in .env" -ForegroundColor White
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Open: http://localhost:3000`n" -ForegroundColor White

Write-Host "For detailed instructions, see QUICKSTART.md`n" -ForegroundColor Gray
