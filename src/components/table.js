import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Button} from 'reactstrap'
import {MdExpandMore} from 'react-icons/md'

const Row = (props) => {
    return(
        <tr>
        <th scope="row"><Avatar alt={props.lastname} src={props.image} /></th>
        <td>{props.firstname}</td>
        <td>{props.lastname}</td>
        <td>{props.gender}</td>
        <td>{props.cell}</td>
        <td>{props.email}</td>
        <td>{props.age}</td>
        <td>{props.country}</td>
        <td><Button color="info"><MdExpandMore/></Button></td>
      </tr>
    )
}

export default Row