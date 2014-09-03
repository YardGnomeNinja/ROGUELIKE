set project=roguelike
set spritesFolder=sprites

REM Build Sprite Sheet

"d:\spritesheetpacker\sspack" /image:"D:\Source\Projects\%project%\default.png" /map:"D:\Source\Projects\%project%\default.json" /pad:0 /sqr /il:"D:\Source\Projects\%project%\%spritesFolder%\list.txt" "D:\Source\Projects\%project%\%spritesFolder%\*.*"

REM Create www folder

IF NOT EXIST "c:\wamp\www\%project%\%spritesFolder%" mkdir "c:\wamp\www\%project%\%spritesFolder%"

REM Copy files

COPY "D:\Source\Libraries\Phaser\build\phaser.js" "c:\wamp\www\%project%" /Y
COPY "D:\Source\Libraries\Phaser\build\phaser.min.js" "c:\wamp\www\%project%" /Y

COPY "D:\Source\Projects\%project%\index.html" "c:\wamp\www\%project%" /Y
COPY "D:\Source\Projects\%project%\*.js" "c:\wamp\www\%project%" /Y
COPY "D:\Source\Projects\%project%\*.png" "c:\wamp\www\%project%\%spritesFolder%" /Y
COPY "D:\Source\Projects\%project%\*.json" "c:\wamp\www\%project%\%spritesFolder%" /Y

REM Fire up Chrome with the game

"C:\Users\Sigo\AppData\Local\Google\Chrome\Application\chrome.exe" "localhost/%project%"