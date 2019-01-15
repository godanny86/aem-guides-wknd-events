
import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import { Button } from '../button/Button';
import { Image } from '../image/Image';
import "./Teaser.scss";

/**
 * Map Edit Config
 * 
 * @type EditConfig
 */
const TeaserEditConfig = {

    emptyLabel: 'Teaser',

    isEmpty: function(props) {
        return !props || !props.title;
    }
};

/**
 * 
 * Teaser React component
 */
export default class Teaser extends Component {

    get isReady() {

        return true;
    }

    get title() {
        if(this.props.title) {
            return this.props.title;
        }
        return null;
    }

    get description() {
        if(this.props.description) {
            return this.props.description;
        }
        return null;
    }

    get actionLinks() {

        if(this.props.actions) {
            return (<div className="Teaser-actions">
                {
                    this.props.actions.map((actionItem, index) => {
                        return <Button key={index} url={actionItem.url}>{actionItem.title}</Button>
                       })
                }
                </div>);
        }

        return null;
    }

    get image() {
        if(this.props.imageSrc) {
            return <Image src={this.props.imageSrc} alt={this.title} />;
        }

        return null;
    }

    get cssClass() {
        if(this.props.style) {
            return "Teaser " + this.props.style;
        }
        return "Teaser";
    }

    render() {
        return (<div className={this.cssClass}>
                    <div className="Teaser-image ">
                        {this.image}
                    </div>
                    <div className="Teaser-content">
                        <span className="Teaser-sponsor">Sponsored</span>
                        <h3 className="Teaser-title">{this.title}</h3>
                        <h6 className="Teaser-offer">{this.props.offerText}</h6>
                        <div className="Teaser-description" dangerouslySetInnerHTML={{__html:  this.description}}/>
                        {this.actionLinks}
                    </div>
                </div>);
    }
}

MapTo('wknd-events/components/content/teaser')(Teaser, TeaserEditConfig);
