import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductOne() {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <h1>Product: {slug}</h1>
    </div>
  );
}