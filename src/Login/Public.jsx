import { LOGIN_PAGE, REGISTRATION_PAGE } from "../utility/constNames"
import Login from "./Login"
import Registration from "./Registration"
import { useState } from "react"

export default function Public () {

    const [page,setPage] = useState(LOGIN_PAGE)

    const goToPage = (p) =>{
        setPage(p)
    }
    if(page === LOGIN_PAGE) return <Login goToPage={goToPage}/>

    if(page === REGISTRATION_PAGE) return <Registration goToPage={goToPage}/>

}