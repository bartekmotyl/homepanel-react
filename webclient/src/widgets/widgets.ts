export interface WidgetProperties {
    props?: any,
}

export type WidgetFunction = (props: WidgetProperties) => JSX.Element;
