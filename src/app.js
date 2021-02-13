import { http } from './http'

const data  =http.get('http://localhost:3000/comments');
data.then( users=> console.log(users));
