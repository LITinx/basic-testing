import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const balance = 20;
  test('should create account with initial balance', () => {
    const newAccount = getBankAccount(balance);
    expect(newAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newAccount = getBankAccount(balance);
    expect(() => newAccount.withdraw(40)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(balance);
    expect(() => newAccount.transfer(40, newAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const newAccount = getBankAccount(balance);
    expect(() => newAccount.transfer(10, newAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(balance);
    newAccount.deposit(10);
    expect(newAccount.getBalance()).toBe(balance + 10);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(balance);
    newAccount.withdraw(10);
    expect(newAccount.getBalance()).toBe(balance - 10);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(balance);
    const secondAccount = getBankAccount(balance);
    firstAccount.transfer(10, secondAccount);
    expect(secondAccount.getBalance()).toBe(30);
    expect(firstAccount.getBalance()).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newAccount = getBankAccount(balance);
    const fetchedBalance = await newAccount.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newAccount = getBankAccount(50);
    await newAccount.synchronizeBalance();
    expect(newAccount.getBalance()).toBeGreaterThan(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newAccount = getBankAccount(50);

    newAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(newAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
