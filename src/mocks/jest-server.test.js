describe('src/mocks/jest-server', () => {
  it('"serves" on http://localhost', async () => {
    const body = await (await fetch('http://localhost/hello')).text();

    expect(body).toEqual('Hello from MSW!');
  });

  // This test exists to prove that MSW will fail tests that try to request against an unhandled endpoint. Un-"x"-it if you need to confirm the failure.
  xit('errors on unhandled requests', async () => {
    const body = await (await fetch('http://localhost/null')).text();

    expect(body).toEqual('');
  });
});
