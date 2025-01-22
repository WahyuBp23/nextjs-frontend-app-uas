import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { savingType } from "@/services/data-types/saving-type";
import { studentType } from "@/services/data-types/student-type";
import { savingServiceStore } from "@/services/saving-service";
import { studentService } from "@/services/student-service";
import React, { useState, useEffect, useCallback } from "react";

export default function CreateSaving() {
  const [student, setStudent] = useState<studentType[]>([]);

  const getStudent = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await studentService();

      if (response.error) {
        alert(response.message);
        window.location.href = "/saving";
      } else {
        setStudent(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getStudent();
  }, [getStudent]);

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
                    <label htmlFor="inputGrade" className="form-label">
                      NIS
                    </label>
                    <select
                      className="form-select"
                      id="inputGrade"
                      value={datas.student_id}
                      onChange={(e) =>
                        setDatas({ ...datas, student_id: e.target.value })
                      }
                    >
                      <option value="">Pilih Nis</option>
                      {student.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.nis} - {student.nama_siswa}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputSetor" className="form-label">
                      Setor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputSetor"
                      placeholder="Jumlah Setor"
                      value={`Rp ${datas.setor.toLocaleString()}`}
                      onChange={(e) =>
                        setDatas({
                          ...datas,
                          setor: e.target.value
                            .replace("Rp", "")
                            .replace(/\D/g, ""),
                        })
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
                      type="text"
                      className="form-control"
                      id="inputTarik"
                      placeholder="Jumlah Tarik"
                      value={`Rp ${datas.tarik.toLocaleString()}`}
                      onChange={(e) =>
                        setDatas({
                          ...datas,
                          tarik: e.target.value
                            .replace("Rp", "")
                            .replace(/\D/g, ""),
                        })
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
                      Jenis Transaksi
                    </label>
                    <select
                      className="form-select"
                      id="inputJenis"
                      value={datas.jenis}
                      onChange={(e) =>
                        setDatas({ ...datas, jenis: e.target.value })
                      }
                    >
                      <option value="">Pilih Jenis Transaksi</option>
                      <option value="ST">Setor</option>
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
