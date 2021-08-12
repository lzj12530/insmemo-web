import { api } from "../helpers/api";
import userStore from "../stores/userStore";

class UserService {
  public getState() {
    return userStore.getState();
  }

  public async doSignIn() {
    try {
      const { data: user } = await api.getUserInfo();
      if (user) {
        userStore.dispatch({
          type: "SIGN_IN",
          payload: { user },
        });
      } else {
        userService.doSignOut();
      }
      return user;
    } catch (error) {
      // do nth
    }
  }

  public async doSignOut() {
    await api.signout();
    userStore.dispatch({
      type: "SIGN_OUT",
      payload: { user: null },
    });
  }

  public async checkUsernameUsable(username: string): Promise<boolean> {
    const { data: isUsable } = await api.checkUsernameUsable(username);
    return isUsable;
  }

  public async updateUsername(username: string): Promise<void> {
    await api.updateUserinfo(username);
  }

  public async removeGithubName(): Promise<void> {
    await api.removeGithubName();
  }

  public async checkPasswordValid(password: string): Promise<boolean> {
    const { data: isValid } = await api.checkPasswordValid(password);
    return isValid;
  }

  public async updatePassword(password: string): Promise<void> {
    await api.updateUserinfo("", password);
  }
}

const userService = new UserService();

export default userService;
