import callAPI from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function savingService() {
  const url = `${ROOT_API}/${API_VERSION}/saving`;

  return callAPI({
    url,
    method: "GET",
    isToken: true,
  });
}

export async function savingServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/saving`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function savingServiceEdit(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/saving/${id}/edit`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function savingServiceUpdate(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/saving/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
  });
}

export async function savingServiceDestroy(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/saving/${id}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
