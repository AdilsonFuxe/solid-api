import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";


export class CreateUserUseCase {
    constructor( 
        private usersRepositoy: IUsersRepository,
        private mailProvider: IMailProvider    
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepositoy.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists');
        }

        const user = new User(data);

        await this.usersRepositoy.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from : {
                name: data.name,
                email: data.email
            },
            subject: 'Seja bem-vindo ao app mwagole solidário',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        });
        
    }
}