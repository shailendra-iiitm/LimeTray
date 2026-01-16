# Script to create commits with random timestamps between Jan 15 8PM and Jan 16 7PM 2026

Write-Host "=== Creating Commits with Random Timestamps ===" -ForegroundColor Cyan

# Configuration
$startDate = Get-Date "2026-01-15 20:00:00"
$endDate = Get-Date "2026-01-16 19:00:00"

# Define commit groups (files to commit together with messages)
$commitPlan = @(
    @{
        Files = @("package.json", "vite.config.js", "eslint.config.js", "postcss.config.js", "tailwind.config.js", "index.html", "package-lock.json")
        Message = "Initial project setup with Vite, React, and Tailwind CSS"
    },
    @{
        Files = @(".gitignore")
        Message = "Added gitignore for node_modules and build files"
    },
    @{
        Files = @("src/index.css")
        Message = "Added base styles and Tailwind directives"
    },
    @{
        Files = @("src/context/ThemeContext.jsx")
        Message = "Implemented theme context for dark/light mode support"
    },
    @{
        Files = @("src/hooks/useLocalStorage.js")
        Message = "Added custom hook for localStorage persistence"
    },
    @{
        Files = @("src/context/TaskContext.jsx")
        Message = "Created task context with CRUD operations and localStorage"
    },
    @{
        Files = @("src/components/Header.jsx")
        Message = "Built header component with theme toggle"
    },
    @{
        Files = @("src/components/TaskForm.jsx")
        Message = "Implemented task creation and editing form with validation"
    },
    @{
        Files = @("src/components/TaskItem.jsx")
        Message = "Created task item component with edit, delete, and complete actions"
    },
    @{
        Files = @("src/components/TaskList.jsx")
        Message = "Added task list component with rendering logic"
    },
    @{
        Files = @("src/components/TaskFilter.jsx")
        Message = "Implemented filter functionality for all/active/completed tasks"
    },
    @{
        Files = @("src/App.jsx", "src/main.jsx", "src/App.css", "public/vite.svg", "src/assets/react.svg")
        Message = "Integrated all components and added final styling"
    },
    @{
        Files = @("README.md")
        Message = "Add project documentation and setup instructions"
    }
)

$totalCommits = $commitPlan.Count
Write-Host "Will create $totalCommits commits" -ForegroundColor Yellow

# Generate random timestamps and sort them
$timeSpan = $endDate - $startDate
$totalMinutes = [int]$timeSpan.TotalMinutes

$timestamps = @()
for ($i = 0; $i -lt $totalCommits; $i++) {
    $randomMinutes = Get-Random -Minimum 0 -Maximum $totalMinutes
    $randomDate = $startDate.AddMinutes($randomMinutes)
    $timestamps += $randomDate
}
$timestamps = $timestamps | Sort-Object

Write-Host ""
Write-Host "Generated timestamps:" -ForegroundColor Green
for ($i = 0; $i -lt $timestamps.Count; $i++) {
    $timeStr = $timestamps[$i].ToString('yyyy-MM-dd HH:mm:ss')
    $msg = $commitPlan[$i].Message
    Write-Host "  $($i + 1). $timeStr - $msg"
}

Write-Host ""
Write-Host "Creating commits..." -ForegroundColor Cyan

# Unstage all files first
git reset 2>&1 | Out-Null

# Create commits
for ($i = 0; $i -lt $totalCommits; $i++) {
    $commit = $commitPlan[$i]
    $timestamp = $timestamps[$i].ToString('yyyy-MM-dd HH:mm:ss')
    
    Write-Host ""
    Write-Host "Commit $($i + 1)/$totalCommits" -ForegroundColor Yellow
    Write-Host "  Files: $($commit.Files -join ', ')"
    Write-Host "  Message: $($commit.Message)"
    Write-Host "  Time: $timestamp"
    
    # Stage files for this commit
    foreach ($file in $commit.Files) {
        git add $file 2>&1 | Out-Null
    }
    
    # Create commit with custom date
    $env:GIT_AUTHOR_DATE = $timestamp
    $env:GIT_COMMITTER_DATE = $timestamp
    git commit -m $commit.Message 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Success" -ForegroundColor Green
    } else {
        Write-Host "  Failed" -ForegroundColor Red
    }
}

# Clean up environment variables
Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host ""
Write-Host "View commits:" -ForegroundColor Yellow
git log --oneline
