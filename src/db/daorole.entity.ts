import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DaoMembership } from './daomembership.entity'

@Table({
  tableName: 'dao_role',
  underscored: true
})
export class DaoRole extends Model {
  
  @Column declare role: string

  @ForeignKey(() => DaoMembership) @Column declare membershipId: number;

  @BelongsTo(() => DaoMembership) declare membership: DaoMembership
}