import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Users } from "../users/users.model";
import { Comments } from "../comments/comments.model";

interface ProductCreationAttrs {
  brand: string;
  description: string;
  productImage: string;
  price: number;
  ram: number;
  screenSize: string;
}

@Table({tableName: 'products'})
export class Products extends Model<Products, ProductCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, allowNull: false})
  title: string;
  @Column({type: DataType.STRING, allowNull: false})
  brand: string;
  @Column({type: DataType.STRING, allowNull: false})
  description: string;
  @Column({type: DataType.STRING, allowNull: false})
  productImage: string;
  @Column({type: DataType.INTEGER, allowNull: false})
  price: number;
  @Column({type: DataType.INTEGER, allowNull: false})
  ram: number;
  @Column({type: DataType.STRING, allowNull: false})
  screenSize: string;
  @ForeignKey(() => Users)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;
  @HasMany(() => Comments, 'productId')
  comments: Comments[]
}