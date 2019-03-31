let users = [];
for (i = 0; i < 10; i++) {
   users.push({
      id: i,
      firstName: 'Jack' + i,
      lastName: 'Jones' + i,
      email: 'jack.jones' + i + '@gmail.com'
   });
}

let projects = [
   {
      id: 0,
      projectname: 'project0',
      userId: 0
   },
   {
      id: 1,
      projectname: 'project1',
      userId: 1
   },
   {
      id: 2,
      projectname: 'project2',
      userId: 2
   },
   {
      id: 3,
      projectname: 'project3',
      userId: 3
   },
   {
      id: 4,
      projectname: 'project4',
      userId: 4
   },
   {
      id: 5,
      projectname: 'project5',
      userId: 5
   },
   {
      id: 6,
      projectname: 'project6',
      userId: 6
   },
   {
      id: 7,
      projectname: 'project7',
      userId: 8
   },
   { id: 8, projectname: 'project8', userId: 2 },
   {
      id: 9,
      projectname: 'project9',
      userId: 2
   },
   { id: 10, projectname: 'project10', userId: 2 },
   {
      id: 11,
      projectname: 'project11',
      userId: 3
   },
   { id: 12, projectname: 'project12', userId: 5 },
   {
      id: 13,
      projectname: 'project13',
      userId: 6
   },
   { id: 14, projectname: 'project14', userId: 7 },
   {
      id: 15,
      projectname: 'project15',
      userId: 8
   },
   { id: 16, projectname: 'project16', userId: 4 },
   {
      id: 17,
      projectname: 'project17',
      userId: 8
   },
   {
      id: 18,
      projectname: 'project18',
      userId: 1
   },
   {
      id: 19,
      projectname: 'project19',
      userId: 0
   }
];

let sessions = [
   {
      userId: 1,
      projectId: 1,
      id: 0,
      startTime: '2019-02-18T20:00Z',
      endTime: '2019-02-18T20:00Z',
      'counter': 1
   },
   {
      userId: 1,
      projectId: 1,
      id: 1,
      startTime: '2019-02-18T20:00Z',
      endTime: '2019-02-18T20:00Z',
      'counter': 4
   }
];

exports.users = users;
exports.projects = projects;
exports.sessions = sessions;
