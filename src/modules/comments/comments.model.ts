import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { Users } from "../users/users.model";
import { Products } from "../products/products.model";

interface CommentsCreationAttrs {
  commentText: string;
  userCommentId: number;
}

@Table({tableName: 'comments'})
export class Comments extends Model<Comments, CommentsCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, allowNull: false})
  commentText: string;

  @ForeignKey(() => Users)
  @Column({type: DataType.INTEGER, allowNull: false})
  userCommentId: number;

  @ForeignKey(() => Products)
  @Column({type: DataType.INTEGER, allowNull: false})
  productId: number;

  @BelongsTo(() => Users)
  author: Users

  @BelongsTo(() => Products )
  products: Products
}