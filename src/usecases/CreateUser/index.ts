import { PostgressUserRepository } from "../../repositories/implementations/PostegresUserRepository";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvaider";
import { CreateUserUseCase } from "./CreateUserUserCase";
import { CreateUserController } from "./CreateUserController";

const postgresUserRepository = new PostgressUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();


const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController};