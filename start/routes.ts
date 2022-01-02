/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.group(() => {
  Route.post('/signup', 'AuthenticationController.signup').as('signup')
  Route.post('/login', 'AuthenticationController.login').as('login')
  Route.post('/logout', 'AuthenticationController.logout').as('logout')
  Route.get('/refresh_token', 'AuthenticationController.refreshToken').as('refresh_token')
  Route.post('/client_credentials', 'AuthenticationController.clientCredential').as(
    'client_credentials'
  )
})
  .prefix('/api/auth')
  .as('token_auth')

Route.get('/', async () => {
  return { hello: 'world' }
})
