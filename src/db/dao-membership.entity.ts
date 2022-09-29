import { HasMany, Model } from 'sequelize-typescript'
import { Column, Table } from 'sequelize-typescript'
import { DaoRole } from './dao-role.entity'

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
  declare membership: string // on-chain user membership handle

  @Column
  declare accountAddress: string 

  @Column
  declare discordHandle: string 

  @HasMany(() => DaoRole) 
  declare daoRoles: DaoRole[] // list of on-chain roles a user has
}