
call tsc --build tsconfig.json
cd ..\..\..\src\ihjs\tools\
node build ..\..\..\demos\todo-demo\web-components-ts\build-config.js
cd ..\..\..\demos\stodo-demo\web-components-ts\