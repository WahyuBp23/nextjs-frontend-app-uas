import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { studentType } from "@/services/data-types/student-type";
import { studentService, studentServiceEdit } from "@/services/student-service";
import { savingType } from "@/services/data-types/saving-type";
import {
  savingServiceDestroy,
  savingServiceEdit,
} from "@/services/saving-service";

export default function DeleteSaving({
  savingDetail,
  id,
}: {
  savingDetail: savingType;
  id: string;
}) {
  const [student, setStudent] = useState<studentType[]>([]);

  const getStudent = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await studentService();

      if (response.error) {
        alert(response.message);
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

      const response = await savingServiceDestroy(id);

      if (!response.error) {
        alert("Student Delete unccessfully");
        window.location.href = "/saving";
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
            <li className="breadcrumb-item active">Hapus data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-7 mb-4">
                  <div className="mb-3"></div>
                  {student.map((student) => (
                    <h3>
                      Apakah Anda Ingin Menghapus Tabungan dari Siswa{" "}
                      {student.nis} - {student.nama_siswa}
                    </h3>
                  ))}
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

  const response = await savingServiceEdit(id);

  return {
    props: {
      savingDetail: response.data,
      id: id,
    },
  };
}
