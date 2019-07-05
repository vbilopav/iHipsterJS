cd ../src/ihjs/tools/
node build

node build ../../../demos/remote-data/module-view3-custom-build/build-config.js

tsc --build ../../../demos/simple-spa/typescript/tsconfig.json
node build ../../../demos/simple-spa/typescript/build-config.js

tsc --build ../../../demos/todo-demo/web-components-ts/tsconfig.json
node build ../../../demos/todo-demo/web-components-ts/build-config.js
