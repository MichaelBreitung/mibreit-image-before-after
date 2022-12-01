/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

 import {
  addCssClass,
  addCssStyle,
  createElement,
  setInnerHtml,
  appendChildElement,
} from 'mibreit-dom-tools';
import leftRightImage from '../images/leftRight.svg';
import styles from './SliderHandle.module.css';

export default class SliderHandle 
{
  private _slider: HTMLElement;

  constructor (parent: HTMLElement)
  {
    this._slider = createElement('div');
    addCssClass(this._slider, styles.slider);
    appendChildElement(this._slider, parent);

    const sliderBar = createElement('div');
    addCssClass(sliderBar, styles.sliderBar);
    appendChildElement(sliderBar, this._slider);

    const sliderHandle = createElement('div');
    addCssClass(sliderHandle, styles.sliderHandle);
    appendChildElement(sliderHandle, this._slider);

    const right = createElement('div');
    setInnerHtml(right, leftRightImage);
    appendChildElement(right, this._slider);

    const left = createElement('div');
    setInnerHtml(left, leftRightImage);
    addCssClass(left, styles.left);
    appendChildElement(left, this._slider);
  }

  public updatePosition(posX: number) : void{
    addCssStyle(this._slider, 'margin-left', `${posX}px`);
  }
}