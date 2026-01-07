// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Signal extends APIResource {
  /**
   * Get a specific signal by ID (read-only).
   */
  retrieve(signalID: string, options?: RequestOptions): APIPromise<SignalResponse> {
    return this._client.get(path`/v1/signal/${signalID}`, options);
  }

  /**
   * List signals for the organization (read-only).
   *
   * Signals are immutable event records detected by AI agents, such as funding
   * rounds, hiring events, and leadership changes. They cannot be created or
   * modified through the API.
   */
  list(
    query: SignalListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SignalListResponse> {
    return this._client.get('/v1/signal', { query, ...options });
  }
}

/**
 * Response model for signals (read-only).
 */
export interface SignalResponse {
  id: string;

  created_at: string;

  entity_ids: Array<string>;

  icp_id: string;

  references: Array<string>;

  signal_type: string | null;

  strength: string | null;

  summary: string;
}

/**
 * Response for listing signals.
 */
export interface SignalListResponse {
  page: number;

  page_size: number;

  signals: Array<SignalResponse>;

  total: number;
}

export interface SignalListParams {
  /**
   * Number of days to look back
   */
  days?: number;

  /**
   * Filter by entity
   */
  entity_id?: string | null;

  /**
   * Filter by ICP
   */
  icp_id?: string | null;

  /**
   * Sort order: -1 for descending, 1 for ascending
   */
  order?: number | null;

  page?: number;

  page_size?: number;

  /**
   * Search in signal summary or type
   */
  search_term?: string | null;

  /**
   * Filter by type
   */
  signal_type?: string | null;

  /**
   * Field to sort by (e.g., 'created_at', 'updated_at', 'signal_type', 'strength')
   */
  sort_by?: string | null;

  /**
   * Filter by strength
   */
  strength?: string | null;
}

export declare namespace Signal {
  export {
    type SignalResponse as SignalResponse,
    type SignalListResponse as SignalListResponse,
    type SignalListParams as SignalListParams,
  };
}
