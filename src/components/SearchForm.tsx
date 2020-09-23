import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    // const isSearchPage = router.pathname === '/search';

    router.push(
      `/search?q=${encodeURIComponent(search)}`, 
      // undefined, 
      // { shallow: false }
    );

    setSearch('');
  }

  return (
    <form onSubmit={handleSearch}>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <button type="submit">Buscar</button>
    </form>
  );
}

