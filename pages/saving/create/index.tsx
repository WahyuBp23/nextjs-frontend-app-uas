import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { savingType } from "@/services/data-types/saving-type";
import { userType } from "@/services/data-types/user-type";
import { savingServiceStore } from "@/services/saving-service";
import { userServiceStore } from "@/services/user-service";
import React, { useState } from "react";

export default function CreateSaving() {
  const [datas, setDatas] = useState<savingType>({
    student_id: "",
    setor: "",
    tarik: "",
    tgl: "",
    jenis: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    student_id: "",
    setor: "",
    tarik: "",
    tgl: "",
    jenis: "",
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("student_id", datas.student_id);
      data.append("setor", datas.setor);
      data.append("tarik", datas.tarik);
      data.append("tgl", datas.tgl);
      data.append("jenis", datas.jenis);

      const response = await savingServiceStore(data);

      if (!response.error) {
        alert("Saving created unccessfully");
        // router.push('/user');
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
          <h1 className="mt-4">Saving</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Saving</li>
            <li className="breadcrumb-item active">Tambah data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputStudentId" className="form-label">
                      ID Siswa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputStudentId"
                      placeholder="ID Siswa"
                      value={datas.student_id}
                      onChange={(e) =>
                        setDatas({ ...datas, student_id: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputSetor" className="form-label">
                      Setor
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputSetor"
                      placeholder="Jumlah Setor"
                      value={datas.setor}
                      onChange={(e) =>
                        setDatas({ ...datas, setor: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputTarik" className="form-label">
                      Tarik
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputTarik"
                      placeholder="Jumlah Tarik"
                      value={datas.tarik}
                      onChange={(e) =>
                        setDatas({ ...datas, tarik: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputTgl" className="form-label">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputTgl"
                      value={datas.tgl}
                      onChange={(e) =>
                        setDatas({ ...datas, tgl: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputJenis" className="form-label">
                      Jenis
                    </label>
                    <select
                      className="form-control"
                      id="inputJenis"
                      value={datas.jenis}
                      onChange={(e) =>
                        setDatas({ ...datas, jenis: e.target.value })
                      }
                    >
                      <option value="">Pilih Jenis</option>
                      <option value="SR">Setor</option>
                      <option value="TR">Tarik</option>
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
