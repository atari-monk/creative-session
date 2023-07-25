npm i
npm run build
cd build
npm pack
#install in pixi-lib
copy C:\atari-monk\Code\creative-session\4-pixi\11-game-api-lib\build\atari-monk-game-api-lib-0.0.1.tgz C:\atari-monk\Code\creative-session\4-pixi\2-pixi-lib
cd C:\atari-monk\Code\creative-session\4-pixi\2-pixi-lib
npm i atari-monk-game-api-lib-0.0.1.tgz
#install in client
copy C:\atari-monk\Code\creative-session\4-pixi\11-game-api-lib\build\atari-monk-game-api-lib-0.0.1.tgz C:\atari-monk\Code\creative-session\4-pixi\5-client
cd C:\atari-monk\Code\creative-session\4-pixi\5-client
npm i atari-monk-game-api-lib-0.0.1.tgz
#clean files
del C:\atari-monk\Code\creative-session\4-pixi\11-game-api-lib\build\atari-monk-game-api-lib-0.0.1.tgz
del C:\atari-monk\Code\creative-session\4-pixi\2-pixi-lib\atari-monk-game-api-lib-0.0.1.tgz
del C:\atari-monk\Code\creative-session\4-pixi\5-client\atari-monk-game-api-lib-0.0.1.tgz