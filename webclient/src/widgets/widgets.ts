export enum WidgetSize {
    XS,
    S,
    M,
    L,
    XL,
}

export interface WidgetProperties {
    deviceId: string,
    size: WidgetSize,
    props?: any,
}

export type WidgetFunction = (props: WidgetProperties) => JSX.Element;
