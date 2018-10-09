# Chapter 1 - First Editable Components

In this chapter we will install the AEM SPA Editor JS SDK as part of the `react-app` module. We will then update the React application to Two React components will be creatated that will map to AEM Text and Image components. We will also inspect the Sling Model Exporter used to expose the content of an AEM page as JSON.  This JSON model will ultimately drive the SPA.

> **Persona:** Front End Developer

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

## (Bonus) Understanding the HierarchyPage Sling Model

> **Persona:** AEM Backend Developer

The AEM SPA JS SDK is designed to parse a JSON schema into a JavaScript Model.  A Sling Model, `HierarchyPage.java` has been included in the starter project that will expose content within AEM as JSON that matches the expected schema. A key feature of the exported JSON by the `HierarchyPageImpl` is the ability to expose the content of multiple AEM pages in a single request. This allows the SPA to be initialized with most of the content of the app and can remove the need for subsequent requests as a user navigates the app.

In the editor of your choice open the `<src>/aem-guides-wknd-events/core` module. 

1. **Open `core/src/main/java/com/adobe/aem/guides/wkndevents/core/models/HierarchyPage.java`**

    ```
    package com.adobe.aem.guides.wkndevents.core.models;

    import com.adobe.cq.export.json.ContainerExporter;
    import com.adobe.cq.export.json.hierarchy.HierarchyNodeExporter;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonProperty;

    public interface HierarchyPage extends HierarchyNodeExporter, ContainerExporter {

        ...
    }
    ```

    The interface `HierarchyPage` extends two interfaces:

    * **ContainerExporter** - Defines the JSON of a container component like a page, responsive grid, or parsys
    * **HierarchyNodeExporter** - Defines the JSON of a hierarchical node, like a root page and it's child pages

2. **Open `core/src/main/java/com/adobe/aem/guides/wkndevents/core/models/impl/HierarchyPageImpl.java`**

    This is the implementation of the `HierarchyPage` interface. 

      > Note* currently the HieararchyPageImpl is copied into the project. In the near future a default HieararchyPageImpl will be made available via Core Components. Developers will continue to have the option to extend but will no longer be responsible for maintaining the implementation. Make sure to check back for updates.


    ```
    @Model(adaptables = SlingHttpServletRequest.class, adapters = {HierarchyPage.class, ContainerExporter.class}, resourceType = HierarchyPageImpl.RESOURCE_TYPE)
    @Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
    public class HierarchyPageImpl implements HierarchyPage {

    /**
     * Resource type of associated with the current implementation
     */
    protected static final String RESOURCE_TYPE = "wknd-events/components/structure/page";
    ```

    The `HierarchyPageImpl` is registered as Sling Model Exporter for the `wknd-events/components/structure/page` resource type. If implementing a custom project you would update the `RESOURCE_TYPE` to point to your project's base page component.

    The methods `getRoodModel()` and `getRootPage()` are used to find and return what is considered to be the "root" of the application. There are three properties stored on an App template's policy used to drive the collection of content:
    
    1. `PR_IS_ROOT = "isRoot"` -  Helps identify the `rootPage` of the application. The `rootPage` is used as the starter point to collect all the child pages of the app.
    2. `STRUCTURE_DEPTH_PN = "structureDepth"` - identifies how deep in the hierarchy to collect child pages.
    3. `STRUCTURE_PATTERNS_PN = "structurePatterns"` - a regular expression that can be used to ignore or exclude certain pages from automatically being collected. 

3. **Open up [CRXDE-Lite](http://localhost:4502/crx/de/index.jsp#/conf/wknd-events/settings/wcm/policies/wknd-events/components/structure/app/default)**

    Navigate to `/conf/wknd-events/settings/wcm/policies/wknd-events/components/structure/app/default`. This is the policy for the `wknd-events-app-template` template. Notice the properties for `isRoot`, `structureDepth`, `structurePatterns`.

    ![template policy](./images/app-template-policy.png)

4. Open the React Root Page at http://localhost:4502/content/wknd-events/react.html

    The page may render blank for now. This page is built using the `wknd-events-app-template`.

5. Change the extension to `model.json`: http://localhost:4502/content/wknd-events/react.model.json

    Notice that content of the current page is exposed and the content of child page: /content/wknd-events/react/home.

    ```
    // /content/wknd-events/react.model.json 

    {
    ":type": "wknd-events/components/structure/app",
    ":items": {},
    ":itemsOrder": [],
    ":children": {
    "/content/wknd-events/react/home": {
        ":type": "wknd-events/components/structure/page",
        ":items": { ... },
        ":itemsOrder": [
        "root"
        ],
        ":path": "/content/wknd-events/react/home",
        ":hierarchyType": "page",
        "title": "Home"
        }
    },
    ":path": "/content/wknd-events/react",
    ":hierarchyType": "page",
    "title": "React App"
    }
    ```


## Next: [Chapter 2](../chapter-2/chapter-2.md)

In the next chapter we will perform some FED tasks
