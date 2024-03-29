import React from 'react'
import { Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class ListingBase extends React.Component {

    state = {
        users: null,
        fetching: false,
        error: null,
        addedUsers: JSON.parse(localStorage.getItem('addedUsers')) || []
    }

    componentDidMount() {
        this.setState({
            fetching: true
        })

        fetch(
            `${process.env.PUBLIC_URL}/database.json` // template string usage
        ).then(
            response => response.json()
        ).then(
            users => this.setState({ users: users.concat(this.state.addedUsers), fetching: false })
        ).catch(
            error => this.setState({ error, fetching: false })
        )
    }

    render() {
        const { users, error, fetching } = this.state

        return (
            <div>
                <h1>Baza</h1>
                {
                    users !== null ?
                        <Table striped bordered condensed hover style={{
                            marginTop: 20
                        }}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imie i nazwisko</th>
                                <th>Adres e-mail</th>
                                <th>Miasto</th>
                                {/*<th>Płeć</th>*/}
                                {/*<th>Zdjęcie</th>*/}
                                <th>Szczegóły</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users && users.map(
                                    ({ id, fullname, city, gender,email,avatar }, index, allGroups) => (
                                        <tr key={id}>
                                            <td>
                                                {id}
                                            </td>
                                            <td>
                                                {fullname}
                                            </td>
                                            <td>
                                                {email}
                                            </td>
                                            <td>
                                                {city}
                                            </td>
                                            {/*<td>*/}
                                                {/*{gender}*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                                {/*<img src={avatar}/>*/}
                                            {/*</td>*/}
                                            <td>
                                                <Link to={'/final-results/' + id}>Zobacz</Link>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>

                        </Table> :
                        <p>Brak wyników</p>
                }

                {
                    users !== null ?
                        null :
                        <p>Brak wyników</p>
                }

                {
                    fetching === false ?
                        null :
                        <p>Pobieranie bazy...</p>
                }

                {
                    error === null ?
                        null :
                        <p>{error.message}</p>
                }
            </div>
        )
    }


}



export default ListingBase

