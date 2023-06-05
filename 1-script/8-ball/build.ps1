$script = 'C:\atari-monk\Code\creative-session\1-script'
$pixi = 'C:\atari-monk\Code\creative-session\4-pixi'
$lib = '\2-pixi-lib'
$client = '\5-client'
$server = '\6-server'
$ball = '\8-ball'

function build-ts-proj($proj) {
  try {
    Set-Location ($pixi + $proj)
    tsc
  }
  catch {
    Write-Host "An error occurred while building TypeScript project $proj"
    set-script-folder
  }
}

function build-webpack-proj($proj) {
  try {
    Set-Location ($pixi + $proj)
    npx webpack --config webpack.config.js
  }
  catch {
    Write-Host "An error occurred while building Webpack project $proj"
    set-script-folder
  }
}

function set-script-folder() {
  Set-Location $script
}

try {
  build-ts-proj $lib
  build-ts-proj $client
  build-ts-proj $server
  build-webpack-proj $ball
}
catch {
  Write-Host "An unhandled error occurred."
}
finally {
  set-script-folder
}
