const uuid = require('uuid');
let users = require('./data').users;
let projects = require('./data').projects;
let sessions = require('./data').sessions;
const _ = require('lodash');

module.exports = server => {
   server.route({
      method: 'GET',
      path: '/users',
      config: {
         handler: (request, h) => {
            try {
               return users;
            } catch (e) {
               console.log(e);
               h.response('Server Error Occured').code(500);
            }
         }
      }
   });

   server.route({
      method: 'GET',
      path: '/users/{userId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;

               let result = {};
               let found = false;
               users.forEach(user => {
                  if (user.id == userId) {
                     found = true;
                     result = user;
                  }
               });

               if (found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('Not Found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'POST',
      path: '/users',
      config: {
         handler: (request, h) => {
            try {
               let new_user = request.payload;
               let user_exist = _.findIndex(users, function (u) {
                  return u.email == new_user.email;
               });
               if (user_exist == -1) {
                  new_user.id = Math.floor(Math.random()*(10000, 99999)+10000);
                  users.push(new_user);
                  return h.response(new_user).code(201);
               } else {
                  return h.response('Resource Conflict').code(409);
               }
            } catch (e) {
               console.log(e);
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'PUT',
      path: '/users/{userId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let updated_user = request.payload;
               let found = false;
               let result = {};
               users.forEach(function (user, index) {
                  if (user.id == userId) {
                     user.firstName = updated_user.firstName;
                     user.lastName = updated_user.lastName;
                     users[index] = user;
                     result = user;
                     found = true;
                  }
               });
               if (found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('User not found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Bad Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'DELETE',
      path: '/users/{userId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;

               let result = {};
               let found = false;
               users = users.filter(function (user, index, arr) {
                  if (user.id != userId) {
                     return user;
                  } else {
                     found = true;
                     result = user;
                  }
               });

               if (found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('User not found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Bad Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'GET',
      path: '/users/{userId}/projects',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let result = [];
               let user_found = false;

               result = projects.filter(function (p) {
                  user_found = true;
                  return p.userId == userId;
               });

               if (user_found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('User not found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Bad Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'POST',
      path: '/users/{userId}/projects',
      config: {
         handler: (request, h) => {
            try {
               let new_project = request.payload;
               let found_user = false;
               users.forEach(user => {
                  if (user.id == new_project.userId && user.id == request.params.userId) {
                     found_user = true;
                  }
               });

               if (!found_user) {
                  return h.response(users).code(404);
               }

               let project_exist = _.findIndex(projects, function (p) {
                  return p.projectname == new_project.projectname && p.userId == new_project.userId;
               });

               if (project_exist == -1) {
                  new_project.id = Math.floor(Math.random()*(10000, 99999)+10000);
                  projects.push(new_project);
                  return h.response(new_project).code(201);
               } else {
                  return h.response('Resource Conflict').code(409);
               }
            } catch (e) {
               console.log(e);
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'GET',
      path: '/users/{userId}/projects/{projectId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let projectId = request.params.projectId;
               let result = {};

               let project_found = false;

               projects.forEach(project => {
                  if (project.id == projectId && project.userId == userId) {
                     project_found = true;
                     result = project;
                  }
               });

               if (project_found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('Project or User not found').code(404);
               }
            } catch (e) {
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'PUT',
      path: '/users/{userId}/projects/{projectId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let projectId = request.params.projectId;
               let result = {};
               let project_found = false;
               let updated_project = request.payload;

               projects.forEach(function (project, index) {
                  if (project.id == projectId && project.userId == userId) {
                     project_found = true;
                     project.projectname = updated_project.projectname;
                     projects[index] = project;
                     result = project;
                  }
               });

               if (project_found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('Project or User not found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Bad Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'DELETE',
      path: '/users/{userId}/projects/{projectId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let projectId = request.params.projectId;
               let result = {};
               let project_found = false;

               projects = projects.filter(function (project, index, arr) {
                  if (!(project.id == projectId && project.userId == userId)) {
                     return project;
                  } else {
                     project_found = true;
                     result = project;
                  }
               });

               if (project_found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('Project or User not found').code(404);
               }
            } catch (e) {
               console.log(e);
               return h.response('Bad Request').code(400);
            }
         }
      }
   });
   server.route({
      method: 'POST',
      path: '/users/{userId}/projects/{projectId}/sessions',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let projectId = request.params.projectId;
               let new_session = request.payload;

               let project_found = false;
               projects.forEach(function (project, index) {
                  if (project.id == projectId && project.userId == userId) {
                     project_found = true;
                  }
               });

               if (!project_found) {
                  return h.response('User or Project not found').code(404);
               } else {
                  new_session.id = Math.floor(Math.random()*(10000, 99999)+10000);
                  sessions.push({ ...new_session, userId: parseInt(userId), projectId: parseInt(projectId) });
                  console.log(sessions)
                  return h.response(new_session).code(200);
               }
            } catch (e) {
               console.log(e);
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });

   server.route({
      method: 'PUT',
      path: '/users/{userId}/projects/{projectId}/sessions/{sessionId}',
      config: {
         handler: (request, h) => {
            try {
               let userId = request.params.userId;
               let projectId = request.params.projectId;
               let sessionId = request.params.sessionId;
               let updated_session = request.payload
               let session_found = false;
               let result = {}

               sessions.forEach(function (s, index) {
                  if (s.id == sessionId && s.userId == userId && s.projectId == projectId) {
                     session_found = true;
                     s.startTime = updated_session.startTime;
                     s.endTime = updated_session.endTime;
                     s.counter = updated_session.counter;
                     sessions[index] = s;
                     result = updated_session;
                  }
               });

               if (session_found) {
                  return h.response(result).code(200);
               } else {
                  return h.response('User or Project or session not found').code(404);
               }

            } catch (e) {
               console.log(e);
               return h.response('Invalid Request').code(400);
            }
         }
      }
   });
};
