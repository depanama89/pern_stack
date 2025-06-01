import { FaSpinner } from "react-icons/fa"


const loading = () => {
  return (
    <div className="w-full flex min-h-screen items-center justify-center py-2">
        <FaSpinner  className="animate-spin text-violet-600" size={28}/>
    </div>
  )
}

export default loading