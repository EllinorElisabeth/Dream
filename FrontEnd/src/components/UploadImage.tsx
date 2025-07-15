import { ChangeEvent, useState } from "react"
import UploadImageService from "../services/UploadImageService";

const UploadImage = () => {

    const [image, setImage] = useState<File | null>(null);
    const [feedbackImage, setFeedbackImage] = useState<string | null>(null)

    const setImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files !== null) {
            const file = files[0];
            setImage(file);
        }
    }

    const uploadImage = () => {
        if (image !== null) {
            try {
                UploadImageService.uploadImage(image);
                setFeedbackImage("Image upload successfull!")
            } catch {
                setFeedbackImage("Error: feiled to upload. Try again.")
            }
        } else {
            setFeedbackImage("Feel free to upload images!")
        }
    };

    return (
        <section>
            <div className='sm:grid sm:grid-cols-12'>
            <div className='sm:col-start-4 sm:col-span-6 sm:grid sm:grid-cols-12 glass-container p-6 rounded-xl'>
                <p className='col-span-12 p-2'>Choose an image to upload</p>
                {feedbackImage}
                <input className='w-full sm:col-span-6' onChange={setImageHandler} type='file' />
                <div className='sm:col-span-6 gap-4 flex justify-end min-w-max'>
                    <button className='primary-btn' onClick={uploadImage} type='button'>Upload</button>
                </div>
            </div>

            {/*Styling purposes only*/}
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            <div className='style'></div>
            </div>

        </section>

    )
};

export default UploadImage;