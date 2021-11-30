import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach( async () => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("Should be able to authenticate a user", async () => {
        const user = await createUserUseCase.execute({
            name: "mateus",
            email: "mateus@email.com",
            password: "1234"
        });

        const authenticate = await authenticateUserUseCase.execute({
            email: user.email,
            password: "1234"
        });

        expect(authenticate).toHaveProperty("user.id");
        expect(authenticate).toHaveProperty("token");
    });

});