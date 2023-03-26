import styled from "styled-components";
import React, { ReactElement } from "react";
import Tabs from '@mui/material/Tabs';
import { Tab } from "@mui/material";
import { useTimeout } from "react-use";

interface DashboardTabsProps {
    tabsVisible: boolean,
    children: ReactElement<DashboardTabProps> [],
    autoFocusTabIndex?: number,
}

export const DashboardTabs : React.FunctionComponent<DashboardTabsProps> = props => {
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(props.autoFocusTabIndex ?? 0)
    const autoFocusTabSwitchTimeout = 60000

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTabIndex(newValue)
        if (props.autoFocusTabIndex) {
            setTimeout(() => setSelectedTabIndex(props.autoFocusTabIndex!), autoFocusTabSwitchTimeout)
        }
    }

    return (
        <OuterContainer>
            { props.tabsVisible && 
                <StyledTabs value={selectedTabIndex} onChange={handleChange} variant="scrollable"> 
                    { props.children && props.children.map((el, index) => { 
                        return <StyledTab value={index} label={el.props.label} key={index}/>
                        }) 
                    } 
                </StyledTabs>
            }
            { props.children[selectedTabIndex] }
       </OuterContainer>
    );
}

const OuterContainer = styled.div`
    bleed: initial;
    height: 100%;
`; 

const StyledTabs = styled(Tabs)`
`;

const StyledTab = styled(Tab)` 
  && { 
    min-width: 1rem;
}
`; 




interface DashboardTabProps {
    label : string,
    children: ReactElement | ReactElement[],
}
export const DashboardTab : React.FunctionComponent<DashboardTabProps> = props => {
    return (
        <Content>
            { props.children }
        </Content>
    );
}

const Content = styled.div`
    height: calc(100% - 48px);
    overflow: auto;
`;

