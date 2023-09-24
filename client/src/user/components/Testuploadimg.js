import React, { useEffect, useState } from 'react';

import FileBase64 from 'react-file-base64';
import axios from 'axios'

const Testuploadimg = () => {

    const url = "http://localhost:8080/createtestdb";

    const getItems = async () => {
        try {
            const { data } = await axios.get(url);
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const createItem = async (todo) => {
        try {
            const { data } = await axios.post(url, todo);
            return data
        } catch (error) {
            console.log(error)
        }
    }


    const [item, setItem] = useState({ image: '' });
    const [items, setItems] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const result = await createItem(item);
        setItems([...items, result]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getItems();
            setItems(result)
        }
        fetchData()
    }, [])


    return (
        <div>
            <form action="" onSubmit={onSubmitHandler}>
                <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                />
                <button className>submit</button>
            </form>

            {items?.map(item => (

                <div className="card" key={item._id}>
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={item.image} />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{item.title}</span>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Testuploadimg