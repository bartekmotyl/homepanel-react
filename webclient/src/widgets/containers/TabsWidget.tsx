import React from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import { DashboardTab, DashboardTabs } from './DashboardTabs';
import styled from 'styled-components';

interface PageConfiguration {
    title: string,
    widgets: WidgetConfiguration[];
}

export function TabsWidget({ props }: WidgetProperties) {
    let pages = props.pages as PageConfiguration[]
    return (
        <DashboardTabsStyled>
            { pages.map((page, pageIndex) => { 
                return ( 
                    <DashboardTab label={page.title} key={`page_${pageIndex}`}>
                        { page.widgets.map((el, widgetIndex) => { 
                            const Widget = getWidgetFunction(el)
                            return (
                                <Widget props={el.properties} key={`widget_${pageIndex}_${widgetIndex}`}/>
                            )
                        })}
                    </DashboardTab>
                )
            })}
        </DashboardTabsStyled>
    );
}

const DashboardTabsStyled = styled(DashboardTabs)`
    width: 100%;
`;