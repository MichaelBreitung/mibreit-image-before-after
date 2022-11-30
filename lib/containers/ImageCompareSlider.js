/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { DomTools } from 'mibreit-dom-tools';
import SliderHandle from './SliderHandle';
import styles from './ImageCompareSlider.module.css';
var ImageCompareSlider = /** @class */ (function () {
    function ImageCompareSlider(image) {
        var _this = this;
        this._updateComparison = function (posX) {
            var imageDimension = _this._image.getBoundingClientRect();
            var clippingPos = imageDimension.width + imageDimension.x - posX;
            var sliderPos = posX - imageDimension.x;
            _this._updateClipping(clippingPos);
            _this._sliderHandle.updatePosition(sliderPos);
        };
        this._updateClipping = function (posX) {
            console.log('ImageCompareSlider#_updateClipping', posX);
            DomTools.addCssStyle(_this._image, 'clip-path', "inset(0 ".concat(posX, "px 0 0)"));
        };
        this._image = image;
        this._prepareImage(image);
        this._prepareSlider();
    }
    ImageCompareSlider.prototype._prepareImage = function (image) {
        DomTools.disableContextMenu(image);
        DomTools.disableDragging(image);
        DomTools.addCssClass(image, styles.selectDisable);
    };
    ImageCompareSlider.prototype._prepareSlider = function () {
        var _this = this;
        var moveActive = false;
        var touchArea = DomTools.createElement('div');
        DomTools.addCssClass(touchArea, styles.touchArea);
        DomTools.appendAfterChild(touchArea, this._image);
        DomTools.appendChildElement(this._image, touchArea);
        this._sliderHandle = new SliderHandle(touchArea);
        DomTools.addCssStyle(this._image, 'position', 'relative');
        DomTools.addEventListener(touchArea, 'pointerdown', function (event) {
            moveActive = true;
            _this._updateComparison(event.pageX);
        });
        DomTools.addEventListener(touchArea, 'pointerup', function () {
            moveActive = false;
        });
        DomTools.addEventListener(touchArea, 'pointerleave', function () {
            moveActive = false;
        });
        DomTools.addEventListener(touchArea, 'pointermove', function (event) {
            if (moveActive) {
                _this._updateComparison(event.pageX);
            }
        });
    };
    return ImageCompareSlider;
}());
export default ImageCompareSlider;
