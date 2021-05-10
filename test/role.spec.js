const role = require('../helper/role');
const { HttpCode, Gender } = require('../helper/constants');
const { User } = require('../model/__mocks__/data');

describe('Unit test : helper/role', () => {
  const req = { user: User };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(response => response),
  };

  const next = jest.fn();

  test('run function with right role', () => {
    role(Gender.FEMALE)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('run function with wrong role', () => {
    const result = role(Gender.MALE)(req, res, next);
    expect(result.status).toEqual('error');
    expect(result.code).toEqual(HttpCode.FORBIDDEN);
    expect(result.message).toEqual('Access is denied');
  });
});
