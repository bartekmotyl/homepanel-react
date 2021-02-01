import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';

export function GroupWidget({ props }: WidgetProperties) {
    let widgets = props.widgets as WidgetConfiguration[]
    return (
        <Group>
            { widgets.map((el, index) => { 
                const Widget = getWidgetFunction(el)
                return (
                    <Widget props={el.properties}/>
                )
            })}
        </Group>
    );
}


const Group = styled.div`    
    width: 100%; 
    height: 100%;
 `;
