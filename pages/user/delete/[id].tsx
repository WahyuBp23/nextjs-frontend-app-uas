import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { userType } from "@/services/data-types/user-type";
import { userServiceDestroy, userServiceEdit } from "@/services/user-service";

export default function DeleteUser({
  userDetail,
  id,
}: {
  userDetail: userType;
  id: string;
}) {
  const [datas, setDatas] = useState<userType>(userDetail);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    name: "",
    username: "",
    password: "",
    password_verified_at: "",
    level: "",
  });
  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", datas.name);
      data.append("username", datas.username);
      data.append("password", datas.password);
      data.append("konfirmpw", datas.password_verified_at);
      data.append("level", datas.level);

      const response = await userServiceDestroy(id);

      if (!response.error) {
        alert("User Delete unccessfully");
        window.location.href = "/user";
      } else {
        if (response.message) {
          Object.entries(response.message).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              setIsError({ ...isError, [key]: "is-invalid" });
              alert(value[0]);
            }
          });
        }
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Users</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Users</li>
            <li className="breadcrumb-item active">Hapus data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-7 mb-4">
                  <div className="mb-3"></div>
                  <h3>Apakah Anda Ingin Menghapus User {datas.name}</h3>
                  <Button
                    type="button"
                    onClickButton={onSubmit}
                    className={["btn btn-primary"]}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
interface GetServerSideProps {
  params: {
    id: string;
  };
}

export async function getServerSideProps({ params }: GetServerSideProps) {
  const { id } = params;

  const response = await userServiceEdit(id);

  return {
    props: {
      userDetail: response.data,
      id: id,
    },
  };
}
