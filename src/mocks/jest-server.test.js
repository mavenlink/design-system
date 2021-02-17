describe('src/mocks/jest-server', () => {
  it('"serves" on http://localhost', async () => {
    const body = await (await fetch('http://localhost/hello')).text();

    expect(body).toEqual('Hello from MSW!');
  });
});
