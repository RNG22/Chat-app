# Chat-app
<!-- create folders server, client, socket -->
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
<!-- //changed files app.jsx for all paths and main.jsx for <BowserRouter> -->
<!-- in app.jsx import {Routes,Route,Navigate} from 'react-router-dom';
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
<!-- can use react bootstrap components like import {container} from 'react-bootstrap' or use classnames by import 'bootstrap/dist/css/bootstrap.min.css'; className=:secondary-text" -->
<!-- can import fonts from google fonts, go to google fonts select fonts copy style code paste it in index.css @import url("https/codefrom googlefonts website") and in body add font-family:"Nunito",sans-sarif; sans-sarif is fallback if nunito from google fonts not font -->

<!-- in components create NavBar.jsx
import {Container,Nav,Navbar,stack} from "react-bootstrap";
import {Link} from 'react-router-dom'
stack used to align items horizontal or vertically(default vertically)
return <Navbar bg="dark"><Container>
<h2><Link to="/">Chatapp</Link></h2>
<span>Logged in as </span>
<Nav direction="horizontal"><Link to="/login"><Link to="/register"></Nav>
</Container></Navbar> -->
<!-- in app.jsx
<>
<NavBar/>
<Container>
<Routes>
<Route path="/" element={<Chat/>}></Route>
</Routes>
</Container>
</> -->
<!-- 
in register.jsx
import {Alert, Button,Form, Row, Col, Stack} from 'react-bootstrap';
return(<>
<Form>
<Row><Col><Stack>
<h1>Register</h1><Form.Control type="text" placeholder"Name" /></Form.Controltype="email" placeholder"Email" /></Form.Controltype="password" placeholder"Password" />
<Button type="submit">Register</Button>
<Alert>Error</Alert>
</Stack></Col></Row>
</Form>
</>)
same for login page
 -->


<!-- 3.context api for form data frontend data-->
<!-- in src add context ->AuthContext.jsx -->
<!-- always this syntax, create context, create contextprovider function in component call it by useContext -->

<!-- create context folder with AuthContext.jsx
inside that 
import {createContext} from 'react'
export const AuthContext=createContext();
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
<!-- in main.jsx
<React.StrictMode><BrowserRouter><AuthContextProvider><App> -->
<!-- in register component -->
<!-- const {registerInfo}=useContext(AuthContext) -->

<!-- chat apis -->
<!-- create model, import it in controller, import controller in routes, import routes in index.js -->
<!-- in controller //createChat
//findUsersChats
//findChat -->
<!-- in routes router.post("/",createChat);
router.get("/:userId",findUsersChats);
router.get("/find/:firstId/:secondId",findChat); -->

<!-- in client install  npm i moment for timestamp -->
<!-- npm i react-input-emoji -->


<!-- socket -->
<!-- create socket folder , in cmd write cd socket -> npm init -yes -->
<!-- npm i socket.io -->
<!-- in client -->
<!-- cd client ->npm i socket.io-client -->
<!-- in chatcontext file  -->
<!-- in socket ->cd socket ->npm install nodemon --save-dev ->npx nodemon-->

<!-- working on removing notification on clicking chat 1:03:26 -->


<!-- if got any error for socket cors error, close all terminals, cd all folderes and rerun all servers -->
<!-- client-5173, sever -2000 -->