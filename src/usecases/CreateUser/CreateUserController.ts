import { CreateUserUseCase } from "./CreateUserUserCase";
import { Request, Response } from 'express';
import { createUserUseCase } from ".";

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            await createUserUseCase.execute({
                name, 
                email,
                password
            });
            return response.status(201).json();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error'
            });
        }
    }
}