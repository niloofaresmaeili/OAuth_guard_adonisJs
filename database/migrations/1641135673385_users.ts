import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('username', 256)
      table.string('name', 256)
      table.string('email', 500)
      table.text('password')
      table.string('phone_number', 15)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
