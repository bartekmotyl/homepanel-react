
import styled from "styled-components";

export enum WidgetTextSize {
    XS,
    S,
    M,
    L,
    XL,
}
  

export const WidgetFontHeadline = styled.span<{size: WidgetTextSize}>`
    font-size: ${props =>  {
        switch (props.size) {
            case WidgetTextSize.XS: return "8pt";  
            case WidgetTextSize.S: return "12pt";  
            case WidgetTextSize.M: return "34pt";  
            case WidgetTextSize.L: return "20pt";  
            case WidgetTextSize.XL: return "90pt";  
        }    
    }}
`;


export const WidgetFontCaption = styled.span<{size: WidgetTextSize}>`
    font-size: ${props =>  {
        switch (props.size) {
            case WidgetTextSize.XS: return "5pt";  
            case WidgetTextSize.S: return "9pt";  
            case WidgetTextSize.M: return "14pt";  
            case WidgetTextSize.L: return "16pt";  
            case WidgetTextSize.XL: return "30pt";  
        }    
    }}
`;