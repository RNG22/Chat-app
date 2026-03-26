# Chat-app
<!-- hi -->
<!-- create folders server client, socket -->
<!-- in server npm init --yes -->
<!-- npm i express mongoose cors dotenv -->
<!-- npm i cors@2.8.5 dotenv@16.0.3 express@4.18.2 mongoose@6.8.3 -->
<!-- npm i nodemon -->
<!-- npx nodemon server.js -->

<!-- Make sure you configure your "user.name" and "user.email" in git. -->
<!-- git config --global user.name "Rutuja Gaikwad" -->
<!-- git config --global user.email "rutujag44@gmail.com" -->

<!-- Mongo -->
<!-- 0.0.0.0/0 -this allows access to everyone -->
<!-- rutujag44 -->
<!-- 1234 -->
<!-- mongodb+srv://rutujag44:1234@cluster0.wpdwcbb.mongodb.net/ -->

<!-- used to hash password -->
<!-- npm i bcrypt jsonwebtoken validator -->

<!--  functionality-->
<!-- in server created controller(for logic), routes(for routes),model(for schema)
in server controller wrote logic and routes , connected through routes and model
1)register and 
2)login
3)get all users
4)get user by id -->


<!-- react -->
<!-- 1.routes -->
<!-- cd client
npm create vite@latest
if stoped running the project then type npm run dev
in another terminal cd client->npm i react-router-dom -->

<!-- in app.jsx import Routes,Route,Navigate
import Chat from "./pages/Chat"
structure
<Routes>
<Route path="/" element={<Chat/>} />
</Routes>
in main.jsx
import {BrowserRouter} from 'react-router-dom';
<BrowserRouter>
<App/>
</BrowserRouter> -->

<!-- 2.react bootstrap -->
<!-- npm i react-bootstrap bootstrap -->

<!-- 3.context api for form data frontend data-->
<!-- always this syntax, create context create contextprovider function in componewnt call it by useContext -->
<!-- in register component -->
<!-- const {registerInfo}=useContext(AuthContext) -->
<!-- create context folder with AuthContext.jsx
inside that export const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
    const [registeInfo,setRegisterInfo]=useState({
        name:"",
        email:"",
        password:""
    })
    call backfunction for reducing redundancy cache function
    const updateRegister=useCallback((info)=>{
setRegisterInfo(info)
    },[])
    return (
        <AuthContext.Provider value={{all states,setstates,functions}}>
        {children}
        </AuthContext.Provider>
    )
} -->