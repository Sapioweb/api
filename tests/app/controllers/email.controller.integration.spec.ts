import supertest from 'supertest';
import { server } from "../../../index";
import { Exceptions } from "../../../app/enums";

describe('Tests email controller', () => {
  const url = `/v2/email/send`;

  const postRequest = async (payload:any, code: number): Promise<{ success: boolean; message: string }> => {
    const response = await supertest(server)
      .post(url)
      .send(payload)
      .expect(code);

    return response.body;
  };

  test('fail for invalid email', async () => {
    const response = await postRequest({}, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.INVALID_EMAIL)
  });

  test('fail for invalid email2', async () => {
    const response = await postRequest({
      to: 'aaaa'
    }, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.INVALID_EMAIL)
  });

  test('fail for lack of message text', async () => {
    const response = await postRequest({
      to: 'aaaa@gmail.com'
    }, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.EMAIL_TEXT_REQUIRED)
  });

  test('succeed a message sent', async () => {
    const response = await postRequest({
      to: 'andreas@sapioweb.com',
      text: 'hey hello'
    }, 200);

    const { success, message } = response;

    expect(success).toBeTruthy();
    expect(message).toBe('Queued. Thank you.')
  });
});
