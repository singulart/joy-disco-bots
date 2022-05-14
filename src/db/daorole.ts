import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DaoMembership } from './daomembership.entity'

@Table({
  tableName: 'dao_role',
  underscored: true
})
export class DaoRole extends Model {
  
  @Column role!: string

  @ForeignKey(() => DaoMembership) @Column membershipId!: number;

  @BelongsTo(() => DaoMembership) membership!: DaoMembership
}