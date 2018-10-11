# Chapter 2 - Front End Development

This chapter focuses on Front End development outside of AEM. In the previous chapter every time a change was made to the React app we had to endure a lengthy build and deploy process to AEM. In this chapter we will look at two different ways of developing the React app against the development server that comes packaged with the React app. Developers will be able to modify JS and CSS files and see the changes immediately reflected in the browser without having to do a full project build, resulting in rapid development. We will also install several popular front end tools to accelerate the development process.

## Install Sass Support

A React best practice is to keep each component modular and self contained. A general recomendation is to avoid re-using the same CSS class name across components, which make the use of preprocessors not as powerful. This project will use [Sass](https://sass-lang.com/) for a few useful features like variables and mixins. This project will also loosely follow [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/components.md). SUIT is a variation of BEM notation, Block Element Modifier, used to create consistent CSS rules.

Open a new terminal window.

1. Navigate to the `react-app` directory

  ```bash
  $ cd <src>/aem-guides-wknd-events/react-app
  ```

2. Install **[node-sass](https://github.com/sass/node-sass)**

  ```sh
  $ npm install node-sass --save
  ```
3. We can now use `.scss` files and the power of Sass in the project. More information can be found here for [adding a Sass stylesheet with a React project](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-sass-stylesheet).

4. Open up the `react-app` in the editor of your choice. 

  Add a folder beneath `react-app/src` named `styles`. 
  Add two files beneath `styles` named `_shared.scss` and `_variables.scss`

  ```diff
    /aem-guides-wknd-events
      /react-app
        /components
  +     /styles
  +        _shared.scss
  +        _variables.scss
  ```
  These files will include some global variables and mixins we want to re-use across the project.

5. Populate `_variables.scss` with the following:

  ```css
  //variables for WKND Events

  //Typography
  $em-base:             20px;
  $base-font-size:      1rem;
  $small-font-size:     1.4rem;
  $lead-font-size:      2rem;
  $title-font-size:     5.2rem;
  $h1-font-size:        3rem;
  $h2-font-size:        2.5rem;
  $h3-font-size:        2rem;
  $h4-font-size:        1.5rem;
  $h5-font-size:        1.3rem;
  $h6-font-size:        1rem;
  $base-line-height:    1.5;
  $heading-line-height: 1.3;
  $lead-line-height:    1.7;

  $font-serif:         'Asar', serif;
  $font-sans:          'Source Sans Pro', sans-serif;

  $font-weight-light:      300;
  $font-weight-normal:     400;
  $font-weight-semi-bold:  600;
  $font-weight-bold:       700;

  //Colors
  $color-white:            #ffffff;
  $color-black:            #080808;

  $color-yellow:           #FFEA08;
  $color-gray:             #808080;
  $color-dark-gray:        #707070;

  //Functional Colors

  $color-primary:          $color-yellow;
  $color-secondary:        $color-gray;
  $color-text:             $color-gray;
              

  //Layout
  $max-width: 1200px;

  // Spacing
  $gutter-padding: 12px;

  // Mobile Breakpoints
  $mobile-screen: 160px;
  $small-screen:  767px;
  $medium-screen: 992px;
  
  ```
6. Populate the `_shared.scss` with the following Sass mixins:

  ```css
  @import './variables';

  //Mixins
  @mixin media($types...) {
      @each $type in $types {

        @if $type == tablet {
          @media only screen and (min-width: $small-screen + 1) and (max-width: $medium-screen) {
            @content;
          }
        }
    
        @if $type == desktop {
          @media only screen and (min-width: $medium-screen + 1) {
            @content;
          }
        }

        @if $type == mobile {
          @media only screen and (min-width: $mobile-screen + 1) and (max-width: $small-screen) {
            @content;
          }
        }
      }
    }
    
    @mixin content-area () {
      max-width: $max-width;
      margin: 0 auto;
      padding: $gutter-padding;
    }

    @mixin component-padding() {
        padding: 0 $gutter-padding !important;
    }
  ```

  In the next sections we will start to use the above Sass variables and mixins in the application.


## Proxy JSON and other content from AEM

The first approach to rapid development will be to configure a proxy between the development server that is bundled with the React project and a local AEM instance. With this approach, requests to AEM content like the JSON Model and images will be made available and served as if the request(s) had originated on the static development server. 

See here for more information on [Proxying API Requests in Development](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development).

It is assumed that an AEM instance is running locally at http://localhost:4502.

In the editor of your choice open `/aem-guides-wknd-events/react-app`.

1. Update `react-app/package.json` to configure the proxy endpoint:

  ```diff
  "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build && clientlib --verbose",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "styleguide": "styleguidist server",
      "styleguide:build": "styleguidist build"
    },
  +  "proxy": "http://localhost:4502",
   "eslintConfig": {
    "extends": "react-app"
  }
  ```

2. Create a file beneath `/aem-guides-wknd-events/react-app` named `.env.development`. Populate it with the following:

  ```
  # Configure Proxy end point
  REACT_APP_PAGE_MODEL_PATH=/content/wknd-events/react.model.json
  ```
  `.env.development` is an example of an environment variables file when running the application in *development* mode. More information around setting up [environment variables can be found here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables). 
  
  In `src/index.js` there is already a line to initialize JSON Model using the environment variable `REACT_APP_PAGE_MODEL_PATH`:
  
  ```js
  // src/index.js
 
  ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);
  ```

  The request to `/content/wknd-events/react.model.json` won't exist on the static server, so it will be proxied in from AEM when running the app in development mode.

3. Open a terminal window and start the React app in development mode:

  ```bash
  $ cd <src>/aem-guides-wknd-events/react-app
  $ npm start

    Starting the development server...
    Compiled Successfully!

    You can now view react-app in the browser.
    Local:            http://localhost:3000/
  ```

4. Navigate to http://localhost:3000/content/wknd-events/react/home.html

  You should now see the React app on the development server running with the same content as on the AEM instance:

  ![proxy compare](./images/proxy-diff.png)

  > Important! Since AEM author instance has an authentication requirement it will be necessary to open a new tab in the browser and log in to the local AEM instance. If you see a blank screen this is most likely the case. 
  
  The way the proxy feature is set up in the [Create React App](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) (and at the time this tutorial was written) should negate any [CORS issues](http://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations) If you see any errors like below during development look at updating the [AEM CORS configuration](https://helpx.adobe.com/experience-manager/kt/platform-repository/using/cors-security-article-understand.html).

  ```
  Fetch API cannot load http://localhost:4502/content.... No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  ```

5. Re-name `/src/index.css` -> `index.scss`. Update `index.scss` with the following:

```css
/* src/index.scss */

@import './styles/shared';

/* Google Font import */
@import url('https://fonts.googleapis.com/css?family=Asar|Source+Sans+Pro:400,600,700');

body {
    //font-weight: $normal;
    background-color: $color-white;
    font-family: $font-sans;
    margin: 0;
    padding: 0;

    font-weight: $font-weight-light;
    font-size: $em-base;
    text-align: left;
    color: $color-black;
    line-height: 1.5;
    line-height: 1.6;
    letter-spacing: 0.3px;
}

h1, h2, h3, h4 {
    font-family: $font-sans;
}

h1 {
  font-size:  $h1-font-size;
}

h2 {
  font-size: $h2-font-size;
}

h3 {
  font-size: $h3-font-size;
}

h4 {
  font-size: $h4-font-size;
}

h5 {
  font-size: $h5-font-size;
}

h6 {
  font-size: $h6-font-size;
}

p {
  color: $color-text;
}

ul {
    list-style-position: inside;
}

// abstracts/overrides

ol, ul {
    padding-left: 0;
    margin-bottom: 0;
}

hr {
    height: 2px;
    //background-color: fade($dusty-gray, (.3*100));
    border: 0 none;
    margin: 0 auto;
    max-width: $max-width;
}

*:focus {
    outline: none;
}

textarea:focus, input:focus{
        outline: none;
}

body {
    overflow-x: hidden;
}

img {
    vertical-align: middle;
    border-style: none;
}
```

6. Update `src/index.js` to include `index.scss` instead of `index.css`:

```diff
/* src/index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
- import './index.scss';
+ import './index.scss';
import App from './App';
```

7. Return to the browser and navigate to http://localhost:3000/content/wknd-events/react/home.html.

  You should see that the fonts have changed. Make some test changes to `index.scss` and verify that the changes are automatically compiled and displayed on the static server.

  ![proxy reload](./images/proxy-reload.gif)

## Mock JSON

3. Update `src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, ModelClient, Constants } from '@adobe/cq-spa-page-model-manager';
import './index.css';
import App from './App';
import "./components/MappedComponents";

function render(model) {
    ReactDOM.render((
        <App cqChildren={ model[Constants.CHILDREN_PROP] } cqItems={ model[Constants.ITEMS_PROP] } cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
            cqPath={ ModelManager.rootPath } locationPathname={ window.location.pathname }/>), document.getElementById('root'));
}

ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);
```

## Style Guidist

https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#getting-started-with-styleguidist



## Update to use SASS (move to part 2?)

1. Install SASS

```
$ npm install node-sass --save
```

2. 


## Header Component

## Global Styles (SASS, Header)

## Responsive Grid

1. Create responsive grid Client library
2. update `clientlib.config.js` to include responsive grid
3. update `public/index.html` for dev purposes

## Install Storybook (optional)

## Update Image Component 

1. In AEM add a title to Image -> view nothing happens
2. View json output to see that title property is available
3. Return to the react-app -> update Image.js to include caption
4. Update SCSS
5. Test outside of AEM


Notes:

```
* Primary goal of this chapter is to create the Article Template
* Introduction of Layout Container and iterative concepts
* Integration of Responsive grid styles
* FED mock JSON → how to? how responsive styles are part of JSON
* Basic article page

1. Introduction of Layout Container / Responsive grid
2. Add Root + responsivegrid at Template
3. Update App.js to extend Container
4. Include page.js ?
5. Include SASS preprocessor to Webpack project
6. include WKND base variables/styles
7. Implement Title Component
8. Implement Image Component

```



