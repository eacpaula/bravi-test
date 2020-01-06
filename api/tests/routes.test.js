const request = require('supertest')
const app = require('../bin/www')

var person = null;

describe('POST person', () => {
  it('should create a new person', async () => {
    const res = await request(app)
      .post('/api/people')
      .send({
        firstname: "Firstname",
        lastname: "Lastname",
        age: 25,
        contacts: [
          {
            type: "Whatsapp",
            info: "(54)98149-1193",
            description: ""
          },
          {
            type: "Phone",
            info: "(54)98149-1193",
            description: ""
          },
          {
            type: "Email",
            info: "firstname.lastname@test-mail.com",
            description: ""
          }
        ]
      })
    expect(res.statusCode).toEqual(201)
  })
})

describe('GET people', () => {
  it('should get all people', async () => {
    const res = await request(app).get('/api/people')
    person = res.body ? res.body[0] : null
    expect(res.statusCode).toEqual(200)
  })
})

describe('GET person', () => {
  it('should get one people', async () => {
    const res = await request(app).get(`/api/people/${person._id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body._id).toEqual(person._id)
  })
})

describe('PUT person', () => {
  it('should update an existed person', async () => {
    const res = await request(app)
      .put(`/api/people/${person._id}`)
      .send({
        firstname: "Firstname",
        lastname: "Lastname",
        age: 30,
        contacts: [
          {
            type: "Whatsapp",
            info: "(54)98149-1193",
            description: ""
          },
          {
            type: "Phone",
            info: "(54)98149-1193",
            description: ""
          },
          {
            type: "Email",
            info: "firstname.lastname@test-mail.com",
            description: ""
          }
        ]
      })
    expect(res.statusCode).toEqual(200)
  })
})

describe('DELETE person', () => {
  it('should delete an existed person', async () => {
    const res = await request(app).delete(`/api/people/${person._id}`)
    expect(res.statusCode).toEqual(204)
  })
})