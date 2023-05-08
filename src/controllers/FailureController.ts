import { Controller, Get, Route } from 'tsoa';

@Route('failure')
export class FailureController extends Controller {
  @Get()
  public async getFailure(): Promise<void> {
    throw new Error('unknown error');
  }
}
