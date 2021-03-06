import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';
import { ErrorFallbackWidget } from '../OnErrorWidget';
import { ErrorBoundary } from 'react-error-boundary';

export function SideBySideWidget({ props }: WidgetProperties) {
    let widgets = props.widgets as WidgetConfiguration[]
    return (
        <PanelFlow>
            { widgets.map((el, index) => { 
                const Widget = getWidgetFunction(el)
                return (
                    <PanelElement key={`PanelElement_${index}`} >
                        <ErrorBoundary key={`sidebyside_eb_${index}`} FallbackComponent={ErrorFallbackWidget}>
                            <Widget props={el.properties}/>
                        </ErrorBoundary>
                    </PanelElement>
                )
            })}
        </PanelFlow>
    );
}

const PanelElement = styled.div`
    height: 100%;
`;

const PanelFlow = styled.div`
    display: flex; 
    width: 100%; 
    height: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start; 
    overflow: auto;
 `;
