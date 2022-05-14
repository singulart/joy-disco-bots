import { HasMany, Model } from 'sequelize-typescript'
import { Column, Table } from 'sequelize-typescript'
import { DaoRole } from './daorole'

@Table({
  tableName: 'dao_membership',
  underscored: true,
  indexes: [ // https://github.com/RobinBuschmann/sequelize-typescript/issues/725#issuecomment-686593266
    {
      name: 'ix_dao_membership_membership',
      fields: ['membership'],
    },
    {
      name: 'ix_dao_membership_discord_handle',
      fields: ['discord_handle'],
    },
  ]
})
export class DaoMembership extends Model {

  @Column
  membership!: string // on-chain user membership handle

  @Column
  discordHandle!: string 

  @HasMany(() => DaoRole) daoRoles!: DaoRole[] // list of on-chain roles a user has
}