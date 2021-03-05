import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackWidget } from '../OnErrorWidget';

export function ContainerWidget({ props }: WidgetProperties) {
    let widgets = (props.widgets ?? []) as WidgetConfiguration[]
    return (
        <ContainerStyled>
            { widgets.map((el, index) => { 
                const Widget = getWidgetFunction(el)
                return (
                    <ErrorBoundary key={`container_el_eb_${index}`} FallbackComponent={ErrorFallbackWidget}>
                        <Widget props={el.properties} key={`container_el_${index}`}/>
                    </ErrorBoundary>
                )
            })}
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    width: 100vw;
    max-height: 100vh;  
    height: 100vh;  
    //background-color: #2E2F34;
`;