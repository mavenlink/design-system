describe('src/mocks/jest-server', () => {
  it('"serves" on http://mavenlink.api.com', async () => {
    const body = await (await fetch('http://mavenlink.api.com/hello')).text();

    expect(body).toEqual('Hello from MSW!');
  });
});
