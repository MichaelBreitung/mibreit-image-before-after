/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, setInnerHtml, appendChildElement, } from 'mibreit-dom-tools';
import leftRightImage from '../images/leftRight.svg';
import styles from './SliderHandle.module.css';
var SliderHandle = /** @class */ (function () {
    function SliderHandle(parent) {
        this._slider = createElement('div');
        addCssClass(this._slider, styles.slider);
        appendChildElement(this._slider, parent);
        var sliderBar = createElement('div');
        addCssClass(sliderBar, styles.sliderBar);
        appendChildElement(sliderBar, this._slider);
        var sliderHandle = createElement('div');
        addCssClass(sliderHandle, styles.sliderHandle);
        appendChildElement(sliderHandle, this._slider);
        var right = createElement('div');
        setInnerHtml(right, leftRightImage);
        appendChildElement(right, this._slider);
        var left = createElement('div');
        setInnerHtml(left, leftRightImage);
        addCssClass(left, styles.left);
        appendChildElement(left, this._slider);
    }
    SliderHandle.prototype.updatePosition = function (posX) {
        addCssStyle(this._slider, 'margin-left', "".concat(posX, "px"));
    };
    return SliderHandle;
}());
export default SliderHandle;
