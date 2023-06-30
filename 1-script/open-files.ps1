param (
    [string]$FileName1,
    [string]$FileName2
)

$projectFolder = "C:\atari-monk\Code\creative-session\4-pixi\2-pixi-lib\src\"

# Function to find file in project folder
function Find-FileInProject($fileName) {
    Get-ChildItem -Path $projectFolder -Filter $fileName -Recurse -File | Select-Object -First 1 -ExpandProperty FullName
}

# Find file paths
$filePath1 = Find-FileInProject -fileName $FileName1
$filePath2 = Find-FileInProject -fileName $FileName2

# Open files in split editor view
if (![string]::IsNullOrEmpty($filePath1) -and ![string]::IsNullOrEmpty($filePath2)) {
    & code --add $filePath1 --add $filePath2
}
elseif (![string]::IsNullOrEmpty($filePath1)) {
    & code --add $filePath1
}
elseif (![string]::IsNullOrEmpty($filePath2)) {
    & code --add $filePath2
}
