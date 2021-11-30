import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
// let authenticateUserUseCase: AuthenticateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile", () => {

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
        // authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
    });

    it("Should be able to show user profile", async () => {
        const user = await createUserUseCase.execute({
            name: "mateus",
            email: "mateus@email.com",
            password: "1234"
        });

        // const authenticate = await authenticateUserUseCase.execute({
        //     email: user.email,
        //     password: "1234"
        // });

        const response = await showUserProfileUseCase.execute(user.id!);

        expect(response).toHaveProperty("email");
        expect(response.name).toBe(user.name);
    });
});