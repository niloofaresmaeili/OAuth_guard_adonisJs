import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthenticationController {
  public static async signup({ request, response }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data_schema = schema.create({
      name: schema.string({
        trim: true,
      }),
      username: schema.string(
        {
          trim: true,
        },
        [rules.unique({ table: 'users', column: 'username' })]
      ),
      email: schema.string(
        {
          trim: true,
        },
        [rules.unique({ table: 'users', column: 'email' })]
      ),
      phone_number: schema.string(
        {
          trim: true,
        },
        [rules.unique({ table: 'users', column: 'phone_number' })]
      ),
      password: schema.string({}, [rules.confirmed('password_confirmation')]),
    })

    // get user data from signup form
    let userData = await request.validate({
      schema: data_schema,
    })

    if (userData.phone_number[2] === '0') {
      userData.phone_number = '98' + userData.phone_number.slice(3)
    }

    await User.create(userData)

    return response.ok({
      status: 'success',
      message: 'User registered.',
    })
  }

  public static async login({ request, response, auth }: HttpContextContract) {
    const postsSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })
    let email: string = ''
    let password: string = ''
    const validatedData = await request.validate({
      schema: postsSchema,
    })
    email = validatedData.email
    password = validatedData.password
    const user = await User.query().where('email', email).first()
    if (!user) {
      throw new Error('user not found!')
    }

    const token = await auth.use('api').attempt(email, password, {
      ip_address: request.ip(),
      expiresIn: '8 hours',
    })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let expire_minutes: number = 8 * 60

    return response.ok({
      status: 'success',
      expire_minutes: expire_minutes,
      token: token.toJSON(),
      user: user,
    })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').logout()
    return response.ok({
      message: 'user logout successfully',
    })
  }

  public async refreshToken({ response, auth }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let user_id: number
    user_id = auth.user!.id
    await auth.use('api').logout()
    const token = await auth.use('api').loginViaId(user_id, {
      expiresIn: '7 days',
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    let expire_minutes: number = 7 * 24 * 60

    return response.ok({
      expire_minutes: expire_minutes,
      token: token.toJSON(),
    })
  }
}
