# animation.js

Simple Javascript Animation 

* Super light( less than 100 lines of code, less than 2KB gzipped)
* Super fast
* Expansion in mind

## USAGE
Install it
```
$ npm install animation.js -D
```
Simply import the module into your code and run:
```
import {slideInRight} from 'animation.js';
slideInRight(el);
```

Or, more 
```
import {Animation, slideInRight} from 'animation.js';
Animation.DURATION = 2000;
Animation.TIMING = 'Animation.timingFunctions.inOutExpo';
slideInRight(el);
```

Or, to fully control your animation
```
mport {animate} from 'animations.js';

animate(
  1000,                                     // DURATION
  function(t) { return Math.pow(t, 1.675) } // timing function
  function(pct) { el.style.opacity = pct  } // draw function  
).then(function() {
  el.removeAttribute('style')
});
```

## For Developer

### Directories

* docs: github pages files
  * To set github pages with this directory, follow [github instruction](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)

### Commands
``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm start
# build for production with minification
npm run build
```
