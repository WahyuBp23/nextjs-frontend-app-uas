import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { gradeType } from "@/services/data-types/grade-type";
import {
  gradeServiceDestroy,
  gradeServiceEdit,
} from "@/services/grade-service";
import React, { useState } from "react";

export default function DeleteGrade({
  gradeDetail,
  id,
}: {
  gradeDetail: gradeType;
  id: string;
}) {
  const [datas, setDatas] = useState<gradeType>(gradeDetail);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    grade: "",
  });
  const onDelete = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("grade", datas.grade);

      const response = await gradeServiceDestroy(id);

      if (!response.error) {
        alert("Grade Delete unccessfully");
        window.location.href = "/grade";
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
          <h1 className="mt-4">Grade</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Grade</li>
            <li className="breadcrumb-item active">Hapus Data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-7 mb-4">
                  <div className="mb-3"></div>
                  <h1>Apakah Anda Ingin Menghapus grade {datas.grade}</h1>
                  <Button
                    type="button"
                    onClickButton={onDelete}
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

  const response = await gradeServiceEdit(id);

  return {
    props: {
      gradeDetail: response.data,
      id: id,
    },
  };
}
