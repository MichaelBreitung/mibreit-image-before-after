/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  disableContextMenu,
  disableDragging,
  addCssClass,
  addCssStyle,
  createElement,
  appendAfterChild,
  appendChildElement,
  addEventListener
} from 'mibreit-dom-tools';
import SliderHandle from './SliderHandle';
import styles from './ImageCompareSlider.module.css';

export default class ImageCompareSlider {
  private _image: HTMLElement;
  private _sliderHandle: SliderHandle;

  constructor(image: HTMLElement) {
    this._image = image;
    this._prepareImage(image);
    this._prepareSlider();
    this._initCenterPosition();
  }

  private _prepareImage(image: HTMLElement): void {
    disableContextMenu(image);
    disableDragging(image);
    addCssClass(image, styles.selectDisable);
  }

  private _prepareSlider(): void {
    let moveActive = false;

    const touchArea = createElement('div');
    addCssClass(touchArea, styles.touchArea);
    appendAfterChild(touchArea, this._image);
    appendChildElement(this._image, touchArea);

    this._sliderHandle = new SliderHandle(touchArea);

    addCssStyle(this._image, 'position', 'relative');
    addEventListener(touchArea, 'pointerdown', (event: PointerEvent) => {
      moveActive = true;
      this._updateComparison(event.pageX);
    });
    addEventListener(touchArea, 'pointerup', () => {
      moveActive = false;
    });
    addEventListener(touchArea, 'pointerleave', () => {
      moveActive = false;
    });
    addEventListener(touchArea, 'pointermove', (event: PointerEvent) => {
      if (moveActive) {
        this._updateComparison(event.pageX);
      }
    });
  }

  private _initCenterPosition(): void {
    const imageDimension: DOMRect = this._image.getBoundingClientRect();
    const centerPos = imageDimension.width / 2;
    this._updateClippingRight(centerPos);
    this._sliderHandle.updatePosition(centerPos);
  }

  private _updateComparison = (posX: number): void => {
    const imageDimension: DOMRect = this._image.getBoundingClientRect();
    const clippingPos: number = imageDimension.width + imageDimension.x - posX;
    const sliderPos: number = posX - imageDimension.x;

    this._updateClippingRight(clippingPos);
    this._sliderHandle.updatePosition(sliderPos);
  };

  private _updateClippingRight = (posX: number) => {
    console.log('ImageCompareSlider#_updateClippingRight', posX);
    addCssStyle(this._image, 'clip-path', `inset(0 ${posX}px 0 0)`);
  };
}
