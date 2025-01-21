import callAPI from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function gradeService() {
  const url = `${ROOT_API}/${API_VERSION}/grade`;

  return callAPI({
    url,
    method: "GET",
    isToken: true,
  });
}

export async function gradeServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/grade`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function gradeServiceEdit(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}/edit`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function gradeServiceUpdate(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
  });
}

export async function savingServiceDestroy(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
