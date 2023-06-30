import React, {useEffect, useState} from 'react'
import axios from "axios";

import './Search.css'
import './Styles.css'

const clientId = '24906163b5bbb0461673';
const clientSecret = '67e7842cd6b70f5612125a6e60c9624fd59a43d2'


export default function Search() {
    const [error, setError] = useState('')
    const [username, setUsername] = useState('Wesamsh14');
    const [data, setData] = useState([]);
    const urlGit = `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}&sort=created`
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };


    const fetchData = () => {
        if (username === ''){
            setError('Can nor be empty')
        }  else if (username) {
            axios
                .get(
                    `${urlGit}`
                )
                .then((response) => {
                    setData(response.data);
                    setError('');
                    setUsername('');
                })
                .catch((error) => {
                    setError(error.message);
                });
        }

    };

    useEffect(() => {
        fetchData();
    }, []);


    return (

        <section className={'section_main'}>
            <div className="container">
                <div className={'search_wrapper'}>

                    {data ? (
                        <div className={'datalist_wrapper'}>
                            <img src={data.avatar_url} alt="Avatar"/>
                            <p>Name: {data.name}</p>
                            <hr/>
                            <p>Location: {data.location}</p>
                            <hr/>
                            <p>Followers: {data.followers}</p>
                            <hr/>
                            <p>Email: {data.email}</p>
                            <hr/>
                            <p>Login: {data.login}</p>
                            <hr/>
                            <p>Created at: {data.created_at}</p>
                        </div>
                    ) : (
                        <div>empty</div>
                    )


                    }

                    <input className={'input'} value={username} type="text" onChange={handleUsernameChange}/>
                    <p>{error}</p>

                    <button className={'button'} onClick={fetchData}>Submit</button>


                </div>
            </div>

        </section>
    )
}
