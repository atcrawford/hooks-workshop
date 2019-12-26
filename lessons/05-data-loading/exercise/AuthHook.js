import { useState, useEffect } from "react"
import { onAuthStateChanged } from 'app/utils'

export default function useAuthHook(){
    const [authAttempted, setAuthAttempted] = useState(false)
    const [auth, setAuth] = useState(null)
  
    useEffect(() => {
      return onAuthStateChanged(auth => {
        setAuthAttempted(true)
        setAuth(auth)
      })
    }, [])
  
    return { auth, authAttempted }
  }