import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductsModule } from './modules/products/products.module';
import { Products } from "./modules/products/products.model";
import { AwsS3Module } from "./modules/s3/s3.module";
import { FilesModule } from "./modules/files/files.module";
import { UsersModule } from './modules/users/users.module';
import { Users } from "./modules/users/users.model";
import { CommentsModule } from './modules/comments/comments.module';
import { Comments } from "./modules/comments/comments.model";
import { config } from "../config";


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: config.username,
      password: config.password,
      database: config.database,
      autoLoadModels: true,
      models: [
        Products,
        Users,
        Comments,
      ],
    }),
    ProductsModule,
    AwsS3Module,
    FilesModule,
    UsersModule,
    CommentsModule,
  ],
})
export class AppModule {

}