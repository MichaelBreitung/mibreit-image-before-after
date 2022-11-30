/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
import leftRightImage from '../images/leftRight.svg';
import styles from './SliderHandle.module.css';
var SliderHandle = /** @class */ (function () {
    function SliderHandle(parent) {
        this._slider = DomTools.createElement('div');
        DomTools.addCssClass(this._slider, styles.slider);
        DomTools.appendChildElement(this._slider, parent);
        var sliderBar = DomTools.createElement('div');
        DomTools.addCssClass(sliderBar, styles.sliderBar);
        DomTools.appendChildElement(sliderBar, this._slider);
        var sliderHandle = DomTools.createElement('div');
        DomTools.addCssClass(sliderHandle, styles.sliderHandle);
        DomTools.appendChildElement(sliderHandle, this._slider);
        var right = DomTools.createElement('div');
        DomTools.setInnerHtml(right, leftRightImage);
        DomTools.appendChildElement(right, this._slider);
        var left = DomTools.createElement('div');
        DomTools.setInnerHtml(left, leftRightImage);
        DomTools.addCssClass(left, styles.left);
        DomTools.appendChildElement(left, this._slider);
    }
    SliderHandle.prototype.updatePosition = function (posX) {
        DomTools.addCssStyle(this._slider, 'margin-left', "".concat(posX, "px"));
    };
    return SliderHandle;
}());
export default SliderHandle;
