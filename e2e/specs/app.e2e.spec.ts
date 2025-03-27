import { response } from 'express';

describe('Health', () => {
  test('Reservation', async () => {
    const response = await fetch('http://localhost:3001/all');
    expect(response.ok).toBeTruthy();
  });
});
