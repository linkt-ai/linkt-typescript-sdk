// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Get file details by ID.
   *
   * Returns metadata for a specific file including name, size, and processing
   * status. Use this to check if a file is ready for use in workflows.
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<FileRetrieveResponse> {
    return this._client.get(path`/v1/files/${fileID}`, options);
  }

  /**
   * List uploaded files.
   *
   * Returns a paginated list of all files uploaded by your organization. Files can
   * be used as data sources for signal monitoring and ingest tasks.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileListResponse> {
    return this._client.get('/v1/files', { query, ...options });
  }

  /**
   * Upload a CSV or XLSX file.
   *
   * Upload a data file for use in signal monitoring or ingest workflows. The file is
   * stored securely and can be referenced when creating tasks. XLSX files are
   * automatically converted to CSV format (first sheet only).
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<FileUploadResponse> {
    return this._client.post(
      '/v1/files/upload',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * Processing status for CSV files.
 */
export type CsvProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Response model for file details.
 */
export interface FileRetrieveResponse {
  /**
   * Content type of the file
   */
  content_type: string;

  /**
   * The ID of the file
   */
  file_id: string;

  /**
   * The name of the file
   */
  name: string;

  /**
   * S3 URI of the file
   */
  s3_uri: string;

  /**
   * Size of the file in bytes
   */
  size_bytes: number;

  /**
   * CSV metadata
   */
  csv_metadata?: { [key: string]: unknown };

  /**
   * Original file type if converted (e.g., 'xlsx' if XLSX was converted to CSV)
   */
  original_file_type?: string | null;

  /**
   * Processing status
   */
  processing_status?: CsvProcessingStatus;
}

/**
 * Response model for file listing.
 */
export interface FileListResponse {
  /**
   * List of files
   */
  files: Array<FileListResponse.File>;

  /**
   * Current page number
   */
  page: number;

  /**
   * Number of items per page
   */
  page_size: number;

  /**
   * Total number of files
   */
  total: number;
}

export namespace FileListResponse {
  /**
   * File item in list response.
   */
  export interface File {
    /**
     * The ID of the file
     */
    file_id: string;

    /**
     * The name of the file
     */
    name: string;

    /**
     * Size of the file in bytes
     */
    size_bytes: number;
  }
}

/**
 * Response model for file upload.
 */
export interface FileUploadResponse {
  /**
   * Content type of the file
   */
  content_type: string;

  /**
   * The ID of the uploaded file
   */
  file_id: string;

  /**
   * The name of the file
   */
  name: string;

  /**
   * Processing status
   */
  processing_status: CsvProcessingStatus;

  /**
   * S3 URI of the uploaded file
   */
  s3_uri: string;

  /**
   * Size of the file in bytes
   */
  size_bytes: number;

  /**
   * CSV metadata
   */
  csv_metadata?: { [key: string]: unknown };

  /**
   * Original file type if converted (e.g., 'xlsx' if XLSX was converted to CSV)
   */
  original_file_type?: string | null;
}

export interface FileListParams {
  /**
   * Page number (1-based)
   */
  page?: number;

  /**
   * Items per page
   */
  page_size?: number;
}

export interface FileUploadParams {
  /**
   * CSV or XLSX file to upload
   */
  file: Uploadable;
}

export declare namespace Files {
  export {
    type CsvProcessingStatus as CsvProcessingStatus,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileListResponse as FileListResponse,
    type FileUploadResponse as FileUploadResponse,
    type FileListParams as FileListParams,
    type FileUploadParams as FileUploadParams,
  };
}
