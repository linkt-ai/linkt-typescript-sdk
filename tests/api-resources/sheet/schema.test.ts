// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Linkt from '@linkt/sdk';

const client = new Linkt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schema', () => {
  // Prism tests are disabled
  test.skip('addFields: only required params', async () => {
    const responsePromise = client.sheet.schema.addFields('5eb7cf5a86d9755df3a6c593', {
      fields: [{ field_type: 'string', name: 'name' }],
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
  test.skip('addFields: required and optional params', async () => {
    const response = await client.sheet.schema.addFields('5eb7cf5a86d9755df3a6c593', {
      fields: [
        {
          field_type: 'string',
          name: 'name',
          additional_props: { foo: 'bar' },
          array_items: { foo: 'bar' },
          description: 'description',
          enum_values: [{}],
          properties: { foo: 'bar' },
          reference_model: 'reference_model',
          required: true,
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('deleteFields: only required params', async () => {
    const responsePromise = client.sheet.schema.deleteFields('5eb7cf5a86d9755df3a6c593', {
      fields: ['string'],
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
  test.skip('deleteFields: required and optional params', async () => {
    const response = await client.sheet.schema.deleteFields('5eb7cf5a86d9755df3a6c593', {
      fields: ['string'],
    });
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.sheet.schema.get('5eb7cf5a86d9755df3a6c593');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getDefault', async () => {
    const responsePromise = client.sheet.schema.getDefault();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getFieldDefinitions', async () => {
    const responsePromise = client.sheet.schema.getFieldDefinitions();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
