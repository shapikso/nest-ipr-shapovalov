import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const PORT = 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(PORT, () => {
    console.log('Server working on port ', PORT);
  })
}

start();