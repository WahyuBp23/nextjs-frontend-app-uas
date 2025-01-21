import callAPI from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function studentService() {
  const url = `${ROOT_API}/${API_VERSION}/student`;

  return callAPI({
    url,
    method: "GET",
    isToken: true,
  });
}
export async function studentServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/student`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function studentServiceEdit(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/student/${id}/edit`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function studentServiceUpdate(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/student/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
  });
}
