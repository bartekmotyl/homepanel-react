import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';
import Ticker from 'react-ticker';

export function TickerWidget({ props }: WidgetProperties) {
    let widgets = (props.widgets ?? []) as WidgetConfiguration[]
    console.log('width: ', props.width)
    return (
        <ContainerStyled width={props.width ?? '100vw'}>
            <Ticker mode="chain" speed={props.speed ?? 5}>
                {({ index }) => {
                    const el = widgets[index % widgets.length]
                    const Widget = getWidgetFunction(el)
                    return (
                        <Widget props={el.properties} key={`container_el_${index}`}/>
                    )                
                }}
            </Ticker>
        </ContainerStyled>
    );
}
const ContainerStyled = styled.div<{ width: string }>`
    width: ${props =>  `${props.width}`};
    background-color: #2E2F34;
`;
