import React, { Component } from "react";
import {ResponsiveGrid, MapTo, withComponentMappingContext} from "@adobe/cq-react-editable-components";

require('./MyGrid.scss');

export class MyGrid extends ResponsiveGrid {

    /**
     * The attributes that will be injected in the root element of the container
     *
     * @returns {Object} - the attributes of the container
     */
    get containerProps() {
        let containerProps = super.containerProps;
        containerProps.className = (containerProps.className || '') + ' MyGrid ' +  this.props.gridClassNames;
        return containerProps;
    }

    render() {
        return (
            <div {...this.containerProps}>
                <div className="MyGrid-message">Welcome to my Custom Grid!</div>
                { super.childComponents }
                { super.placeholderComponent }
            </div>
        )
    }

}

MapTo('wknd-events/components/content/mygrid')(withComponentMappingContext(MyGrid));