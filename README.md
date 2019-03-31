# PTTWeb1

### Run Dummy server

The server lives in the dummy_node_server folder. Go to this folder and use the following commands to run the server:

1. Install node modules `npm install`
2. Run `node app.js`

### Run PTT Application

Go to PTTWeb1 to run the application

1. Install node modules by running `npm install`
2. Modify BASE URL in shared/baseUrl.js
3. Run the dummy server as explained above
4. Run `npm start` to start the application

### Note to Developers about PTT app

All the code related to redux, which we use to manage state, lives in `src/redux`. To create new a action, define action in `redux/actionTypes/[action.file.name]`, create methods related to action in `redux/actionCreator/[action.file.name]` and define the reducer for the action in `redux/reducer/[action.file.name]`. For each action, you need to define its corresponding states in `redux/actionCreator/[action.file.name]`.

To call actions in the view, used mapToDispatch to map actions to component property.

These are some standard and we should follow them.
