import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import styled from 'styled-components';

export function GridWidget({ props }: WidgetProperties) {
    let columns = (props.columns ?? []) as WidgetConfiguration[]
    let rows = (props.rows ?? []) as WidgetConfiguration[]

    let row = 0

    if (columns.length>0) {
        return (
            <Grid>
                { columns.map((el, index) => {
                    const Widget = getWidgetFunction(el)
                    return (
                        <GridColumn $index={index+1}>
                            <Widget props={el.properties} key={`container_el_${index}`}/>
                        </GridColumn>
                    )
                })}
            </Grid>
        );
    } else if (rows.length>0) {
        return (
            <Grid>
                { rows.map((el, index) => {
                    const Widget = getWidgetFunction(el)
                    return (
                        <GridRow $index={index+1}>
                            <Widget props={el.properties} key={`container_el_${index}`}/>
                        </GridRow>
                    )
                })}
            </Grid>
        );
    }
}


const Grid = styled.div`
    display: grid;
    width: 100%;
    max-height: 100%;  
    grid-row-gap: 1em;
    height: 100%;  
    //background-color: #2E2F34;
`;


const GridBase = styled.div`
`;

const GridRow = styled(GridBase)<{ $index: number }>`
  height: fit-content;
  grid-row: { $index }; 
`;


const GridColumn = styled(GridBase)<{ $index: number }>`
  width: fit-content;
  grid-column: ${props =>  `${props.$index}`} ;
`;
