import { BaseContoroller } from "./BaseController.controller";
import { User} from "../interfaces/UserInterface.interface";

export class UsersController extends BaseContoroller {

  async login(userData: User) {
    const response = await this.request.post(
      `${process.env.API_URL}/users/login`,
      {
        data: userData,
      },
    );
    return response;
  }

  async createUser(userData: User) {
    const response = await this.request.post(`${process.env.API_URL}/users`, {
      data: userData,
    });
    return response;
  }

  async editUser(userData: User) {
    const response = await this.request.put(`${process.env.API_URL}/user`, {
      data: userData,
    });
    return response;
  }
}
