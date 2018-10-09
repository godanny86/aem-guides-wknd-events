# Chapter 2 - First Editable Components

In this chapter we will install the AEM SPA Editor JS SDK as part of the `react-app` module. We will then update the React application to Two React components will be creatated that will map to AEM Text and Image components.

## Install AEM SPA Editor JS SDK

We will now install the AEM SPA Editor JS SDK as part of the `react-app` project.

1. **Open a new terminal window and navigate into the `react-app` directory**

    ```
    $ cd <src>/aem-guides-wknd-events/react
    ```

2. **Install [@adobe/cq-spa-component-mapping](https://www.npmjs.com/package/@adobe/cq-spa-component-mapping)**

    ```
    $ npm install @adobe/cq-spa-component-mapping
    ```

    The [@adobe/cq-spa-component-mapping](https://www.npmjs.com/package/@adobe/cq-spa-component-mapping) provides helpers to map AEM Components to SPA components. This module is not tied to a specific SPA framework.

3. **Install [@adobe/cq-spa-page-model-manager](https://www.npmjs.com/package/@adobe/cq-spa-page-model-manager)**

    ```
    $ npm install @adobe/cq-spa-page-model-manager
    ```

    The [@adobe/cq-spa-page-model-manager](https://www.npmjs.com/package/@adobe/cq-spa-page-model-manager) provides the API to manage the model representation of the AEM Pages that are used to compose a SPA. This module is not tied to a specific SPA framework.

4. **Install [@adobe/cq-react-editable-components](https://www.npmjs.com/package/@adobe/cq-react-editable-components)**

    ```
    $ npm install @adobe/cq-react-editable-components
    ```

    The [@adobe/cq-react-editable-components](https://www.npmjs.com/package/@adobe/cq-react-editable-components) provides generic React helpers and components to support AEM authoring. This module also wraps the `cq-spa-page-model-manager` and `cq-spa-component-mapping` to make these available to the React framework.

5. **Install peer dependencies**

    Several peer dependencies must be manually installed to the project:

    ```
    $ npm install ajv --save-dev
    $ npm install clone --save-dev
    ```

6. `react-app/package.json` should now look something like this:

    *Note, versions of dependencies may be slightly different depending on when you are starting this tutorial*

    ```
    {
        "name": "react-app",
        "version": "0.1.0",
        "private": true,
        "dependencies": {
            "@adobe/cq-react-editable-components": "^1.0.0-rc.2",
            "@adobe/cq-spa-component-mapping": "^1.0.0-rc.3",
            "@adobe/cq-spa-page-model-manager": "^1.0.0-rc.3",
            "react": "^16.5.2",
            "react-dom": "^16.5.2",
            "react-scripts": "1.1.5"
        },
        "scripts": {
            "start": "react-scripts start",
            "build": "react-scripts build && clientlib --verbose",
            "test": "react-scripts test --env=jsdom",
            "eject": "react-scripts eject"
        },
        "devDependencies": {
            "aem-clientlib-generator": "^1.4.1",
            "ajv": "^6.5.4",
            "clone": "^2.1.2"
        }
    }
    ```

## Integrate AEM SPA Editor JS SDK (index.js, Page.js, App.js)

## Text Component

## Image Component

