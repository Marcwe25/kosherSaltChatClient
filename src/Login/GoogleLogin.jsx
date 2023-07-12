import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import useAuth from "../hooks/auth-context"
import { useApi } from "../hooks/useApi"
import { ACCESS_TOKEN } from "../utility/constNames"

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    })

export default function GoogleLogin() {


    const { login, logout } = useAuth()
    const { axiosInstance } = useApi()

    // const googleButton = useRef(null);

    async function handleGoogleCallbackResponse(googleResponse) {
        localStorage.setItem(ACCESS_TOKEN, googleResponse.credential)
        const response = await axiosInstance.get("/Oauth2/member/google")
        const member = response.data
        login(member)
    }

    const initGoogleLogin = async () => {


        /* global google */
        await google.accounts.id.initialize({
            client_id: "512207636442-hp1vtt2ec05tijpfpfpil7vscg1h3ids.apps.googleusercontent.com",
            callback: handleGoogleCallbackResponse,
        })
        await google.accounts.id.renderButton(
            document.getElementById("googleOADiv"),
            {
                theme: "filled_black",
                // theme: "light",
                shape: "pill",
                // logo_alignment: "right",
                width: 300,
                // size: "large" 
                locale : "en-US"
            })
    }

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client?hl=en-US'
        loadScript(src)
        .then(() => {
            initGoogleLogin()
        })
        .catch(console.error)
            
    }, [])


    return <div id="googleOADiv"  />
}