import { BaseDatabase } from "./BaseDatabase";

export class LoginDatabase extends BaseDatabase {
    tableName: string = 'UsersLabook6';
  

    public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tableName)
      .where({ email });

    return result[0];
    }
}