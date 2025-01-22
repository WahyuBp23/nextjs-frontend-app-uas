import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { gradeType } from "@/services/data-types/grade-type";
import { gradeServiceStore } from "@/services/grade-service";
import React, { useState } from "react";

export default function CreateGrade() {
  const [datas, setDatas] = useState<gradeType>({
    grade: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    grade: "",
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("grade", datas.grade);

      const response = await gradeServiceStore(data);

      if (!response.error) {
        alert("Grade created unccessfully");
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
                    <input
                      type="text"
                      className="form-control"
                      id="inputGrade"
                      placeholder="Grade"
                      value={datas.grade}
                      onChange={(e) =>
                        setDatas({ ...datas, grade: e.target.value })
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
