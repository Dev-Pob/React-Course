import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({onAdd, onCancel}){
    const modal=useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        
        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
            modal.current.open();
            return;
        }

        onAdd({
            title:enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate});
    }

    return (
    <>
        <Modal ref={modal} buttonCaption='Close'>
            <h2 className='text-xl font-bold text-stone-700 mt-4 mb-4 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>You forgot some value, didn't ya?</p>
            <p className='text-stone-600 mb-4'>Make sure you provide valid values!</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
                        Cancel
                        </button></li>
                <li>
                    <button className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
                    onClick={handleSave}>
                        Save
                        </button>
                    </li>
            </menu>
            <div>
            <Input type="text" label="Title" ref={title}/>
            <Input label="Description" isTextarea ref={description}/>
            <Input type="date" label="Due Date" ref={dueDate}/>
            </div>
        </div>
    </>);
}