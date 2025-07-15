import { useContext, useRef, useState } from 'react';
import { Context } from '../context/Context';
import IContext from '../interfaces/IContext';
import IThought from '../interfaces/IThought';

const AddThought = () => {

    const { addThought: addThought } = useContext(Context) as IContext;
    const [feedbackAdd, setFeedbackAdd] = useState<string>("");
    const userInput = useRef<HTMLTextAreaElement>(null);

    const addNewThought = () => {
        if (userInput.current !== null) {
            const newThought = userInput.current.value;
            if (newThought) {
                const newObject: IThought = { thoughtText: newThought };
                try {
                    addThought(newObject);
                    userInput.current.value = "";
                    setFeedbackAdd(`"${newThought}" successfully added! `)
                } catch (error) {
                    console.error("Error: add thought", error);
                    setFeedbackAdd("Something went wrong. Try again.")
                }
            };
        };
    };

    const cancelNewThought = () => {
        if (userInput.current !== null) {
            userInput.current.value = "";
            setFeedbackAdd("");
        }
    }

    return (
        <section>

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

            <div className='sm:grid sm:grid-cols-12'>
                <div className='sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-12 place-items-center glass-container p-6 rounded-xl'>
                    <textarea ref={userInput} className='w-full sm:col-span-6 rounded-lg border textarea-border p-2' placeholder='Add new thought here...' />
                    <div className='sm:col-span-6 gap-4 flex justify-end min-w-max'>
                        <button className='secondary-btn' onClick={cancelNewThought}>Cancel</button>
                        <button className='primary-btn' onClick={addNewThought}>Add</button>
                    </div>
                </div>
            </div>
            <div className='text-center m-8'>
                {feedbackAdd}
            </div>

        </section>
    );
};

export default AddThought;
