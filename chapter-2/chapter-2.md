# Chapter 2 - Front End Development

This chapter focuses on Front End development outside of AEM


## Proxy AEM

1. Add the following to `package.json`

```
"proxy": {
    "/content": {
      "target": "http://localhost:4502",
      "auth": "admin:admin"
    }
  }
```

2. create a file .env.development

```
REACT_APP_PAGE_MODEL_PATH=/content/wknd-events/react.model.json
```

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



