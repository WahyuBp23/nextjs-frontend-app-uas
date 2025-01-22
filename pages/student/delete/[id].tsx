import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { studentType } from "@/services/data-types/student-type";
import {
  studentServiceDestroy,
  studentServiceEdit,
} from "@/services/student-service";

export default function DeleteStudent({
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

      const response = await studentServiceDestroy(id);

      if (!response.error) {
        alert("Student Delete unccessfully");
        window.location.href = "/";
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
          <h1 className="mt-4">Student</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Student</li>
            <li className="breadcrumb-item active">Hapus data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-7 mb-4">
                  <div className="mb-3"></div>
                  <h3>
                    Apakah Anda Ingin Menghapus Siswa dengan NIS {datas.nis} -{" "}
                    {datas.nama_siswa}
                  </h3>
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

  const response = await studentServiceEdit(id);

  return {
    props: {
      studentDetail: response.data,
      id: id,
    },
  };
}
