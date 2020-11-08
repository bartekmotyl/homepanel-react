import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';

export function ContainerWidget({ props }: WidgetProperties) {
    let widgets = (props.widgets ?? []) as WidgetConfiguration[]
    return (
        <ContainerStyled>
            { widgets.map((el, index) => { 
                const Widget = getWidgetFunction(el)
                return (
                    <Widget props={el.properties} key={`container_el_${index}`}/>
                )
            })}
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;  
    background-color: #2E2F34;
`;