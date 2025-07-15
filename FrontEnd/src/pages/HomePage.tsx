import ThoughtList from "../components/ThoughtList";

const HomePage = () => {

    return (
        <section>
            <h1 className='text-center text-6xl m-10'>Dreams</h1>
            <p className='text-center p-4'>Welcome to Dreams<br/>A safe place to express your dreams, thoughts, and visions</p>
            <ThoughtList />
        </section>
    )

};

export default HomePage;