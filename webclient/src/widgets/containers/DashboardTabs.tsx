import styled from "styled-components";
import React, { ReactElement } from "react";
import Tabs from '@mui/material/Tabs';
import { Tab } from "@mui/material";

interface DashboardTabsProps {
    tabsVisible: boolean,
    selectedTab: number,
    children: ReactElement<DashboardTabProps> []
}

export const DashboardTabs : React.FunctionComponent<DashboardTabsProps> = props => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <OuterContainer>
            { props.tabsVisible && 
                <StyledTabs value={value} onChange={handleChange} variant="scrollable"> 
                    { props.children && props.children.map((el, index) => { 
                        return <StyledTab value={index} label={el.props.label} key={index}/>
                        }) 
                    } 
                </StyledTabs>
            }
            { props.children[props.tabsVisible ? value : props.selectedTab] }
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

