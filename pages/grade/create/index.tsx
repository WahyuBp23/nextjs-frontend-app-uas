import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { gradeType } from "@/services/data-types/grade-type";
import { studentType } from "@/services/data-types/student-type";
import { studentServiceStore } from "@/services/student-service";
import React, { useState } from "react";

export default function CreateGrade() {
  const [datas, setDatas] = useState<gradeType>({
    grade_id: "",
  });
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
      data.append("grade_id", datas.grade_id);

      const response = await studentServiceStore(data);

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
            <li className="breadcrumb-item active">Tambah data</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
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
