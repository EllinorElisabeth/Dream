import SearchThought from "../components/SearchThought";

const SearchPage = () => {

    return (
        <section>
            <h1 className='text text-center text-6xl m-10'>Search for dreams</h1>
            <p className='text-center p-4'>Simply search by typing in the field</p>
            <SearchThought />
        </section>
    )
}

export default SearchPage;