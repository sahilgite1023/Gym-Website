# Health N More Fitness - Development Setup

Write-Host "🏋️ Health N More Fitness - Starting Development Environment" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoCheck = Get-Process mongod -ErrorAction SilentlyContinue
if ($null -eq $mongoCheck) {
    Write-Host "⚠️  MongoDB is not running!" -ForegroundColor Red
    Write-Host "Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "  net start MongoDB" -ForegroundColor White
    Write-Host ""
    $response = Read-Host "Do you want to try starting MongoDB? (Y/N)"
    if ($response -eq 'Y' -or $response -eq 'y') {
        try {
            Start-Process "net" -ArgumentList "start MongoDB" -Verb RunAs -Wait
            Write-Host "✓ MongoDB started successfully" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to start MongoDB. Please start it manually." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Cannot continue without MongoDB. Exiting..." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ MongoDB is running" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Yellow

# Start backend server
$backendPath = Join-Path $PSScriptRoot "server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath' ; npm run dev" -WindowStyle Normal

Write-Host "✓ Backend server starting on http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow

# Start frontend server
$frontendPath = Join-Path $PSScriptRoot "client"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath' ; npm run dev" -WindowStyle Normal

Write-Host "✓ Frontend server starting on http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "🎉 Development environment is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "Access the application at:" -ForegroundColor Yellow
Write-Host "  Website: http://localhost:5173" -ForegroundColor White
Write-Host "  Admin Panel: http://localhost:5173/admin/login" -ForegroundColor White
Write-Host ""
Write-Host "Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
