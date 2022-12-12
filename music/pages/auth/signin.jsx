import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loader from '../../components/UI/Loader';

const Signin = ({ providers }) => {
   const { data: session } = useSession();
   const router = useRouter();
   useEffect(() => {
      if (session) {
         router.push('/');
      }
   }, [session]);
   if (session) return <Loader></Loader>;
   return (
      <div>
         {Object.values(providers).map((provider) => (
            <div key={provider.id}>
               <button onClick={() => signIn(provider.id)}>
                  Sign In {provider.name}
               </button>
            </div>
         ))}
      </div>
   );
};

export default Signin;

export async function getServerSideProps() {
   const providers = await getProviders();
   return {
      props: { providers },
   };
}
