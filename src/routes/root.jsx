import RequireAuth from "../privateRoute/RequireAuth";
import { Outlet,redirect} from "react-router-dom";



export async function action() {
    return redirect(``);
}
  
export default function Root() {

    return (
      <div>
          <div id="sidebar">
            <h1>Contacts</h1>

          </div>
              <div id="detail">
                <RequireAuth redirectTo="/login" />        
               {/* <Outlet /> , */}


              </div>
          </div>
    );
  }
