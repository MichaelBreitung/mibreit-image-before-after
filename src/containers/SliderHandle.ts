/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import leftRightImage from '../images/leftRight.svg';
import styles from './SliderHandle.module.css';

export default class SliderHandle 
{
  private _slider: HTMLElement;

  constructor (parent: HTMLElement)
  {
    this._slider = DomTools.createElement('div');
    DomTools.addCssClass(this._slider, styles.slider);
    DomTools.appendChildElement(this._slider, parent);

    const sliderBar = DomTools.createElement('div');
    DomTools.addCssClass(sliderBar, styles.sliderBar);
    DomTools.appendChildElement(sliderBar, this._slider);

    const sliderHandle = DomTools.createElement('div');
    DomTools.addCssClass(sliderHandle, styles.sliderHandle);
    DomTools.appendChildElement(sliderHandle, this._slider);

    const right = DomTools.createElement('div');
    DomTools.setInnerHtml(right, leftRightImage);
    DomTools.appendChildElement(right, this._slider);

    const left = DomTools.createElement('div');
    DomTools.setInnerHtml(left, leftRightImage);
    DomTools.addCssClass(left, styles.left);
    DomTools.appendChildElement(left, this._slider);
  }

  public updatePosition(posX: number) : void{
    DomTools.addCssStyle(this._slider, 'margin-left', `${posX}px`);
  }
}