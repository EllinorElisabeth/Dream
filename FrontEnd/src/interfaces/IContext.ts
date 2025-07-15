import IThought from "./IThought";

interface IContext {

    thoughts: IThought[];
    addThought: (newThought: IThought) => void;
    updateThought: (updateThought: IThought) => void;
    deleteThought: (id: number) => void;
    setThoughts: React.Dispatch<React.SetStateAction<IThought[]>>

}

export default IContext;