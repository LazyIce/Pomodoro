//@ts-ignore
module.exports = function() {
  let data = { 
    admin: {},
    users: [],
    projects: []
  };

  data.admin = {
    name: 'admin'
  };

  for (var i = 1; i <= 20; i++) {
    data.users.push({
        id: i, 
        firstName: 'Jack' + i,
        lastName: 'Jones' + i,
        email: 'user' + i + '@gatech.edu'
    });

    data.projects.push({
        id: i,
        projectName: 'project' + i
    })
  }

  return data
}