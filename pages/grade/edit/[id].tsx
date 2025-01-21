import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { studentType } from "@/services/data-types/student-type";
import { studentServiceUpdate } from "@/services/student-service";
import { userServiceEdit, userServiceUpdate } from "@/services/user-service";
import React, { useState } from "react";

export default function EditStudent({
  studentDetail,
  id,
}: {
  studentDetail: studentType;
  id: string;
}) {
  const [datas, setDatas] = useState<studentType>(studentDetail);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    nis: "",
    nama_siswa: "",
    jekel: "",
    grade_id: "",
    status: "",
    th_masuk: "",
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("nis", datas.nis);
      data.append("nama_siswa", datas.nama_siswa);
      data.append("jekel", datas.jekel);
      data.append("grade_id", datas.grade_id);
      data.append("status", datas.status);
      data.append("th_masuk", datas.th_masuk);

      const response = await studentServiceUpdate(data, id);

      if (!response.error) {
        alert("Student created unccessfully");
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
                      placeholder={studentDetail.nis}
                      value={datas.nis}
                      onChange={(e) =>
                        setDatas({ ...datas, nis: e.target.value })
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
                      placeholder={studentDetail.nama_siswa}
                      value={datas.nama_siswa}
                      onChange={(e) =>
                        setDatas({ ...datas, nama_siswa: e.target.value })
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
                      value={datas.jekel}
                      onChange={(e) =>
                        setDatas({ ...datas, jekel: e.target.value })
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
                      value={datas.grade_id}
                      onChange={(e) =>
                        setDatas({ ...datas, grade_id: e.target.value })
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
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputStatus" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="inputStatus"
                      value={datas.status}
                      onChange={(e) =>
                        setDatas({ ...datas, status: e.target.value })
                      }
                    >
                      <option value="">Pilih Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Lulus">Lulus</option>
                      <option value="Pindah">Pindah</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputTahunMasuk" className="form-label">
                      Tahun Masuk
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputTahunMasuk"
                      placeholder="Tahun Masuk"
                      value={datas.th_masuk}
                      onChange={(e) =>
                        setDatas({ ...datas, th_masuk: e.target.value })
                      }
                    />
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

  const response = await userServiceEdit(id);

  return {
    props: {
      userDetail: response.data,
      id: id,
    },
  };
}
