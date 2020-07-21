import { BaseDatabase } from "./BaseDatabase";



export class CreatePostDatabase extends BaseDatabase {
    tableName!: string;
    private static TABLE_NAME = "Posts";

    public async createPosts(
      photo: string,
      description: string,
      creation_date: string,
      tipo: string,
          
    ): Promise<void> {
      await this.getConnection()
      .insert({
        photo,
        description,
        creation_date,
        tipo,
        
      })
      .into(CreatePostDatabase.TABLE_NAME);

      BaseDatabase.destroyConnection()
    }

    public async getRecipeById(id: string): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(CreatePostDatabase.TABLE_NAME)
        .where({ id });

        BaseDatabase.destroyConnection()

        return result[0];
    }  
}