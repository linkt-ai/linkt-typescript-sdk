// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entity extends APIResource {
  /**
   * Get a specific entity from a sheet.
   */
  retrieve(
    entityID: string,
    params: EntityRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<EntityRetrieveResponse> {
    const { sheet_id } = params;
    return this._client.get(path`/v1/sheet/${sheet_id}/entity/${entityID}`, options);
  }

  /**
   * Update the comments on an entity.
   *
   * Pass null to clear existing comments.
   */
  updateComments(
    entityID: string,
    params: EntityUpdateCommentsParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { sheet_id, ...body } = params;
    return this._client.put(path`/v1/sheet/${sheet_id}/entity/${entityID}/comments`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Update the status of an entity.
   *
   * Use status to mark entities as qualified (true) or disqualified (false) from
   * your target list.
   */
  updateStatus(
    entityID: string,
    params: EntityUpdateStatusParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { sheet_id, ...body } = params;
    return this._client.put(path`/v1/sheet/${sheet_id}/entity/${entityID}/status`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EntityRetrieveResponse = { [key: string]: unknown };

export interface EntityRetrieveParams {
  sheet_id: string;
}

export interface EntityUpdateCommentsParams {
  /**
   * Path param
   */
  sheet_id: string;

  /**
   * Body param: Comments for the entity
   */
  comments?: string | null;
}

export interface EntityUpdateStatusParams {
  /**
   * Path param
   */
  sheet_id: string;

  /**
   * Body param
   */
  status: boolean;
}

export declare namespace Entity {
  export {
    type EntityRetrieveResponse as EntityRetrieveResponse,
    type EntityRetrieveParams as EntityRetrieveParams,
    type EntityUpdateCommentsParams as EntityUpdateCommentsParams,
    type EntityUpdateStatusParams as EntityUpdateStatusParams,
  };
}
