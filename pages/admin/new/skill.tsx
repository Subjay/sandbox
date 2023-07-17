import style from "../../../styles/admin/new/skill.module.css";
import AdminLayout from "../../../components/admin-layout";
import Link from "next/link";
import { useState } from 'react';
import getURL from "../../../lib/utils";
import { withSessionSsr } from "../../../lib/session-config";

export default function AddSkill(){
  const [inputSkill, setInputSkill] = useState<string>("");

  const handleSubmit = async () => {
    if( inputSkill !== "" ){
      await fetch( getURL(`/api/skills/new`), {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-type' : 'application/json'
        },
        body: JSON.stringify( {
          name: inputSkill,
        } )
      } )
        .then( res => {
          if(res.ok){
            return res.json();
          }

          throw `Error /api/skills/new/${inputSkill} API => couldn't add skill`;
        })
        .then( data => {
          if( data.success ){
            window.location.href = '/admin/dashboard';
          }

          throw `Error /api/skills/new/${inputSkill} API => unsuccessful request`;
        })
        .catch( error => {
          console.log(error);
        });
    }
    else{
      return;
    }
  }
  
  return(
  <AdminLayout title="Add Skill">
    <section className={ style.mainSection }>
      <Link href="/admin/dashboard" className={ style.goBack }>Go Back</Link>
      <form>
        <label>Name</label>
        <input type="text" value={inputSkill} onChange={ (e) => setInputSkill(e.target.value) } />
        <button type="button" onClick={ () => handleSubmit() }>Add Skill</button>
      </form>
    </section>
  </AdminLayout>)
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps( context ) {
    const user = context.req.session.user;

    if( user?.type !== 'admin' ){
      return {
        redirect: {
          permanent: false,
          destination: "/admin",
        },
      };
    }

    return {
      props: {
      },
    };
  },
);
