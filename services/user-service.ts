import callAPI from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function userService() {
  const url = `${ROOT_API}/${API_VERSION}/users`;

  return callAPI({
    url,
    method: "GET",
    isToken: true,
  });
}
export async function userServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/users`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}
