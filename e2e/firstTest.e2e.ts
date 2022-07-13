describe('MyExpenses', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have loginScreen', async () => {
    await expect(element(by.id('email'))).toBeVisible();
  });

  it('should have proceed', async () => {
    await expect(element(by.text('Proceed'))).toHaveId('UniqueId204');
  });
});
