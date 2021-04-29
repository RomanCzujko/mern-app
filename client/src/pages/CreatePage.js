import React, {useState, useEffect, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {

    const history = useHistory ()

    const auth = useContext(AuthContext)

    useEffect (() => {
        window.M.updateTextFields()
      }, [])

    const {request}= useHttp()
    const [link, setLink] = useState ()
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
              const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
              history.push(`/detail/${data.link._id}`)
            } catch(e){

            }
        }
    }
    return (
        <div className="row">
            <div 
            className="col s8 offset-s2" style={{paddingTop:'2rem', 'width':'100%', 'marginLeft': 0}}
            >
                 <div className="input-field">
                <input 
                  placeholder="Insert your Link/URL and press Enter" 
                  id="link" 
                  type="text"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  onKeyPress={pressHandler} 
                />
                <label htmlFor="link">If your Link/URL is long you can shorten it!</label>
              </div>
            </div>
        </div>
    )
}