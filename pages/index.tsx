import Head from "next/head";
import Layout from "@/components/organisms/Layout";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import { studentType } from "@/services/data-types/student-type";
import { studentService } from "@/services/student-service";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Student</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Student</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Data Student{" "}
              <div className="d-flex justify-content-end gap-1">
                <Button
                  type="button"
                  onClickButton={getStudent}
                  isLoading={isLoading}
                  className={["btn btn-primary btn-sm"]}
                >
                  <i className="fas fa-sync-alt me-1"></i>
                </Button>
                <Button
                  type="link"
                  href="/student/create"
                  className={["btn btn-primary btn-sm me-2"]}
                >
                  Tambah Data
                </Button>
              </div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">NIS</th>
                    <th scope="col">Student</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Status</th>
                    <th scope="col">Year Mlebet</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((item: studentType, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nis}</td>
                      <td>{item.nama_siswa}</td>
                      <td>{item.jekel}</td>
                      <td>{item.grade_id}</td>
                      <td>{item.status}</td>
                      <td>{item.th_masuk}</td>
                      <td>
                        <Button
                          type="button"
                          // onClickButton={
                          //   () => handleDetail(item.id)
                          // }
                          className={["btn btn-success btn-sm me-2"]}
                        >
                          Detail
                        </Button>
                        <Button
                          type="link"
                          href={`student/edit/${item.id}`}
                          className={["btn btn-warning btn-sm me-2"]}
                        >
                          Update
                        </Button>
                        <Button
                          type="link"
                          // onClickButton={
                          //   () => handleDelete(item.id)
                          // }
                          className={["btn btn-danger btn-sm me-2"]}
                        >
                          delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
