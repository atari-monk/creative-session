$pixi = 'C:\atari-monk\Code\creative-session\4-pixi'
$server = '\6-server'
$urlPlayer1 = 'http://127.0.0.1:5500/4-pixi/8-ball/?player=1'
$urlPlayer2 = 'http://127.0.0.1:5500/4-pixi/8-ball/?player=2'

function start-server {
  try {
    node game-server
  }
  catch {
    Write-Host "An error occurred while starting the server."
  }
}

function set-folder($folder) {
  try {
    Set-Location -Path $folder -ErrorAction Stop
  }
  catch {
    Write-Host "An error occurred while setting the folder: $folder"
  }
}

function Start-URLWithChrome {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Url
  )

  $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"

  try {
    Start-Process -FilePath $chromePath -ArgumentList $Url -ErrorAction Stop
  }
  catch {
    Write-Host "An error occurred while trying to start Chrome with URL: $Url"
  }
}

try {
  Start-URLWithChrome -Url $urlPlayer1
  Start-URLWithChrome -Url $urlPlayer2
  set-folder ($pixi + $server + '\dist')
  start-server
}
catch {
  Write-Host "An error occurred in the script execution."
}
