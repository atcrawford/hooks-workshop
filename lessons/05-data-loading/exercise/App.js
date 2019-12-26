import React from 'react'

import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'
import useAuthHook from 'app/AuthHook'

export default function App() {
  const {auth, authAttempted} = useAuthHook()

  if (!authAttempted) {
    return <p>Authenticating...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
