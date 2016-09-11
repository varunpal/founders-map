# Founders Map
Allow founders to add CSV data and view startups in a table or on a map.

## Setup
```
1. Clone the repo and open index.html on your favourite browser.
```

## Sample Data
```
Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude
1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://2xkcvt35vyxycuy7x23e0em1a5g.wpengine.netdna-cdn.com/wp-content/uploads/2015/04/Larry-Page-and-Sergey-Bri-005.jpg,http://google.com,37.457674,-122.163452
2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469
3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,https://pbs.twimg.com/profile_images/558109954561679360/j1f9DiJi.jpeg,http://microsoft.com,37.472189,-122.190191
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
1. [GULP](http://gulpjs.com/) has been used as the build system.
2. The js files have been concatenated and minified.
3. The Less files have been converted into CSS.

To fire up the build system:
1. run: 
```
npm install
```
2. To access your local gulp distribution run:
```
./node_modules/.bin/gulp
```
3. Install gulp globally
```
npm install -g gulp
```
and run:
```
gulp
```
