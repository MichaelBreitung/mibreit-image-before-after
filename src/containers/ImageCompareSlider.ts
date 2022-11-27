/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './ImageCompareSlider.module.css';

export default class ImageCompareSlider {
  private _image: HTMLElement;

  constructor(image: HTMLElement) {
    this._image = image;
    this._prepareImage(image);
    this._prepareSlider();
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
    DomTools.addCssStyle(this._image, "position", "relative");
    DomTools.addEventListener(touchArea, 'pointerdown', (event: PointerEvent) => {
      moveActive = true;
      this._updateClipping(event.pageX);
    });
    DomTools.addEventListener(touchArea, 'pointerup', () => {
      moveActive = false;
    });
    DomTools.addEventListener(touchArea, 'pointerleave', () => {
      moveActive = false;
    });
    DomTools.addEventListener(touchArea, 'pointermove', (event: PointerEvent) => {
      if (moveActive) {
        this._updateClipping(event.pageX);
      }
    });
  }

  private _updateClipping = (posX: number) =>
  { 
    const imageDimension : DOMRect = this._image.getBoundingClientRect();
    const clipPosition = imageDimension.width + imageDimension.x - posX;
    console.log("ImageCompareSlider#_updateClipping", clipPosition);
    DomTools.addCssStyle(this._image, 'clip-path', `inset(0 ${clipPosition}px 0 0)`);
  }
}
