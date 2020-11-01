import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';

export function PanelWidget({ props }: WidgetProperties) {
    let elements = props.widgets as WidgetConfiguration[]
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
