import IThought from "./IThought";

interface IContext {

    thoughts: IThought[];
    addThought: (newThought: IThought) => Promise<void>;
    updateThought: (updateThought: IThought) => Promise<void>;
    deleteThought: (id: number) => Promise<void>;
    setThoughts: React.Dispatch<React.SetStateAction<IThought[]>>

}

export default IContext;