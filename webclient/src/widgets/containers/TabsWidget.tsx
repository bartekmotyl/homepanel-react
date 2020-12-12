import React, { useState } from 'react';
import { getWidgetFunction } from '../widgetsFactory';
import { WidgetConfiguration, WidgetProperties } from '../widgets';
import { DashboardTab, DashboardTabs } from './DashboardTabs';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

interface PageConfiguration {
    title: string,
    tabsVisible: boolean, 
    widgets: WidgetConfiguration[];
}

export function TabsWidget({ props }: WidgetProperties) {
    
    let pages = props.pages as PageConfiguration[]

    const [selectedTab, setSelectedTab] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            setSelectedTab(Math.min(selectedTab + 1, pages.length-1))
            console.log("User swiped left!", eventData) 
        },
        onSwipedRight: (eventData) => { 
            setSelectedTab(Math.max(selectedTab - 1, 0))
            console.log("User swiped right!", eventData)
        },
    })

    return (
        <ContainerStyled {...handlers} width={props.width ?? '100%'}>
            <DashboardTabsStyled tabsVisible={props.tabsVisible} selectedTab={selectedTab}>
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
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div<{ width: string }>`
    width: ${props =>  `${props.width}`};
`;

const DashboardTabsStyled = styled(DashboardTabs)`
    width: 100%;
`;