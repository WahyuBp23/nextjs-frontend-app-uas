import callAPI from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

<<<<<<< HEAD
export async function savingService() {
=======
export async function gradeService() {
>>>>>>> f612f76790c9a3384613714ad532a3ed8011098f
  const url = `${ROOT_API}/${API_VERSION}/grade`;

  return callAPI({
    url,
    method: "GET",
    isToken: true,
  });
}
<<<<<<< HEAD

export async function savingServiceStore(data: FormData) {
=======
export async function gradeServiceStore(data: FormData) {
>>>>>>> f612f76790c9a3384613714ad532a3ed8011098f
  const url = `${ROOT_API}/${API_VERSION}/grade`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

<<<<<<< HEAD
export async function serviceServiceEdit(id: string) {
=======
export async function gradeServiceEdit(id: string) {
>>>>>>> f612f76790c9a3384613714ad532a3ed8011098f
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}/edit`;

  return callAPI({
    url,
    method: "GET",
  });
}

<<<<<<< HEAD
export async function savingServiceUpdate(data: FormData, id: string) {
=======
export async function gradeServiceUpdate(data: FormData, id: string) {
>>>>>>> f612f76790c9a3384613714ad532a3ed8011098f
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
  });
}
<<<<<<< HEAD

export async function savingServiceDestroy(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/grade/${id}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
=======
>>>>>>> f612f76790c9a3384613714ad532a3ed8011098f
