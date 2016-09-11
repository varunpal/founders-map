# Founders Map
Allow founders to add CSV data and view startups in a table or on a map.

## Setup
```
1. Clone the repo and open index.html on your favourite browser.
```

## Repo Structure
```javascript
1. The source files are under the assets folder.
2. The minified files are under dist folder.

The repo structure is as follows:
   --assets
      --scripts
          -- .js files
      --styles
          -- .less files
```

## Build System
```javascript

1. [GULP](http://gulpjs.com/) has been used as the build system.
2. The js files have been concatenated and minified.
3. The Less files have been converted into CSS.

To fire up the build system:
1. run: 
npm install

2. To access your local gulp distribution run:
./node_modules/.bin/gulp

3. Install gulp globally
npm install -g gulp
and run: gulp
```