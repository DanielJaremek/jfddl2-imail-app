import React from 'react'


class AddForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            gender: '',
            city: '',
            saveUsers: JSON.parse(localStorage.getItem('addedUsers')) || []
        }
    }

    handleNameInputChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleEmailInputChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleCityInputChange = (event) => {
        this.setState({
            city: event.target.value
        });
    }

    handleGenderInputChange = (event) => {
        this.setState({
            gender: event.target.value
        });
    }

    handleAddUser = (event) => {
        event.preventDefault();

        let newUser = {
            id: Date.now(),
            avatar: "http://www.iconsdb.com/icons/preview/dark-gray/businessman-xxl.png",
            fullname: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            city: this.state.city
        };

        this.setState({
            saveUsers: this.state.saveUsers.concat(newUser)
        }, () => {
            localStorage.setItem('addedUsers', JSON.stringify(this.state.saveUsers));
        });
    }

    render() {
        return (
            <div>
                <h1>Dodaj do listy</h1>
                <form
                    onSubmit={this.handleSubmit}
                >
                    imię i nazwisko <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameInputChange}
                />
                    <br/>
                    adres e-mail <input
                    type="text"
                    value={this.state.email}
                    onChange={this.handleEmailInputChange}
                /><br/>
                    mężczyzna <input
                    type="radio"
                    name="name"
                    value="mężczyzna"
                    onChange={this.handleGenderInputChange}
                />
                    kobieta <input
                    type="radio"
                    name="name"
                    value="kobieta"
                    onChange={this.handleGenderInputChange}
                />
                    <br/>
                    miasto <input
                    type="text"
                    value={this.state.city}
                    onChange={this.handleCityInputChange}
                />
                    <br/>
                    <button onClick={this.handleAddUser}>
                        Zapisz
                    </button>
                </form>

                <ul>
                    {this.state.saveUsers.map((user, index) =>
                        <li key={index}>{user.fullname}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default AddForm