
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
  grid-template-rows: 9rem [line1] auto;
  grid-gap: 1rem;
`;

export const WidgetContainerRect = styled(WidgetContainerSquare)`
  width: 12rem;
`;



export const WidgetHeaderRow = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  color: #A5A9B2;
`;

export const WidgetContent = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  place-self: center;
`;