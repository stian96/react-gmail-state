import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const App = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [hideChecked, setHideChecked] = useState(false);
  const [inboxIndicator, setInboxIndicator] = useState(0);
  const [starredIndicator, setStarredIndicator] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setStarredIndicator(emails.filter((email) => email.starred).length);
    setInboxIndicator(emails.length);
  }, [emails]);

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) => {
      return email.id === targetEmail.id ? { ...email, read: !email.read } : email
    });
    setEmails(updatedEmails);
  }

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) => {
      return email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
    });
    setEmails(updatedEmails);
  }

  const hideReadEmails = () => setHideChecked(!hideChecked);
  const emailsToDisplay = hideChecked === true ? emails.filter((email) => !email.read) : emails;


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${!active ? 'active' : ''}`}
            onClick={() => setActive(!active)}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxIndicator}</span>
          </li>
          <li
            className={`item ${active ? 'active' : ''}`}
            onClick={() => setActive(!active)}
          >
            <span className="label">Starred</span>
            <span className="count">{starredIndicator}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideChecked}
              onClick={hideReadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          { emailsToDisplay.map((email) => (
            <li key={email.id} className="email">
              <div className="select">
                <input 
                  className="select-checkbox" 
                  type="checkbox" 
                  checked={email.read}
                  onClick={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input 
                  className="star-checkbox" 
                  type="checkbox" 
                  checked={email.starred}
                  onClick={() => toggleStar(email)}
                />
              </div>
              <div className="sender">
                {email.sender}
              </div>
              <div className="title">
                {email.title}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
