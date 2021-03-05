import React, { useState } from 'react'
import { getWidgetFunction } from '../widgetsFactory'
import { WidgetConfiguration, WidgetProperties } from '../widgets'
import { DashboardTab, DashboardTabs } from './DashboardTabs'
import styled from 'styled-components'
import { useSwipeable } from 'react-swipeable'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallbackWidget  } from '../OnErrorWidget'

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
                        <DashboardTabStyled label={page.title} key={`page_${pageIndex}`}>
                            { page.widgets.map((el, widgetIndex) => { 
                                const Widget = getWidgetFunction(el)
                                return (
                                    <ErrorBoundary key={`tabs_eb_${pageIndex}_${widgetIndex}`} FallbackComponent={ErrorFallbackWidget}>
                                        <Widget props={el.properties} key={`widget_${pageIndex}_${widgetIndex}`}/>
                                    </ErrorBoundary>
                                )
                            })}
                        </DashboardTabStyled>
                    )
                })}
            </DashboardTabsStyled>
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div<{ width: string }>`
    width: ${props =>  `${props.width}`};
    height: 100%;
`;

const DashboardTabsStyled = styled(DashboardTabs)`
    width: 100%;
    height: 100%;
    overflow: auto;
    //background-color: pink
`;


const DashboardTabStyled = styled(DashboardTab)`
    overflow: auto
 `;
