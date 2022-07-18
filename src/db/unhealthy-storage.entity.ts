import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'unhealthy_storage_provider',
  underscored: true
})
export class UnhealthyStorageProvider extends Model {
  
  @Column declare endpoint: string
}