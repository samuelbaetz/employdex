import { Table } from 'reactstrap';
import './App.css';
import API from './utils/API'
import { React,useEffect, useState} from 'react'
import {Jumbotron, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import Row from './components/table'
import Navigation from './components/navbar'
import {MdClear} from 'react-icons/md'
function App() {
  const [people, setPeople] = useState([])
    useEffect(() => {
        API.getPeople()
        .then(res => {
            setPeople(res.data.results)
           
        })
    }, [])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleInputChange = event => {
      const value = event.target.value
      const results = people.filter(p => {
        return p.name.last === value || p.name.first === value
      })
      console.log(results)
    if (results.length !== 0){
        setPeople(results)
      } 
    }

    const goBack = () => {
      API.getPeople()
      .then(res => {
          setPeople(res.data.results)
         
      })
    }

    const ageSort = () => {
     let sorted = [...people]
      sorted.sort( function( a , b){
        if(a.dob.age > b.dob.age) return 1;
        if(a.dob.age < b.dob.age) return -1;
        return 0;
    });
      setPeople(sorted)
      
    }

    const abcSort = () => {
      let sorted = [...people]
       sorted.sort( function( a , b){
         if(a.name.first > b.name.first) return 1;
         if(a.name.first < b.name.first) return -1;
         return 0;
     });
     setPeople(sorted)

       
     }

     const countrySort = () => {
      let sorted = [...people]
       sorted.sort( function( a , b){
         if(a.location.country > b.location.country) return 1;
         if(a.location.country < b.location.country) return -1;
         return 0;
     });
     setPeople(sorted)
     
       
     }
  return (
    <div className="App">
      <Navigation/>
      <Container>
      <Jumbotron>
      <div class="form-inline">
      <Button onClick={goBack}color="secondary"><MdClear/></Button>
  <input type="search" onChange={handleInputChange} id="form1" className="form-control" placeholder="Search By Name"
  aria-label="Search" />
  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Sort
      </DropdownToggle>
      <DropdownMenu>
      <DropdownItem onClick={ageSort}>Sort By Age</DropdownItem>
        <DropdownItem onClick={abcSort}>Sort Alphabetically</DropdownItem>
        <DropdownItem onClick={countrySort}>Sort By Location</DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
</div>
        {people.length ? (
      <Table hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Cell</th>
            <th>Email</th>
            <th>Age</th>
            <th>Country</th> 
            <th>More Info</th>          
          </tr>
        </thead>
        <tbody>
         
        {people.map(p => {
      return (
        <Row key={p.cell} image={p.picture.thumbnail} firstname={p.name.first} lastname={p.name.last} gender={p.gender} cell={p.cell} email={p.email} age={p.dob.age} country={p.location.country}/>
      )
    })}
         
        </tbody>
      </Table>
        ) : (
          <h1>No Results</h1>
        )}
      </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
