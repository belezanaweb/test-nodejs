import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('ProductJSON', { schema: 'dbo' })
export class ProductJSON {
  @PrimaryColumn({ type: 'integer', primary: true, name: 'CodigoProduct' })
  codigoProduct!: number

  @Column({ type: 'text', name: 'Value' })
  value!: string
}
