const baseUrl = "http://localhost:4000/api";

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  test: {
    getAllTestData: `${v1Api}/test`,
  },
  students:{
    getAllStudentsData : `${v1Api}/students`,
    sendStudentData : `${v1Api}/students`,
    deleteStudentData :` ${v1Api}/students`,
    updateStudentData : `${v1Api}/students`
  },
  teachers:{
    getAllTeachersData : `${v1Api}/teachers`,
    sendTeachersData : `${v1Api}/teachers`,
    deleteTeachersData : `${v1Api}/teachers`,
    updateTeacherData : `${v1Api}/teachers`

  },
  timetable:{
    getAllTimetableData : `${v1Api}/timetable`,
    sendTimetableData : `${v1Api}/timetable`,
    updateTimetableData : `${v1Api}/timetable`
  },
  classNotes:{
    getAllClassNotes : `${v1Api}/classnotes`,
    sendClassNotesData : `${v1Api}/classnotes`
  }

};
