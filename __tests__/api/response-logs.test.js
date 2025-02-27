import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/simple-insert';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => Promise.resolve({ data: null, error: null }))
    }))
  }))
}));

describe('/api/simple-insert', () => {
  test('inserts a record successfully', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true
      })
    );
  });
}); 