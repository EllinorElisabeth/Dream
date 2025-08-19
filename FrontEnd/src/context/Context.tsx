import { useState, createContext, FC, ReactNode, useEffect } from "react";
import IContext from "../interfaces/IContext";
import IThought from "../interfaces/IThought";
import Service from "../services/Service";

export const Context = createContext<IContext | null>(null);

export interface Props {
    children: ReactNode;
}

export const Provider: FC<Props> = ({ children }) => {

    const [thoughts, setThoughts] = useState<IThought[]>([]);
    const { getAllThoughts, addThought: addThoughtService, updateThought: updateThoughtService, deleteThought: deleteThoughtService } = Service;

    useEffect(() => {
        const fetchAllThoughts = async () => {
            try {
                const result = await getAllThoughts();
                console.log("Fetch thoughts:", result.data);
                setThoughts(result.data);
            } catch (error) {
                console.error("Error: get all thoughts", error);
            }
        };
        fetchAllThoughts();
    }, []);

    const addThought = async (newThought: IThought): Promise<void> => {
        try {
            const result = await addThoughtService(newThought);
            console.log("Added:", result.data); 
            const all = await getAllThoughts();
            setThoughts(all.data);
        } catch (error) {
            console.error("Error: add new thought", error);
        }
    };

    const updateThought = async (updateThought: IThought): Promise<void> => {
        try {
            await updateThoughtService(updateThought);
            const result = await getAllThoughts();
            setThoughts(result.data);
        } catch (error) {
            console.error("Error: update thought", error);
        }
    };

    const deleteThought = async (id: number): Promise<void> => {
        try {
            await deleteThoughtService(id);
            const result = await getAllThoughts();
            setThoughts(result.data);
        } catch (error) {
            console.error("Error: delete thought", error);
        }
    };

    return (
        <Context.Provider value={{ thoughts, addThought, updateThought, deleteThought, setThoughts }}>
            {children}
        </Context.Provider>
    );

};