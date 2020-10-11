
import styled from "styled-components";

export enum WidgetSize {
    XS,
    S,
    M,
    L,
    XL,
}
  
export const widgetSizeFactor = (size: WidgetSize) => {
    switch (size) {
        case WidgetSize.XS: return 0.33;  
        case WidgetSize.S: return 0.66;  
        case WidgetSize.M: return 1.0;  
        case WidgetSize.L: return 1.5;  
        case WidgetSize.XL: return 3.0;  
    }        
}
 
export const WidgetFontHeadline = styled.span<{size: WidgetSize}>`
    font-size: ${props =>  `${widgetSizeFactor(props.size) * 44}px`}
`;


export const WidgetFontCaption = styled.span<{size: WidgetSize}>`
    font-size: ${props =>  `${widgetSizeFactor(props.size) * 20}px`}
`;