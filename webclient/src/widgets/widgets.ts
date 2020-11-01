export interface WidgetProperties {
    props?: any,
}

export type WidgetFunction = (props: WidgetProperties) => JSX.Element;



export interface WidgetConfiguration {
    type: string,
    properties?: any;
}



