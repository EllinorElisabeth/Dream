import axios, { AxiosResponse } from "axios";
import IThought from "../interfaces/IThought";
import INewThought from "../interfaces/INewThought";

const BASE_URL = "http://localhost:5115/Thought";

const Service = (() => {
  // Get all thoughts
  const getAllThoughts = async (): Promise<AxiosResponse<IThought[]>> => {
    return await axios.get<IThought[]>(`${BASE_URL}`);
  };

  // Get thought by id
  const getThoughtById = async (id: number): Promise<AxiosResponse<IThought>> => {
    return await axios.get<IThought>(`${BASE_URL}/${id}`);
  };

  // Get thought by text
  const getThoughtByText = async (thought: string): Promise<AxiosResponse<IThought[]>> => {
    return await axios.get<IThought[]>(`${BASE_URL}/GetByThought/${thought}`);
  };

  // Add new thought
  const addThought = async (newThought: INewThought): Promise<AxiosResponse<IThought>> => {
    return await axios.post<IThought>(`${BASE_URL}`, newThought);
  };

  // Update thought
  const updateThought = async (updateThought: IThought): Promise<AxiosResponse<IThought>> => {
    return await axios.put<IThought>(`${BASE_URL}`, updateThought);
  };

  // Delete thought
  const deleteThought = async (id: number): Promise<AxiosResponse<void>> => {
    return await axios.delete<void>(`${BASE_URL}/${id}`);
  };

  return {
    getAllThoughts,
    getThoughtById,
    getThoughtByText,
    addThought,
    updateThought,
    deleteThought,
  };
})();

export default Service;