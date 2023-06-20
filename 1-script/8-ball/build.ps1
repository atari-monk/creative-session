$script = 'C:\atari-monk\Code\creative-session\1-script\8-ball'
$pixi = 'C:\atari-monk\Code\creative-session\4-pixi'
$lib = '\2-pixi-lib'
$client = '\5-client'
$server = '\6-server'
$ball = '\8-ball'

function build-proj($proj) {
  try {
    Set-Location ($pixi + $proj)
    npm run build
  }
  catch {
    Write-Host "An error occurred while building project $proj"
    set-script-folder
  }
}

function set-script-folder() {
  Set-Location $script
}

try {
  build-proj $lib
  build-proj $client
  build-proj $server
  build-proj $ball
}
catch {
  Write-Host "An unhandled error occurred."
}
finally {
  set-script-folder
}
