import { useContext, useRef, useState } from 'react';
import { Context } from "../context/Context";
import Service from '../services/Service';
import IContext from '../interfaces/IContext';
import IThought from '../interfaces/IThought';


const SearchThought = () => {

    const { getThoughtById, getThoughtByText } = Service;
    const { deleteThought } = useContext(Context) as IContext;

    // ID
    const [searchResultId, setSearchResultId] = useState<IThought | null>(null);
    const userInputId = useRef<HTMLInputElement>(null);
    const [feedbackId, setFeedbackId] = useState<string>("");

    // Text
    const [searchResultText, setSearchResultText] = useState<IThought[]>([]);
    const userInputText = useRef<HTMLTextAreaElement>(null);
    const [feedbackText, setFeedbackText] = useState<string>("");

    // ID btn
    const searchByIdBtn = async () => {
        if (!userInputId.current) return;

        const raw = userInputId.current.value.trim();
        const inputId = Number(raw);

        if (!raw || Number.isNaN(inputId)) {
            setSearchResultId(null);
            setFeedbackId("Enter a valid numeric ID");
            return;
        }

        try {
            const result = await getThoughtById(inputId);
            const thought = result.data;

            if (thought) {
                setSearchResultId(thought);
                setFeedbackId("");
            } else {
                setSearchResultId(null);
                setFeedbackId(`No thought match ID: "${raw}"`);
            }
        } catch (error) {
            console.error("Error during id search", error);
            setSearchResultId(null);
            setFeedbackId(`No thought match ID: "${raw}"`);
        }
    };

    // Text btn
    const searchByThoughtBtn = async () => {
        if (!userInputText.current) return;
        const inputText = userInputText.current.value.trim();
        if (!inputText) {
            setSearchResultText([]);
            setFeedbackText("Enter text to search");
            return;
        }
        try {
            const result = await getThoughtByText(inputText);
            if (result.data.length > 0) {
                setSearchResultText(result.data);
                setFeedbackText("");
            } else {
                setSearchResultText([]);
                setFeedbackText(`Nothing matched with: "${inputText}"`);
            }
        } catch (error) {
            console.error("Error during text search", error);
            setSearchResultText([]);
            setFeedbackText("Something went wrong. Try again.");
        }
    };

    const deleteByText = async (id: number) => {
        try {
            await deleteThought(id);
            setSearchResultText(list => list.filter(thought => thought.id !== id))
        } catch (error) {
            console.error("Delete failed", error);
        }
    }

    return (
        <section className='sm:grid sm:grid-cols-12'>

            <div className='circle-wrapper' aria-hidden="true">
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
                <input
                    type="number"
                    ref={userInputId}
                    className='w-full sm:col-span-6 rounded-lg border textarea-border'
                    placeholder="Enter ID..."
                />
                <div className='sm:col-span-6 gap-4 flex justify-end min-w-max'>
                    <button className='primary-btn' onClick={searchByIdBtn}>Search by ID</button>
                </div>
            </div>

            <div className='sm:col-start-4 sm:col-span-6 mt-4'>
                {feedbackId && <p className='text-red-600 mb-16'>{feedbackId}</p>}

                {searchResultId && (
                    <>
                        <h4 className='py-2 font-medium'>Found Dream ID: "{searchResultId.id}"</h4>
                        <div className='grid grid-cols-4 items-start'>
                            {/* Left side: ID*/}
                            <div className='col-start-1 col-span-3 flex items-start gap-4'>
                                <span className='inline-flex items-center justify-center px-2 border-b border-blue-200 text-xs shrink-0'>
                                    ID {searchResultId.id}
                                </span>
                                <span>"{searchResultId.thoughtText}"</span>
                            </div>
                            {/* Right side: btns */}
                            <div className='flex justify-end'>
                                <button
                                    className='secondary-btn mb-12'
                                    onClick={() => deleteByText(searchResultId.id || 0)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>


            <div className='sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-12 place-items-center glass-container p-6 rounded-xl'>
                <textarea
                    ref={userInputText}
                    className='w-full sm:col-span-6 rounded-lg border textarea-border'
                    placeholder="Enter text..."
                />
                <div className='sm:col-span-6 gap-4 flex justify-end min-w-max'>
                    <button className='primary-btn' onClick={searchByThoughtBtn}>Search by text</button>
                </div>
            </div>

            <div className='sm:col-start-4 sm:col-span-6 mt-4'>
                {feedbackText && <p className='text-red-600'>{feedbackText}</p>}

                {searchResultText.length > 0 && (
                    <>
                        <h4 className='py-2 font-medium'>Dreams found: {searchResultText.length}</h4>
                        <ul>
                            {searchResultText.map((thoughtObject, i) => (
                                <li key={i} className='py-4'>
                                    <div className='grid grid-cols-4 items-start'>
                                        {/* Left side: ID*/}
                                        <div className='col-start-1 col-span-3 flex items-start gap-4'>
                                            <span className='inline-flex items-center justify-center px-2 border-b border-blue-200 text-xs shrink-0'>
                                                ID {thoughtObject.id}
                                            </span>
                                            <span className=''>"{thoughtObject.thoughtText}"</span>
                                        </div>

                                        {/* Right side: btns */}
                                        <div className='flex justify-end'>
                                            <button
                                                className='secondary-btn'
                                                onClick={() => deleteByText(thoughtObject.id || 0)}
                                            >
                                                Delete
                                            </button>
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

