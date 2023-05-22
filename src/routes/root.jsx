import RequireAuth from "../privateRoute/RequireAuth";
import { redirect} from "react-router-dom";
// import useRegisteredMember from '../hooks/useRegisteredMember';



export async function action() {
    return redirect(``);
}
  
export default function Root() {
  // const {registeredMember } = useRegisteredMember()

    return (
      <div id="rootDiv">

              <div id="detail">
                <RequireAuth />        
              </div>
          </div>
    );
  }
