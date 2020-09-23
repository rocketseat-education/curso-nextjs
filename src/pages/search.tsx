import { useRouter } from "next/router";
import SearchForm from "../components/SearchForm";

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return (
    <div>
      <h1>Searching for: {q}</h1>

      <SearchForm />
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log('heyyy');

  return {
    props: {}
  };
}