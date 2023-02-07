 # TS Set up
 
 Install the typescript package as a dev dependency
```
npm init
npm install typescript --save-dev
```
<br>


```json
{
  // ..
  "scripts": {
    "tsc": "tsc"  },
  // ..
}
```
To initialize our tsconfig.json settings by running:
```
npm run tsc -- --init
```
<br>

At the moment, we want the following to be active:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```
> ***strict*** is a shorthand for multiple separate options: noImplicitAny, noImplicitThis, alwaysStrict, strictBindCallApply, strictNullChecks, strictFunctionTypes and strictPropertyInitialization.

<br>

installing express and, of course, also @types/express and ESlint:
```
npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
<br>

Now our package.json should look like this:

```json
{
  "name": "flight_diary",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "tsc": "tsc"
  },
  "author": "Jane Doe",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@typescript-eslint/eslint-plugin": "^5.12.1",
    "@typescript-eslint/parser": "^5.12.1",
    "eslint": "^8.9.0",
    "typescript": "^4.5.5"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}
```
<br>

We also create a .eslintrc file with the following content:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```
> Create a .eslintignore file that lists the content we want ESlint to ignore.
<br>

To set up our development environment let's install ts-node-dev:
```
npm install --save-dev ts-node-dev
```
<br>

Finally define a few more npm scripts:

```json
{
  // ...
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts .",
    "start": "node build/index.js"
  },
  // ...
}
```
> ___"node build/index.js"___ adds an npm script for running the application in production mode.