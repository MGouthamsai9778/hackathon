# Helper script to start the dev server from the correct project folder
# Run this from the parent folder (C:\Users\GOUTH\OneDrive\Desktop\FOOD)
# Usage: .\start-dev.ps1

Set-Location -Path "$PSScriptRoot\foodwaste"
npm run dev
