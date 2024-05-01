import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Products } from "../products/products.model";
import { Comments } from "../comments/comments.model";

interface UsersCreationAttrs {
  email: string;
  role: string;
}

@Table({tableName: 'users'})
export class Users extends Model<Users, UsersCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, allowNull: false})
  email: string;
  @Column({type: DataType.STRING, allowNull: false})
  role: string;
  @HasMany( ()=> Products, 'userId')
  products: Products[];
  @HasMany( ()=> Comments, 'userCommentId')
  comments: Comments[];
}