import { expect } from 'chai'
import { agent } from 'supertest';
import {App} from "../Application";
import config from "../config";
import {Done} from "mocha";
const v = config.apiVersion

const request = agent(App)

describe('Auth Controller', () => {
  const yourEmail = ''
  const confirmedCode = ''
  const loginRoute = `/api/${v}/login`
  it(`Should POST ${loginRoute}`, async (done: Done) => {
    try {
      const res = await request.post(loginRoute).send({
        email: yourEmail
      })
      expect(res.status).to.equal(200)
      expect(res.body).not.to.be.empty
      expect(res.body.data).to.be.a('string')
    } catch (e) {
      done(e)
    }
  })


  // const checkCodeRoute = `/api/${v}/check-code`
  // it(`Should POST ${checkCodeRoute}`, async () => {
  //   const res = await request.post(checkCodeRoute).send({
  //     email: yourEmail,
  //     code: confirmedCode
  //   })
  //   expect(res.status).to.equal(200)
  //   expect(res.body).not.to.be.empty
  //   expect(res.body.data).to.be.a('string')
  // })
})
