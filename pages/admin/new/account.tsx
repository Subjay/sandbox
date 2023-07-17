import AdminLayout from "../../../components/admin-layout";
import Link from "next/link";
import style from "../../../styles/admin/new/account.module.css";
import { withSessionSsr } from "../../../lib/session-config";

export default function AddAccount(){
  return(
  <AdminLayout title="Add Account">
    <section className={ style.mainSection }>
      <Link href="/admin/dashboard">Go Back</Link>
    </section>
  </AdminLayout>);
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
