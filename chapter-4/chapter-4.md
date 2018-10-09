# Chapter 4

# List Component

```
"list": {
"dateFormatString": "yyyy-MM-dd",
"items": [
            {
            "url": "/content/wknd/en/sport/la-skateparks.html",
            "path": "/content/wknd/en/sport/la-skateparks",
            "title": "Ultimate guide to LA skateparks.",
            "description": null,
            "lastModified": 1523300221730
            },
            {
            "url": "/content/wknd/en/sport/five-gyms-la.html",
            "path": "/content/wknd/en/sport/five-gyms-la",
            "title": "Flow with the Go. 5 Gyms in LA.",
            "description": null,
            "lastModified": 1519755202858
            }
        ],
"showDescription": false,
"showModificationDate": true,
"linkItems": true,
":type": "wknd/components/content/list"
}
```

1. In `react-app` create List Component
2. First iteration:

```

import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';


const ListEditConfig = {

    emptyLabel: 'List',

    isEmpty: function() {
        return !this.props || !this.props.items || this.props.items.length < 1;
    }
};

/**
 * ListItem renders the individual items in the list
 */
class ListItem extends Component {

    render() {

        if(!this.props.path || !this.props.title || !this.props.url) {
            return null;
        }

        return (
            <li className="ListItem" key={this.props.path}>
                <a className="ListItem-link" href={this.props.url}>{this.props.title}</a> 
            </li>
        );

    }
}

class List extends Component {
    render() {
        return (
                <nav className="List">
                    <ul className="List-wrapper">
                        { this.props.items && this.props.items.map((listItem, index) => {
                            return <ListItem path={listItem.path} url={listItem.url} title={listItem.title} />
                            })
                       }
                    </ul>
                </nav>
        );
    }
}

export default MapTo("wknd-events/components/content/list")(List, ListEditConfig);
```


# Install React Router

1. 

```
npm install --save react-router
```

2. 

```
npm install --save react-router-dom
```

3. Update index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, ModelClient, Constants } from '@adobe/cq-spa-page-model-manager';
import './index.scss';
import App from './App';
import "./components/MappedComponents";
import {BrowserRouter} from 'react-router-dom';

function render(model) {
    ReactDOM.render((
        <BrowserRouter>
            <App cqChildren={ model[Constants.CHILDREN_PROP] } cqItems={ model[Constants.ITEMS_PROP] } cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
                 cqPath={ ModelManager.rootPath } locationPathname={ window.location.pathname }/>
        </BrowserRouter>), document.getElementById('root'));
}

ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);
```

4. Add Utils for RouteHelper

```
import React, {Component} from 'react';
 import {Route} from 'react-router-dom';
 
 /**
  * Helper that facilitate the use of the {@link Route} component
  */
 
 /**
  * Returns a composite component where a {@link Route} component wraps the provided component
  *
  * @param {React.Component} WrappedComponent    - React component to be wrapped
  * @param {string} [extension=html]             - extension used to identify a route amongst the tree of resource URLs
  * @returns {CompositeRoute}
  */
 export const withRoute = (WrappedComponent, extension) => {
     return class CompositeRoute extends Component {
         render() {
             let routePath = this.props.cqPath;
             if (!routePath) {
                 return <WrappedComponent {...this.props}/>;
             }
 
             extension = extension || 'html';
 
             // Context path + route path + extension
             return <Route key={ routePath } path={ '(.*)' + routePath + '.' + extension } render={ (routeProps) => {
                 return <WrappedComponent {...this.props} {...routeProps}/>;
             } } />
         }
     }
 };
```

5. Update Page.js

```
/*
    Page.js

    - WKND specific implementation of Page
    - Maps to wknd-events/components/structure/page
*/

import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
import {withRoute} from '../../utils/RouteHelper';
require('./Page.scss');

 // This component is a variant of a React Page component mapped to the "structure/page" resource type
 // For now, the rendering is the same as the RootPage; this is more for illustration purposes
 class WkndPage extends Page {
 
     get containerProps() {
         let attrs = super.containerProps;
         attrs.className = (attrs.className || '') + ' WkndPage ' + (this.props.cssClassNames || '');
         return attrs
     }
 }
 
MapTo('wknd-events/components/structure/page')(withComponentMappingContext(withRoute(WkndPage)));
```

6. Update App.js

```
import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
import { Redirect } from 'react-router';
import Header from './components/header/Header';
import './App.scss';

 /**
  * Returns a model path from the given URL


import { ModelManager, Constants } from "@adobe/cq-spa-page-model-manager";

/**
 * Returns a model path from the given URL
 * @param {string} url     - Path from which to extract a model path
 * @return {string|undefined}
 */
function getModelPath(url) {
    if (!url) {
        return;
    }

    let dotIndex = url.indexOf(".");
    return url.substr(0, dotIndex > -1 ? dotIndex : url.length);
}

/**
 * Should the App redirect to the home page
 *
 * @param {string} modelUrl     - Path of the current model
 * @return {boolean}
 */
function canRedirectHome(modelUrl, pathname) {
    if (!pathname) {
        return false;
    }
    const currentUrl = getModelPath(pathname);
    // 1. if a model url has been provided
    // 2. if the current URL is located under the content
    // 3. if app root model path equals the current URL
    return modelUrl && modelUrl.indexOf('/content/') > -1 && (modelUrl === currentUrl || modelUrl.endsWith(currentUrl));
}

// This component is the application entry point
class App extends Page {

    get redirect() {
        const modelRootPath = this.props.cqPath;
        const locationPathname = this.props.locationPathname;

        if (canRedirectHome(modelRootPath, locationPathname)) {
            // Redirect to the home url
            return <Redirect to={ modelRootPath + '/home.html' }/>;
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.redirect }
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>
            </div>
          );
    }
}

export default withModel(App);
```

## Update List Component

```

```

## Update Header Component

## Add Font Awesome

* instructions: https://fontawesome.com/how-to-use/on-the-web/using-with/react

```
$ npm i --save @fortawesome/fontawesome-svg-core \
  npm i --save @fortawesome/free-solid-svg-icons \
  npm i --save @fortawesome/react-fontawesome

```

Create a file named Icon.js

```
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faChevronLeft, faSearch, faHeadphonesAlt, faMusic, faCamera, faFutbol, faPaintBrush, faTheaterMasks} from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faChevronLeft, faSearch, faHeadphonesAlt, faMusic, faCamera, faFutbol, faPaintBrush, faTheaterMasks);

```

update app.js to import Icon.js

Update Header.js to include chevron

# Navigation
