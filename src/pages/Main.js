import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "../assets/logo.svg"
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"

import './Main.css'

import api from '../services/api'

export default function Main({ match }) {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs', {
        headers: { user: match.params.id }
      })

      setDevs(response.data)
    }

    loadDevs();
  }, [match.params.id])

  async function handleLike(id, isLike) {
    await api.post(`/devs/${id}/${isLike ? "likes" : "dislikes"}`, null, {
      headers: { user: match.params.id }
    })

    setDevs(devs.filter(user => user._id !== id))
  }

  return (
    < div className="main-container" >
      <Link to='/'>
        <img src={logo} alt="Tindev" />
      </Link>

      {devs.length > 0 ? (
        <ul>
          {devs.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleLike(user._id, false)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id, true)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">Acabou :(</div>
        )}
    </div >
  )
}