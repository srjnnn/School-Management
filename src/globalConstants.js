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
    updateStudentData : `${v1Api}/students`,
    getStudentsDataByClassSection : (classId, classSection) => `${v1Api}/students/${classId}/${classSection}`
  },
  teachers:{
    getAllTeachersData : `${v1Api}/teachers`,
    sendTeachersData : `${v1Api}/teachers`,
    deleteTeachersData : `${v1Api}/teachers`,
    updateTeacherData : `${v1Api}/teachers`,
    getTeachersbyclassSection: (classId, Section)=>`${v1Api}/teachers/${classId}/${Section}`

  },
  timetable:{
    sendTimetableData : `${v1Api}/timetable`,
    updateTimetableData : `${v1Api}/timetable`,
    getTimetableDataById : (classId, classSection) => `${v1Api}/timetable/${classId}/${classSection}`
  },
  classNotes:{
    getAllClassNotes : `${v1Api}/classnotes`,
    sendClassNotesData : `${v1Api}/classnotes`,
    getClassNotesbySubject : (subject,Class) => `${v1Api}/classnotes/subject/${Class}/${subject}`,
    getClassNotesbyClass :(classId) => `${v1Api}/classnotes/class/${classId}`,
    // getClassNotesbyTime : (time) => `${v1Api}/classnotes/${time}`

  },
  attendence:{
    getStudentsByClassId :(classId,classSection) => `${v1Api}/attendence/${classId}/${classSection}`,
    sendAttendenceData: `${v1Api}/attendence`,
    checkAttendenceData : `${v1Api}/attendence/check`,
    updateAttendence : `${v1Api}/attendence/update`
  },

  auth:{
     login: `${v1Api}/login`,
     validateToken : `${v1Api}/isValid`,
     changePassword : `${v1Api}/change`,
     resetRequest : `${v1Api}/reset`,
     updatePassword :`${v1Api}/update`
  },
  bus:{
    getBusById : (busId) =>`${v1Api}/bus/busId/${busId}`
  },

  
  events:{
     postRoutes : `${v1Api}/events`
  } ,

  feedback:{
    getFeedbackData : `${v1Api}/feedbacks`,
    postFeedbackData : `${v1Api}/feedbacks`,
  }
  

};
