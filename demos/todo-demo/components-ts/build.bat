
call tsc --build tsconfig.json
cd ..\..\..\src\ihjs\tools\
node build ..\..\..\demos\todo-demo\components-ts\build-config.js
cd ..\..\..\demos\todo-demo\components-ts\
