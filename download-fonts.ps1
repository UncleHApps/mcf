$url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
$out = "public/fonts/fontawesome.min.css"
Write-Host "Downloading FA CSS..."
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
Write-Host "Done - $((Get-Item $out).Length) bytes"
