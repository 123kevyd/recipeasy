// Script used for load testing
import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = { vus: 10, duration: '5m' }

export default function main() {
  let response

  group('page_1 - http://waxbill.cs.umanitoba.ca:3000/user/1', function () {
    response = http.post(
      'http://waxbill.cs.umanitoba.ca:3000/api/ingredients',
      '{"price":0,"name":"new ingredient"}',
      {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          accept: '*/*',
          origin: 'http://waxbill.cs.umanitoba.ca:3000',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    )

    response = http.put(
      'http://waxbill.cs.umanitoba.ca:3000/api/user/1',
      '{"ingredients":[1,2,11]}',
      {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          accept: '*/*',
          origin: 'http://waxbill.cs.umanitoba.ca:3000',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    )
    sleep(4.2)

    response = http.put('http://waxbill.cs.umanitoba.ca:3000/api/user/1', '{"ingredients":[1,2]}', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        accept: '*/*',
        origin: 'http://waxbill.cs.umanitoba.ca:3000',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    sleep(8.7)

    response = http.post(
      'http://waxbill.cs.umanitoba.ca:3000/api/equipment',
      '{"price":0,"name":"new equipment"}',
      {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          accept: '*/*',
          origin: 'http://waxbill.cs.umanitoba.ca:3000',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    )

    response = http.put('http://waxbill.cs.umanitoba.ca:3000/api/user/1', '{"equipment":[1,10]}', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        accept: '*/*',
        origin: 'http://waxbill.cs.umanitoba.ca:3000',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    sleep(2.9)

    response = http.put('http://waxbill.cs.umanitoba.ca:3000/api/user/1', '{"equipment":[1]}', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        accept: '*/*',
        origin: 'http://waxbill.cs.umanitoba.ca:3000',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    sleep(4.8)

    response = http.post(
      'http://waxbill.cs.umanitoba.ca:3000/api/restrictions',
      '{"price":0,"name":"new restriction"}',
      {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          accept: '*/*',
          origin: 'http://waxbill.cs.umanitoba.ca:3000',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    )

    response = http.put(
      'http://waxbill.cs.umanitoba.ca:3000/api/user/1',
      '{"restrictions":[1,10]}',
      {
        headers: {
          'content-type': 'text/plain;charset=UTF-8',
          accept: '*/*',
          origin: 'http://waxbill.cs.umanitoba.ca:3000',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    )
    sleep(3)

    response = http.put('http://waxbill.cs.umanitoba.ca:3000/api/user/1', '{"restrictions":[1]}', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        accept: '*/*',
        origin: 'http://waxbill.cs.umanitoba.ca:3000',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
  })
}