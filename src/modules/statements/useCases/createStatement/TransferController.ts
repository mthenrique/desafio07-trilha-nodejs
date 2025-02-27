import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateStatementUseCase } from "./CreateStatementUseCase";


enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    //@HERE:
    TRANSFER = 'transfer'
}

class TransferController {
    async execute(request: Request, response: Response) {
        const { id: user_id } = request.user;
        const { user_id: sender_id } = request.params;
        const { amount, description } = request.body;

        const splittedPath = request.originalUrl.split('/')
        const type = splittedPath[splittedPath.length - 2] as OperationType;

        const createStatement = container.resolve(CreateStatementUseCase);

        const statement = await createStatement.execute({
            user_id,
            sender_id,
            type,
            amount,
            description
        });

        return response.status(201).json(statement);
    }
}

export { TransferController }


