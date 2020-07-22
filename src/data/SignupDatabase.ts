import { BaseDatabase } from './BaseDatabase';
import { IdGenerator } from '../services/IdGenerator';

export class SignupDatabase extends BaseDatabase {
    tableName: string = 'UsersLabook6';

    public createUser = async (
        id: string,
        name: string,
        email: string,
        password: string
    ) => {
        await this.getConnection()
        .insert({
        id,
        name,
        email,
        password,
        })
        .into(this.tableName);
    }
}