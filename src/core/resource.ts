// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Linkt } from '../client';

export abstract class APIResource {
  protected _client: Linkt;

  constructor(client: Linkt) {
    this._client = client;
  }
}
