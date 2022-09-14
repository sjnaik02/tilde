import { useRouter } from 'next/router'

function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);
  return (
    <>
      <div className="bg-gray-800 font-mono py-4" >
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 lg:px-0">
          <p className="text-gray-100 text-xl py-2 ">User</p>
          {/*hide new note button when on create-note screen */
            pathname !== '/create-note' && ( <button className="w-fit bg-teal-600 text-gray-100 rounded p-2 " > New Note </button>)  }
         
        </div>
      </div>
      {children}
    </>
  )
}

export default Layout