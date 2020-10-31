
import styled from "styled-components";

export const WidgetFontHeadline = styled.span`
    font-size: 44px;
`;

export const WidgetFontHeadlineIcon = styled.span`
    font-size: 56px;
`;


export const WidgetFontCaption = styled.span`
    font-size: 20px;
`;

export const WidgetContainerSquare = styled.div`
  background-color: #383C45;
  width: 9rem;
  height: 9rem;
  color: white;
  display: grid;
  grid-template-columns: auto;  
  grid-template-rows: 50px [line1] auto;
  grid-gap: 10px;
`;

export const WidgetContainerRect = styled(WidgetContainerSquare)`
  width: 12rem;
`;