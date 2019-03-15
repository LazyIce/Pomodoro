//@ts-ignore
module.exports = function() {
  let data = { 
    admin: {},
    users: [],
    projects: []
  };

  data.admin = [
    {
      name: 'admin'
    }
  ];

  for (var i = 1; i <= 20; i++) {
    var projects = [];
    for (var j = 1; j <= 20; j++) {
      projects.push({
        id: (i - 1)*20 + j,
        projectName: 'project' + (i - 1)*20 + j,
        sessionNumber: Math.round(Math.random() * 10),
        totalPomodoros: Math.round(Math.random() * 10)
      })
    }
    data.users.push({
        id: i, 
        firstName: 'Jack' + i,
        lastName: 'Jones' + i,
        email: 'user' + i + '@gatech.edu',
        projects: projects
    });
  }

  return data
}