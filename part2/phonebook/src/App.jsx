import { useState, useEffect  } from 'react'
import personsService from './services/persons'


const Message = ({notification}) => {


  if( notification.text ){
    return (
      <div className={ `message-notice ${notification.status}` }>
        {notification.text}
      </div>
    )
  }else{
    return null
  }

}

const Contacts = ({persons, removePerson}) => {
  if(persons){
    return (
        <div>
          { persons.map( (person) => <Contact key={person.id} contact={person} removePerson={removePerson} /> ) }
        </div>
      );
  }else{
    return (
      <div>
        <p>No persons</p>
      </div>
    )
  }
 
}

const Contact = ({contact, removePerson}) => {
  return (
    <p>{contact.name} <span>{contact.number}</span> <button onClick={ () => { removePerson(contact.id)   }}>Remove</button></p>
  )
}

const Filter = ({handleFilterName}) => {

  return (
    <div>
      Filter Show with: <input type="text" onChange={handleFilterName} />  
    </div>
    
  )
}

const PersonForm = ({handleAddContact, newName, handleName, newPhone, handlePhone}) => {
  return(
      <form onSubmit={handleAddContact}>
        <div>
          Name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          Phone: <input value={newPhone} onChange={handlePhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showPersons, setShowPersons] = useState('')
  const initialNotification = {text: '', status: ''}
  const [notification, setNotification] = useState(initialNotification)

  useEffect(() => {
    const personsAll = personsService.getAll()
    .then( initialPersons => {
      setPersons(initialPersons)
    })

  }, [])


  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if( confirm ){
      personsService
      .remove(id)
      .then( () => {
        setPersons(persons.filter(person => person.id !== id))

        setNotification( {
          text: `The contact ${person.name} was successfully deleted.`,
          status: 'success'
        } )
    
        setTimeout(() => {
          setNotification(initialNotification)
        }, 6000)


      })
      .catch( error => {

        setNotification( {
          text: `Error while removing the contact ${person.name}: ${error.message}`,
          status: 'error'
        } )
    
        setTimeout(() => {
          setNotification(initialNotification)
        }, 6000)
      })
    }
  }

  const handleFilterName = (event) => {
    setShowPersons(event.target.value)

  }

  const handleName = (event) => {
        setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
}

  const handleAddContact = (event) => {
    event.preventDefault()

    // prevent duplicate name

    const existName = persons.find(person => person.name === newName) 

    if( existName ){

      const confirmChange = window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with the new one?`)

      if( confirmChange ){

        const personObj = {
          name: newName,
          number: newPhone,
          id: existName.id
        }

        personsService
        .update(existName.id, personObj)
        .then(returnedPerson => {

          setPersons(persons.map(person => person.id !== existName.id ? person : returnedPerson.data))

          setNotification( {
            text: `The contact named ${newName} was successfully modified.`,
            status: 'success'
          } )

          setTimeout(() => {
            setNotification(initialNotification)
          }, 6000)

        }).catch(error => {

          setNotification( {
            text: `The contact was already deleted from the phonebook (${error.message}).`,
            status: 'error'
          } )
      
          setTimeout(() => {
            setNotification(initialNotification)
          }, 6000)

        })

      }

    }else{

      const personObj = {
        name: newName,
        number: newPhone,
      }

      personsService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson.data))

        setNotification( {
          text: `The contact with name ${newName} was successfully added to the Phonebook`,
          status: 'success'
        } )
    
        setTimeout(() => {
          setNotification(initialNotification)
        }, 6000)

      }).catch( error => {

        setNotification( {
          text: `Error while adding the contact ${personObj.name}: ${error.message}`,
          status: 'error'
        } )
    
        setTimeout(() => {
          setNotification(initialNotification)
        }, 6000)
      })
    }

    setNewName('')
    setNewPhone('')
   
  }

  const filterPersons = showPersons === ''
    ? persons
    : persons.filter(person => person.name.includes(showPersons) )

  return (
    <div>
      <h1>Phonebook</h1>
        <Message notification={notification} />
        <Filter handleFilterName={handleFilterName}/>
      <h3>Add a new</h3>
        <PersonForm handleAddContact={handleAddContact} newName={newName} handleName={handleName} newPhone={newPhone} handlePhone={handlePhone} />
      <h2>Numbers</h2>
        <Contacts persons={filterPersons} removePerson={removePerson}/>      
    </div>
  )
}

export default App
