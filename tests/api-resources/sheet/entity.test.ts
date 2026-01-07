// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Linkt from 'linkt';

const client = new Linkt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource entity', () => {
  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.sheet.entity.retrieve('entity_id', { sheet_id: 'sheet_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.sheet.entity.retrieve('entity_id', { sheet_id: 'sheet_id' });
  });

  // Prism tests are disabled
  test.skip('updateComments: only required params', async () => {
    const responsePromise = client.sheet.entity.updateComments('entity_id', { sheet_id: 'sheet_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateComments: required and optional params', async () => {
    const response = await client.sheet.entity.updateComments('entity_id', {
      sheet_id: 'sheet_id',
      comments: 'comments',
    });
  });

  // Prism tests are disabled
  test.skip('updateStatus: only required params', async () => {
    const responsePromise = client.sheet.entity.updateStatus('entity_id', {
      sheet_id: 'sheet_id',
      status: true,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateStatus: required and optional params', async () => {
    const response = await client.sheet.entity.updateStatus('entity_id', {
      sheet_id: 'sheet_id',
      status: true,
    });
  });
});
