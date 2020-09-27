import React from 'react';
import styled from 'styled-components';
import { WidgetPanel } from './WidgetPanel';


export function DashboardTest() {
    return (
        <Container>
            <WidgetPanel rows={6} columns={4} />
        </Container>
    );
}


const Container = styled.div`
    width: 100vw;
    height: 66vw;  
    background-color: pink;
    overflow: scroll;  
`;