// import { useAuth0 } from "@auth0/auth0-react";
import react from "react";
import {auth} from './Components/Config/config';

function Contact(){
    // const {user,isAuthenticated}=useAuth0();
    const user=auth.currentUser;
    return(
        <div>
            <h2>Feel free to Contact us</h2>
            <div className="container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.26946630916!2d73.91305007499254!3d18.56188636791133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14107edc765%3A0xf498c1d4eb1c7571!2sPhoenix%20Boundary%20Road%2C%20Sakore%20Nagar%2C%20Viman%20Nagar%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1690818131697!5m2!1sen!2sin" width="100%" height="400" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="container">
                <form action="https://formspree.io/f/mpzgqdpj" method="POST" style={{display:"flex",flexDirection:"column",gap:"3rem"}}>
                    <input type="text" placeholder="USERNAME" name="username" value={user?user.name:""}  required autoComplete="off"/>
                    <input type="email" placeholder="EMAIL" name="Email" value={user?user.email:""} required autoComplete="off"/>
                    <textarea name="Query" rows="10" cols="30" placeholder="ENTER YOUR QUERY" required autoComplete="off"></textarea>
                    <input type="submit" value="SUBMIT" />
                </form>
            </div>
        </div>
    )
}

export default Contact;