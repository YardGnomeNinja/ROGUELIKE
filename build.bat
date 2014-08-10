REM Build Sprite Sheet

"d:\spritesheetpacker\sspack" /image:"D:\Source\Projects\roguelike\default.png" /map:"D:\Source\Projects\roguelike\default.jsona" /pad:0 /sqr /il:"D:\Source\Projects\roguelike\sprites\list.txt" "D:\Source\Projects\roguelike\sprites\*.*"

REM Create Roguelike folder

IF NOT EXIST "c:\wamp\www\roguelike\tiles" mkdir "c:\wamp\www\roguelike\tiles"

REM Copy files

COPY "D:\Source\Libraries\Phaser\build\phaser.js" "c:\wamp\www\roguelike" /Y
COPY "D:\Source\Libraries\Phaser\build\phaser.min.js" "c:\wamp\www\roguelike" /Y

COPY "D:\Source\Projects\roguelike\index.html" "c:\wamp\www\roguelike" /Y
COPY "D:\Source\Projects\roguelike\*.js" "c:\wamp\www\roguelike" /Y
COPY "D:\Source\Projects\roguelike\*.png" "c:\wamp\www\roguelike\tiles" /Y
COPY "D:\Source\Projects\roguelike\*.jsona" "c:\wamp\www\roguelike\tiles" /Y

REM Fire up Chrome with the game

"C:\Users\Sigo\AppData\Local\Google\Chrome\Application\chrome.exe" "localhost/roguelike"