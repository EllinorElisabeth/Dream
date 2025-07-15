import { useContext, useRef, useState } from "react";
import IContext from "../interfaces/IContext";
import { Context } from "../context/Context";
import IThought from "../interfaces/IThought";

function ThoughtList() {

    const { thoughts, updateThought, deleteThought } = useContext(Context) as IContext;
    const thoughtsCount = thoughts.length;

    const [thoughtObjectIdEditMode, setThoughtObjectIdEditMode] = useState<number | undefined>(undefined);
    const updateThoughtValue = useRef<HTMLTextAreaElement>(null);

    const saveNewThought = (id: number) => {
        if (updateThoughtValue.current !== null) {
            const newText = updateThoughtValue.current.value;
            const updatedObject: IThought = {
                id: id,
                thoughtText: newText
            };
            updateThought(updatedObject);
            setThoughtObjectIdEditMode(undefined);
        }
    };

    const ShowAllThoughts = () => {
        return thoughts.map((thoughtObject, i) => (
            <li className='sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-4 glass-container p-6 rounded-xl' key={i}>
                <div className='sm:col-span-2 place-content-center text-wrap'>
                    {thoughtObjectIdEditMode === thoughtObject.id ? (<textarea className='w-full h-full bg-white p-2 rounded-lg' ref={updateThoughtValue} defaultValue={thoughtObject.thoughtText} />) : (thoughtObject.thoughtText)}
                </div>
                <div className="sm:col-span-2 flex gap-4 justify-end">
                    {thoughtObjectIdEditMode === thoughtObject.id ? (
                        <div className='flex gap-4 place-items-center'>
                            <button className='secondary-btn' onClick={() => setThoughtObjectIdEditMode(undefined)}>Cancel</button>
                            <button className='primary-btn' onClick={() => { if (thoughtObject.id) { saveNewThought(thoughtObject.id); } } }>Save</button>
                        </div>
                    ) : (
                        <>
                            <div className='flex gap-4 place-items-center'>
                                <button className='secondary-btn' onClick={() => setThoughtObjectIdEditMode(thoughtObject.id)}>Edit</button>
                                <button className='primary-btn' onClick={() => { if (thoughtObject.id) { deleteThought(thoughtObject.id); } } }>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </li>
        ));

    };

    return (
        <section className='grid grid-cols-1 place-items-center m-4'>

            {/*Styling purposes only*/}
            <div className='circle-wrapper'>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
                <div className='style'></div>
            </div>

            <div className='py-4'>
                {`You have shared ${thoughtsCount} dreams`}
            </div>

            <ul className='grid sm:grid-cols-12 gap-4 sm:w-full'>
                {ShowAllThoughts()}
            </ul>

        </section>
    );

}

export default ThoughtList;