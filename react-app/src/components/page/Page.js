/*
    Page.js

    - WKND specific implementation of Page
    - Maps to wknd-events/components/structure/page
*/
import React from "react";
import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
import {withRoute} from '../../utils/RouteHelper';
require('./Page.css');
 // This component is a variant of a React Page component mapped to the "structure/page" resource type
 // No functionality is changed other than to add an app specific CSS class
 class WkndPage extends Page {


     get containerProps() {
         let attrs = super.containerProps;
         attrs.className = (attrs.className || '') + ' WkndPage ' + (this.props.cssClassNames || '');
         return attrs
     }

     render() {
        let currLocation;
        currLocation = this.props.location.pathname;

        targetView(currLocation);
        return (
            <div {...this.containerProps}>
                { this.childComponents }
                { this.placeholderComponent }
            </div>
        )
    }
 }

 function targetView(currLocation){
    console.log("Target View: " + currLocation);
    const event = new CustomEvent('aem-route-change',{detail: {view: currLocation} });
    document.body.dispatchEvent(event);
    /*
    const adobe = window.adobe;
    // Validate if the Target Libraries are available on your website
    if (typeof adobe != 'undefined' && adobe.target && typeof adobe.target.triggerView === 'function') {
        console.log("inside Adobe: " + currLocation);
      // A really simple example where we are assigning the location as the view name
     // adobe.target.triggerView(currLocation);
        
    }*/
  }

 
 MapTo('wknd-events/components/structure/page')(withComponentMappingContext(withRoute(WkndPage)));
