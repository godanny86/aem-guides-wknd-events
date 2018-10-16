# Chapter 4 - Custom Components



# Map Component

> Front End Persona

1. Get Google API key: https://developers.google.com/maps/documentation/javascript/get-api-key
2. Install Google react map component: https://www.npmjs.com/package/google-map-react

```
npm install --save google-map-react
```

3. Beneath `react-app/src/components` create a new folder named `map`. Beneath the `map` folder create files for `Map.js` and `Map.scss`:

```diff
/aem-guides-wknd-events
    /react-app
        /src
            /components
+                /map
+                   Map.js
+                   Map.scss

```

4. Populate `Map.js` with the following:

```js

import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import GoogleMapReact from 'google-map-react';

import "./Map.scss";

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const MapEditConfig = {

    emptyLabel: 'Map',

    isEmpty: function() {
        return !this.props || !this.props.lat || !this.props.lng;
    }
};

const Label = ({ text }) => (
    <div className="Map-label">
      {text}
    </div>
  );
 

/**
 * Map React component
 * Expected use
 * <Map apiKey= lat= lng= zoom= label= />
 */
export default class Map extends Component {

    get isReady() {

        if(this.props.apiKey && this.props.lat && this.props.lng) {
            return true;
        }
        return false;
    }

    get map() {
        
        if(this.isReady) {
            let zoom = this.props.zoom || 11;
            let params = {
                center: {
                    lat: this.props.lat,
                    lng: this.props.lng
                },
                zoom: zoom
            };
            let label;

            if(this.props.label != null) {
                label = <Label lat={params.center.lat} lng={params.center.lng} text={this.props.label} />;
            }

            return (  <GoogleMapReact
                bootstrapURLKeys={{ key: this.props.apiKey }}
                defaultCenter={params.center}
                defaultZoom={params.zoom}>
                {label}
              </GoogleMapReact>
            );
        }

        return <div>No api key defined! Map cannot be rendered</div>;
    }


    render() {
        return ( <div className="Map">
            {this.map}
            </div>);
    }
}

MapTo('wknd-events/components/content/map')(Map, MapEditConfig);

```

5. Popuate `Map.scss` with the following:

```css
@import '../../styles/shared';

.Map {
    height: 340px;
    width: 100%;
    padding-left: $gutter-padding;
    padding-right: $gutter-padding;

    &-label {
      color: $color-black;
      background-color: #ededed;
      width: 80px;
      padding: 15px 10px;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      border: 1px solid $color-gray;
      transform: translate(-30%, -50%);
    }
}
```

6. Update `.env.development` to use the mock json file:

```
# Request the JSON from Mock JSON
REACT_APP_PAGE_MODEL_PATH=mock.model.json
```

7. Update the Mock JSON to add the expected JSON for the 

```diff
 "responsivegrid_399366997": {
     ...
    ":items": {
        "text": {
            "text": "<h4>Sidebar heading</h4>\n",
            "richText": true,
            ":type": "wknd-events/components/content/text"
        },
+        "map": {
+            "apiKey": "YOUR_API_KEY_HERE",  
+            "zoom": 15,
+            "label": "Map Label",
+            "lat": 35.6895,
+            "lng": 139.6917,
+            ":type": "wknd-events/components/content/map"
        },
        "text_1183005514": {
            "text": "<p>Morbi euismod magna ac lorem rutrum elementum.</p>\n",
            "richText": true,
            ":type": "wknd-events/components/content/text"
        }
    },
    ":itemsOrder": [
        "text",
+        "map",
        "text_1183005514"
    ],
    ":type": "wcm/foundation/components/responsivegrid"
}
```

7.