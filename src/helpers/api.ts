import axios from "axios";

const REQ_CONFIG = {};

type ResponseType<T = any> = {
  succeed: boolean;
  status: number;
  message: string;
  data: T;
};

/**
 * api
 *
 * Q: 如何进行错误处理？
 * A: 在调用的位置，用 trycatch 块
 */
export namespace api {
  export async function get<T>(url: string): Promise<ResponseType<T>> {
    const res = await axios.get<ResponseType<T>>(url, REQ_CONFIG);

    if (res.status !== 200) {
      // handler error
      console.error(res);
    }

    if (!res.data.succeed) {
      throw res.data.message;
    }

    return res.data;
  }

  export async function post<T>(url: string, data?: BasicType): Promise<ResponseType<T>> {
    const res = await axios.post<ResponseType<T>>(url, data, REQ_CONFIG);

    if (res.status !== 200) {
      // handler error
      console.error(res);
    }

    if (!res.data.succeed) {
      throw res.data.message;
    }

    return res.data;
  }

  export function getUserInfo() {
    return get<Model.User>("/api/user/me");
  }

  export function signin(username: string, password: string) {
    return post("/api/user/signin", { username, password });
  }

  export function signup(username: string, password: string) {
    return post("/api/user/signup", { username, password });
  }

  export function signout() {
    return post("/api/user/signout");
  }

  export function checkUsernameUsable(username: string) {
    return get<boolean>("/api/user/checkusername?username=" + username);
  }

  export function checkPasswordValid(password: string) {
    return post<boolean>("/api/user/checkpassword", { password });
  }

  export function updateUserinfo(username: string = "", password: string = "") {
    return post("/api/user/update", {
      username,
      password,
    });
  }

  export function getMyMemos(offset: number = 0, amount: number = 20) {
    return get<Model.Memo[]>(`/api/memo/all?offset=${offset}&amount=${amount}`);
  }

  export function createMemo(content: string) {
    return post<Model.Memo>("/api/memo/new", { content });
  }

  export function getMemoById(id: string) {
    return get<Model.Memo>("/api/memo/?id=" + id);
  }

  export function deleteMemo(memoId: string) {
    return post("/api/memo/delete", {
      memoId,
    });
  }

  export function updateMemo(memoId: string, content: string) {
    return post<Model.Memo>("/api/memo/update", { memoId, content });
  }

  export function getMemosCount() {
    return get("/api/memo/count");
  }

  export function createTag(text: string) {
    return post<Model.Tag>("/api/tag/new", {
      text,
    });
  }

  export function createMemoTag(memoId: string, tagId: string) {
    return post("/api/tag/link", {
      memoId,
      tagId,
    });
  }

  export function removeMemoTag(memoId: string, tagId: string) {
    return post("/api/tag/rmlink", {
      memoId,
      tagId,
    });
  }

  export function getTagsByMemoId(memoId: string) {
    return get<Model.Tag[]>("/api/tag/memo?id=" + memoId);
  }

  export function getMyTags() {
    return get<Api.Tag[]>("/api/tag/all");
  }

  export function deleteTagById(tagId: string) {
    return post("/api/tag/delete", { tagId });
  }

  export function polishTag(tagId: string) {
    return post("/api/tag/polish", { tagId });
  }

  export function getMyDataAmount() {
    return get<Api.DataAmounts>("/api/user/amount");
  }

  export function getUrlContentType(url: string) {
    return get<string>("/api/base/srctype?url=" + url);
  }

  export function getMemosStat() {
    return get<Api.MemosStat[]>("/api/memo/stat");
  }

  export function removeGithubName() {
    return post("/api/user/updategh", { githubName: "" });
  }
}
