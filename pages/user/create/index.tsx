import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { userType } from "@/services/data-types/user-type";
import { userServiceStore } from "@/services/user-service";
import React, { useState } from "react";

export default function CreateUser() {
  const [datas, setDatas] = useState<userType>({
    name: "",
    username: "",
    password: "",
    password_verified_at: "",
    level: "",
  });
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
      data.append("konfirm-pw", datas.password_verified_at);
      data.append("level", datas.level);

      const response = await userServiceStore(data);

      if (!response.error) {
        alert("User created unccessfully");
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
            <li className="breadcrumb-item active">Tambah data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="name"
                      value={datas.name}
                      onChange={(e) =>
                        setDatas({ ...datas, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsername"
                      placeholder=""
                      value={datas.username}
                      onChange={(e) =>
                        setDatas({ ...datas, username: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder=""
                      value={datas.password}
                      onChange={(e) =>
                        setDatas({ ...datas, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputKonfirmPw" className="form-label">
                      Konfirmasi Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputKonfirmPw"
                      placeholder=""
                      value={datas.password_verified_at}
                      onChange={(e) =>
                        setDatas({
                          ...datas,
                          password_verified_at: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputLevel" className="form-label">
                      Level
                    </label>
                    <select
                      className="form-select"
                      id="inputLevel"
                      value={datas.level}
                      onChange={(e) =>
                        setDatas({ ...datas, level: e.target.value })
                      }
                    >
                      <option value="">Pilih Level</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Petugas">Petugas</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <Button
              type="button"
              onClickButton={onSubmit}
              className={["btn btn-primary"]}
            >
              Submit
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
