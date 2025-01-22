import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { studentType } from "@/services/data-types/student-type";
import { savingType } from "@/services/data-types/saving-type";
import {
  savingServiceEdit,
  savingServiceUpdate,
} from "@/services/saving-service";

export default function EditSaving({
  savingDetail,
  id,
}: {
  savingDetail: savingType;
  id: string;
}) {
  const [datas, setDatas] = useState<savingType>(savingDetail);

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

      const response = await savingServiceUpdate(data, id);

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
          <h1 className="mt-4">Students</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Students</li>
            <li className="breadcrumb-item active">Update data</li>
          </ol>
          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputNIS" className="form-label">
                      NIS
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputNIS"
                      placeholder={savingDetail.student_id}
                      value={datas.student_id}
                      onChange={(e) =>
                        setDatas({ ...datas, student_id: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputNamaSiswa" className="form-label">
                      Nama Siswa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNamaSiswa"
                      placeholder={savingDetail.setor}
                      value={datas.setor}
                      onChange={(e) =>
                        setDatas({ ...datas, setor: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputJekel" className="form-label">
                      Jenis Kelamin
                    </label>
                    <select
                      className="form-select"
                      id="inputJekel"
                      value={datas.tgl}
                      onChange={(e) =>
                        setDatas({ ...datas, tgl: e.target.value })
                      }
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="LK">Laki-laki</option>
                      <option value="PR">Perempuan</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputGrade" className="form-label">
                      Grade
                    </label>
                    <select
                      className="form-select"
                      id="inputGrade"
                      value={datas.jenis}
                      onChange={(e) =>
                        setDatas({ ...datas, jenis: e.target.value })
                      }
                    >
                      <option value="">Pilih Grade</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
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

interface GetServerSideProps {
  params: {
    id: string;
  };
}

export async function getServerSideProps({ params }: GetServerSideProps) {
  const { id } = params;

  const response = await savingServiceEdit(id);

  return {
    props: {
      savingDetail: response.data,
      id: id,
    },
  };
}
