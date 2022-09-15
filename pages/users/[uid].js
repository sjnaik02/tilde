import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function User(){
  const { data: session, status } = useSession();
  const router = useRouter();
  const { uid } = router.query;

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <>
      <h1>Welcome user {uid}</h1>
    </>
  )
}