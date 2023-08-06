cd ..
npm i
npm run build
cd build
npm pack
#install in ball
copy C:\atari-monk\Code\creative-session\4-pixi\5-client\build\atari-monk-client-0.0.1.tgz C:\atari-monk\Code\creative-session\4-pixi\8-ball
cd C:\atari-monk\Code\creative-session\4-pixi\8-ball
npm i atari-monk-client-0.0.1.tgz
#clean files
del C:\atari-monk\Code\creative-session\4-pixi\5-client\build\atari-monk-client-0.0.1.tgz
del C:\atari-monk\Code\creative-session\4-pixi\8-ball\atari-monk-client-0.0.1.tgz