export class CreateUserDto {
  public readonly email: string;
  public readonly role: string;
}

export class GetUserDto {
  public readonly email: string;
}
