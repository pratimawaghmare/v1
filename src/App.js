/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import axios from 'axios'
import { createUser } from './graphql/mutations'
import { listUsers } from './graphql/queries'
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react'
import AuthClass from '@aws-amplify/ui-react'
import { ConsoleLogger } from '@aws-amplify/core';
Amplify.configure(awsExports);

const initialState = { name: '', description: '', cognitoID: ''}
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
const App = () => { 
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [widgetURL, setWidgetURL] = useState("")

  useEffect(() => {
    setFormState({cognitoID: getID()})
    fetchTodos()
    getOrCreateUser()
    
  }, [])
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function getOrCreateUser() {
    const path = 'widgets/master'
    const params = '?' + 'cognitoID=' + getID()
    const endpoint = baseURL + '/' + path + params
    console.log(endpoint)
    var data = ""
    console.log('Getting/Creating User')
    var config = {
      method: 'get',
      url: endpoint,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try {
      const rsp = await axios(config)
      setWidgetURL(rsp.data.url)
    } catch (err) {console.log(err)}
  }
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listUsers))
      console.log("Getting todos")
      console.log(todoData)
      const todos = todoData.data.listUsers.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      console.log("Getting User ID")
      var userID = getID()
      console.log("User id" + userID)
      await API.graphql(graphqlOperation(createUser, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  function getUserData(){
    var userData = null
    for(var key in localStorage) {
      if (key.includes("userData")) {
          userData = JSON.parse(localStorage.getItem(key))
          break
      }
    }
    if (userData == null) {
      console.log('Problem getting user data')
    }
    return userData
  }

  function getID() {
    var userData = getUserData()
    var userID = userData['UserAttributes'][0]['Value']
    return userID
  } 

  function getEmail() {
    var userData = getUserData()
    return userData['UserAttributes'][4]['Value']
  }

  return (
    <div style={styles.rootStyle}>
      <iframe style={styles.container} src = {widgetURL}></iframe>
    </div>
  )
}

const styles = {
  rootStyle: {height: '100vh', margin: '0px'},
  container: { height: '100%', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)