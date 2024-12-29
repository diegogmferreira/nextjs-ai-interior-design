'use client'

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { UserDetailContext } from "./_context/user-detail-context"

export default function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    if (user) verifyUser();

    async function verifyUser() {
      const { data } = await axios.post('/api/verify-user', {
        user
      })

      return setUserDetail(data.result);
    }

  }, [user])

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  )
}