export interface WidgetProperties {
    deviceId: string,
    props?: any,
}

export type WidgetFunction = (props: WidgetProperties) => JSX.Element;
