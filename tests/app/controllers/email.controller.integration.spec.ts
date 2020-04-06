import supertest from 'supertest';
import { Exceptions } from "../../../app/enums";
import { createServer } from "http";
import { Server } from "../../../app/server";

describe('Tests email controller', () => {
  let server: any;

  const url = `/v2/email/send`;

  const postRequest = async (payload:any, code: number): Promise<{ success: boolean; message: string }> => {
    console.log(code)
    const response = await supertest(server)
      .post(url)
      .send(payload);
      // .expect(code);

    return response.body;
  };

  beforeAll((done) => {
    let app = new Server().app;
    server = createServer(app);
    server.listen(done);
  });

  afterAll(done => server.close(done));

  test('fail for invalid email', async (done) => {
    const response = await postRequest({}, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.INVALID_EMAIL);

    done();
  });

  test('fail for invalid email2', async (done) => {
    const response = await postRequest({
      to: 'aaaa'
    }, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.INVALID_EMAIL);

    done();
  });

  test('fail for lack of message text', async (done) => {
    const response = await postRequest({
      to: 'aaaa@gmail.com'
    }, 400);

    const { success, message } = response;

    expect(success).toBeFalsy();
    expect(message).toBe(Exceptions.EMAIL_TEXT_REQUIRED);

    done();
  });

  test('succeed a message sent', async (done) => {
    const response = await postRequest({
      to: 'andreas@sapioweb.com',
      text: 'hey hello'
    }, 200);

    console.log(response)

    const { success, message } = response;

    expect(success).toBeTruthy();
    expect(message).toBe('Queued. Thank you.');

    done();
  });
});
