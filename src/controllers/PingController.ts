interface PingResponse {
  message: string;
}

export default class PingController {
  static async getMessage(): Promise<PingResponse> {
    return {
      message: 'pong',
    };
  }
}
