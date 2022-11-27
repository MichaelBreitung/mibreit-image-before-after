/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageCompare from '../interfaces/IImageCompare';
import { EImageCompareMode } from '../types/ImageCompareMode';
export type ImageCompareConfig = {
    mode: EImageCompareMode;
};
export default class ImageCompare implements IImageCompare {
    private _rhs;
    private _lhs;
    private _compareBox;
    private _slideBox;
    private _mode;
    constructor(config: ImageCompareConfig);
    compare(lhsImage: HTMLElement, rhsImage: HTMLElement): Promise<void>;
    private _prepareImage;
    private _prepareCompareBox;
    private _prepareCompareMode;
    private _toggle;
}
