// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Linkt from '@linkt/sdk';

const client = new Linkt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource signal', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.signal.retrieve('signal_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.signal.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.signal.list(
        {
          days: 1,
          entity_id: 'entity_id',
          icp_id: 'icp_id',
          order: 0,
          page: 1,
          page_size: 1,
          search_term: 'search_term',
          signal_type: 'signal_type',
          sort_by: 'sort_by',
          strength: 'strength',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Linkt.NotFoundError);
  });
});
