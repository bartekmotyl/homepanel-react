export abstract class Device {
  id: string;
  data: any;

  constructor(id: string, data: any) {
    this.id = id;
    this.data = data;
  }

  protected sendAction(
    action: string,
    params: object | undefined = undefined,
  ): void {
    //TODO: send websocket message
  }
}
