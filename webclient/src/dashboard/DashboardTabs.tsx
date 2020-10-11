import styled from "styled-components";
import React, { ReactElement } from "react";
import Tabs from '@material-ui/core/Tabs';
import { Tab } from "@material-ui/core";

export interface DashboardTabsProps {
    children: ReactElement<DashboardTabProps> []
}


export const DashboardTabs : React.FunctionComponent<DashboardTabsProps> = props => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <OuterContainer>
            <StyledTabs value={value} onChange={handleChange} variant="scrollable"> 
                { props.children && props.children.map((el, index) => { 
                    return <StyledTab value={index} label={el.props.label} key={index}/>
                    }) 
                } 
            </StyledTabs>
            { props.children[value] }
       </OuterContainer>
    );
}

const OuterContainer = styled.div`
    height: calc(100% - 48px);
    background-color: #2E2F34;
`; 
const StyledTabs = styled(Tabs)`
    color: #DADEE7;
`;

const StyledTab = styled(Tab)` 
  && { 

    background-color: #2E2F34; 
    ${props => props.selected && `
         background-color: #383C45;
         color: #F8FCFF;
    `}
    }
`; 

export interface DashboardTabProps {
    label : string,
    children: ReactElement | ReactElement[],
}

export const DashboardTab : React.FunctionComponent<DashboardTabProps> = props => {
    return (
        <>
            { props.children }
        </>
    );
}


