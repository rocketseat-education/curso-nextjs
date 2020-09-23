import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductOne() {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <div>
      <Head>
        <title>Product "{slug}" | DevCommerce</title>
      </Head>

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Product: {slug}</h1>
    </div>
  );
}