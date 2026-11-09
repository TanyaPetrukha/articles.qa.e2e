import { APIRequestContext } from "@playwright/test";

export abstract class BaseContoroller {
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}