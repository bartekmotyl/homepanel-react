import { IconType } from "react-icons/lib";

export interface IndicatorWidgetSource {
    getIsUpToDate() : boolean;
    getColor?() : string | null;
    getTitle() : string;
    getText?() : string;
    getMdIcon?() : IconType;
    getExtraText1?() : string; 
    getExtraText2?() : string; 
    getExtraText3?() : string; 
    getExtraText4?() : string; 
    getValue?() : any;
}

