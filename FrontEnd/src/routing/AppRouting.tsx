import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, AddThoughtPage, SearchPage, ImagePage } from '../pages';
import { Provider } from "../context/Context";
import Navigationbar from '../components/Navigation/Navigationbar';


const AppRouting = () => {
    return (
        <>
            <BrowserRouter>
                <Provider>
                    <Navigationbar />
                    <Routes>
                        <Route path='home' element={<HomePage />} />
                        <Route path='add' element={<AddThoughtPage />} />
                        <Route path='search' element={<SearchPage />} />
                        <Route path='upload' element={<ImagePage />} />
                        <Route path='/' element={<Navigate to="/home" />}/>
                    </Routes>
                </Provider>
            </BrowserRouter>
        </>
    )
}

export default AppRouting;