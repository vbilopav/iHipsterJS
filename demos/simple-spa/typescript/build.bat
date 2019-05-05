
call tsc --build tsconfig.json
cd ..\..\..\src\ihjs\tools\
node build ..\..\..\demos\simple-spa\typescript\build-config.js
cd ..\..\..\demos\simple-spa\typescript\
