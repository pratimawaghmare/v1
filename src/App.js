/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import axios from 'axios'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react'
import AuthClass from '@aws-amplify/ui-react'
import { ConsoleLogger } from '@aws-amplify/core';
Amplify.configure(awsExports);

const initialState = { name: '', description: '', cognitoID: ''}
const baseURL = "https://49fb-108-54-179-218.ngrok.io";
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
    const path = 'getOrCreateUser'
    const endpoint = baseURL + '/' + path
    var data = JSON.stringify({"cognitoID": getID()});
    console.log('Getting/Creating User')

    var config = {
      method: 'post',
      url: endpoint,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try {
      const rsp = await axios(config)
      console.log("User info retrieved")
      console.log(rsp.data.cognitoID)
      setWidgetURL(rsp.data.cognitoID)
      console.log("Printing widget url state")
      console.log(widgetURL)
    } catch (err) {console.log(err)}

  }


  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      console.log("Getting todos")
      console.log(todoData)
      const todos = todoData.data.listTodos.items
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
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
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
    <div style={styles.container}>
      <iframe src = {widgetURL}></iframe>
      <h2>Amplify Todos: User #{widgetURL}</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      } 
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)