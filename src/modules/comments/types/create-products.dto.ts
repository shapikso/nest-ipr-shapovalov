export class CreateCommentDto {
  public readonly userEmail: string;
  public readonly commentText: string;
  public readonly productId: number;
  public userCommentId: number;
}

export class GetUserDto {
  public readonly email: string;
}
