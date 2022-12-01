/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
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
    DomTools.disableContextMenu(image);
    DomTools.disableDragging(image);
    DomTools.addCssClass(image, styles.selectDisable);
  }

  private _prepareSlider(): void {
    let moveActive = false;

    const touchArea = DomTools.createElement('div');
    DomTools.addCssClass(touchArea, styles.touchArea);
    DomTools.appendAfterChild(touchArea, this._image); 
    DomTools.appendChildElement(this._image, touchArea);

    this._sliderHandle = new SliderHandle(touchArea);

    DomTools.addCssStyle(this._image, 'position', 'relative');
    DomTools.addEventListener(touchArea, 'pointerdown', (event: PointerEvent) => {
      moveActive = true;
      this._updateComparison(event.pageX);
    });
    DomTools.addEventListener(touchArea, 'pointerup', () => {
      moveActive = false;
    });
    DomTools.addEventListener(touchArea, 'pointerleave', () => {
      moveActive = false;
    });
    DomTools.addEventListener(touchArea, 'pointermove', (event: PointerEvent) => {
      if (moveActive) {
        this._updateComparison(event.pageX);
      }
    });
  }

  private _initCenterPosition() : void
  {
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
    DomTools.addCssStyle(this._image, 'clip-path', `inset(0 ${posX}px 0 0)`);
  };
}
