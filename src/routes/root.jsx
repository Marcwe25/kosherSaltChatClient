import RequireAuth from "../privateRoute/RequireAuth";
import { redirect} from "react-router-dom";



export async function action() {
    return redirect(``);
}
  
export default function Root() {

    return (
      <div id="rootDiv">
              <div id="detail">
                <RequireAuth />        
              </div>
          </div>
    );
  }
