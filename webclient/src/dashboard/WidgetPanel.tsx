import React from 'react';
import styled from 'styled-components';
import { WidgetConfiguration } from '../widgets/widgets';
import { getWidgetFunction } from '../widgets/widgetsFactory';


export function WidgetPanel({elements}: {elements: WidgetConfiguration[]} ) {
    return (
        <PanelFlow>
            { elements.map((el, index) => { 
                const Widget = getWidgetFunction(el)
                if (Widget) {
                    return <PanelElement key={`PanelElement_${index}`} >
                            <Widget props={el.properties}/>
                        </PanelElement>
                } else { 
                    return <></> 
                }
            })}
        </PanelFlow>
    );
}

const PanelElement = styled.div`
    margin-left: 0.2rem;
    margin-top: 0.2rem;
`;

const PanelFlow = styled.div`
    display: flex; 
    width: 100%; 
    height: 100%;
    //background-color: #2F3239;
    flex-wrap: wrap;
    justify-content: flex-start;
 `;
