import { useContext, useState } from "react";
import { Context } from "../context/Context";
import IContext from "../interfaces/IContext";
import IThought from "../interfaces/IThought";
import INewThought from "../interfaces/INewThought";
import Service from "../services/Service";

const AddThought = () => {
  const { addThought } = useContext(Context) as IContext;
  const [thoughtText, setThoughtText] = useState("");
  const [feedbackAdd, setFeedbackAdd] = useState<string>("");

  const addNewThought = async () => {
    const trimmed = thoughtText.trim();
    if (!trimmed) return;

    const newObject: INewThought = {
        thoughtText: trimmed
    };

    const result = await Service.addThought(newObject);
    const newThought: IThought = result.data;

    try {
      await addThought(newThought);
      setThoughtText("");
      setFeedbackAdd(`"${trimmed}" successfully added!`);
    } catch (error) {
      console.error("Error: add thought", error);
      setFeedbackAdd("Something went wrong. Try again.");
    }
  };

  const cancelNewThought = () => {
    setThoughtText("");
    setFeedbackAdd("");
  };

  return (
    <section>
      <div className="circle-wrapper" aria-hidden="true">
        <div className="style"></div><div className="style"></div>
        <div className="style"></div><div className="style"></div>
        <div className="style"></div><div className="style"></div>
        <div className="style"></div><div className="style"></div>
      </div>

      <div className="sm:grid sm:grid-cols-12">
        <div className="sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-12 place-items-center glass-container p-6 rounded-xl">
          <textarea
            className="w-full sm:col-span-6 rounded-lg border textarea-border p-2"
            placeholder="Add here..."
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
          />
          <div className="sm:col-span-6 gap-4 flex justify-end min-w-max">
            <button className="secondary-btn" type="button" onClick={cancelNewThought}>Cancel</button>
            <button className="primary-btn" type="button" onClick={addNewThought}>Add</button>
          </div>
        </div>
      </div>

      <div className="text-center m-8">{feedbackAdd}</div>
    </section>
  );
};

export default AddThought;
