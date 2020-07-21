import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {
  tableName: string = "UserFriendLabook";

  public async makeFriend(
    user_id: string,
    user_to_add_id: string
  ): Promise<any> {
    try {
      await this.getConnection()
        .insert({ user_id, user_to_add_id })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
