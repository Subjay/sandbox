import AdminLayout from "../../components/admin-layout";
import getURL from "../../lib/utils";
import { useState, useEffect } from 'react';
import { withSessionSsr } from "../../lib/session-config";
import style from '../../styles/admin/login.module.css';

export default function Admin(){
  const handleSubmit = async () =>{
    if( inputLogin !== "" && inputPwd !== ""){
      await fetch( getURL('/api/login'), {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          login: inputLogin,
          pwd: inputPwd,
        }),
      } )
      .then( res => {
        if( res.ok ){
          return res.json();
        }
      })
      .then( success => {
        if( success ){
          window.location.href = '/admin/dashboard'
        }
        else{
          //display error message
          alert('wrong login/password');
        }
      })
      .catch( error => {
        console.log(error);
      });
    }
    //display error message
    return;
  }

  const [ inputLogin , setInputLogin ] = useState<string>('');
  const [ inputPwd , setInputPwd ] = useState<string>('');
  const [ isOk, setIsOK ] = useState<boolean>(false);
  
  useEffect( () =>{
    setIsOK(inputLogin !== '' && inputPwd != '');
  });

  return (
  <AdminLayout title='Login'>
    <section className={ style.formSection }>
      <form className={ style.loginForm }>
          <label>Login</label>
          <input type="text" value= { inputLogin } onChange={ (e) => setInputLogin(e.target.value) } />
          <label>Password</label>
          <input type="password" placeholder='********' value= { inputPwd } onChange={ (e) => setInputPwd(e.target.value) } />
          {
            isOk && <button type="button" onClick={ () => handleSubmit() } className={ style.submit }>Log in</button>
          }
      </form>
    </section>
  </AdminLayout>);
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps( context ) {
    const user = context.req.session.user;
    
    if( user?.type === 'admin' ){
      return {
        redirect: {
          permanent: false,
          destination: "/admin/dashboard",
        },
      };
    }

    return {
      props: {
      },
    };
  },
);
