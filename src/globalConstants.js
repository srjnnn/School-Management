const baseUrl = "http://localhost:4000/api";

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  test: {
    getAllTestData: `${v1Api}/test`,
  },
  students:{
    getAllStudentsData : `${v1Api}/students`,
  },
  teachers:{
    getAllTeachersData : `${v1Api}/teachers`
  }
};
