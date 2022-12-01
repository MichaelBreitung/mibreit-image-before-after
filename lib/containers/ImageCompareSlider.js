/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { disableContextMenu, disableDragging, addCssClass, addCssStyle, createElement, appendAfterChild, appendChildElement, addEventListener } from 'mibreit-dom-tools';
import SliderHandle from './SliderHandle';
import styles from './ImageCompareSlider.module.css';
var ImageCompareSlider = /** @class */ (function () {
    function ImageCompareSlider(image) {
        var _this = this;
        this._updateComparison = function (posX) {
            var imageDimension = _this._image.getBoundingClientRect();
            var clippingPos = imageDimension.width + imageDimension.x - posX;
            var sliderPos = posX - imageDimension.x;
            _this._updateClippingRight(clippingPos);
            _this._sliderHandle.updatePosition(sliderPos);
        };
        this._updateClippingRight = function (posX) {
            console.log('ImageCompareSlider#_updateClippingRight', posX);
            addCssStyle(_this._image, 'clip-path', "inset(0 ".concat(posX, "px 0 0)"));
        };
        this._image = image;
        this._prepareImage(image);
        this._prepareSlider();
        this._initCenterPosition();
    }
    ImageCompareSlider.prototype._prepareImage = function (image) {
        disableContextMenu(image);
        disableDragging(image);
        addCssClass(image, styles.selectDisable);
    };
    ImageCompareSlider.prototype._prepareSlider = function () {
        var _this = this;
        var moveActive = false;
        var touchArea = createElement('div');
        addCssClass(touchArea, styles.touchArea);
        appendAfterChild(touchArea, this._image);
        appendChildElement(this._image, touchArea);
        this._sliderHandle = new SliderHandle(touchArea);
        addCssStyle(this._image, 'position', 'relative');
        addEventListener(touchArea, 'pointerdown', function (event) {
            moveActive = true;
            _this._updateComparison(event.pageX);
        });
        addEventListener(touchArea, 'pointerup', function () {
            moveActive = false;
        });
        addEventListener(touchArea, 'pointerleave', function () {
            moveActive = false;
        });
        addEventListener(touchArea, 'pointermove', function (event) {
            if (moveActive) {
                _this._updateComparison(event.pageX);
            }
        });
    };
    ImageCompareSlider.prototype._initCenterPosition = function () {
        var imageDimension = this._image.getBoundingClientRect();
        var centerPos = imageDimension.width / 2;
        this._updateClippingRight(centerPos);
        this._sliderHandle.updatePosition(centerPos);
    };
    return ImageCompareSlider;
}());
export default ImageCompareSlider;
