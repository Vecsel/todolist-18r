import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFromProps = {
    addItem: (title: string) => void
}
const AddItemForm = (props: AddItemFromProps) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorStyles = {fontWeight: "bold", color: "red"}
    const errorMessage = error
        ? <div style={errorStyles}>Please, enter new title</div>
        : null
    const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle,)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <div>
                <input
                    value={title}
                    onKeyDown={onEnterAddItem}
                    onChange={setLocalTitle}
                    className={error ? "input-error" : ""}
                />
                <button onClick={addItem}>+</button>
                {errorMessage}
            </div>
        </div>
    );
};

export default AddItemForm;