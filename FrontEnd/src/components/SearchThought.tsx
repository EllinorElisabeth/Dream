import { useContext, useRef, useState } from 'react';
import { Context } from "../context/Context";
import Service from '../services/Service';
import IContext from '../interfaces/IContext';
import IThought from '../interfaces/IThought';


const SearchThought = () => {

    const { getThoughtByText } = Service;
    const { deleteThought } = useContext(Context) as IContext;

    // // Search by ID.
    // const [searchResultId, setSearchResultId] = useState<IThought | null>(null);
    // const userInputId = useRef<HTMLInputElement>(null);
    // const [feedbackId, setFeedbackId] = useState<string>("");

    // Search by Thought.
    const [searchResultText, setSearchResultText] = useState<IThought[]>([]);
    const userInputText = useRef<HTMLTextAreaElement>(null);
    const [feedbackText, setFeedbackText] = useState<string>("");
    /*
        const searchByIdBtn = async () => {
            if (userInputId.current != null) {
                const inputId = parseInt(userInputId.current.value);
                if (!inputId) {
                    setFeedbackId("Enter ID to search");
                    setSearchResultId(null);
                    return null;
                }
                try {
                    const result = await getThoughtById(inputId);
                    setSearchResultId(result.data);
                    setFeedbackId("");
                } catch (error) {
                    setSearchResultId(null);
                    setFeedbackId(`No thought match ID: "${userInputId.current.value}"`);
                    console.error("Error: feil under søk", error);
                }
            }
        };
    */
    const searchByThoughtBtn = async () => {
        if (userInputText.current != null) {
            const inputText = userInputText.current.value;
            if (!inputText) {
                setSearchResultText([]);
                setFeedbackText("Enter text to search")
                return ([]);
            }
            try {
                const result = await getThoughtByText(inputText);
                if (result.data.length > 0) {
                    setSearchResultText(result.data);
                    setFeedbackText("");
                } else {
                    setSearchResultText([]);
                    setFeedbackText(`No thought match with: "${userInputText.current.value}"`);
                }
            } catch (error) {
                console.error("Error: feil oppstod under søk", error);
                setSearchResultText([]);

            }
        }
    };

    // const deleteById = (id: number) => {
    //     deleteThought(id);
    //     setSearchResultId(null);
    // };

    const deleteByText = (id: number) => {
        deleteThought(id);
        setSearchResultText(result => result.filter(thought => thought.id !== id))
    }

    return (
        <section className='sm:grid sm:grid-cols-12'>

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

            <div className='sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-12 place-items-center glass-container p-6 rounded-xl'>
                <textarea ref={userInputText} className='w-full sm:col-span-6 rounded-lg border textarea-border ' placeholder="Enter text..." />
                <div className='sm:col-span-6 gap-4 flex justify-end min-w-max'>
                    <button className='primary-btn' onClick={searchByThoughtBtn}>Search</button>
                </div>
            </div>

            <div className='sm:col-start-4 sm:col-span-6 text-center mt-4'>
                {feedbackText && <p className='text-red-600'>{feedbackText}</p>}

                {searchResultText.length > 0 && (
                    <>
                        <p className='py-2 font-medium'>Thoughts found: {searchResultText.length}</p>
                        <ul>
                            {searchResultText.map((thoughtObject, i) => (
                                <li key={i} className='py-4'>
                                    <div className='grid grid-cols-4'>
                                        <div className='col-start-1 col-span-3'>{thoughtObject.thoughtText}</div>
                                        <div>
                                            <button className='secondary-btn' onClick={() => deleteByText(thoughtObject.id || 0)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </section>
    );
};

export default SearchThought;