import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditTableSpanProps = {
    title: string
    changeTitle: (newTitle: string) => void
}
const EditTableSpan = (props: EditTableSpanProps) => {
    const [title, setTitle] = useState<string>(props.title)
    const [isEditMod, setEditVod] = useState<boolean>(false)
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMod = () => setEditVod(true)
    const offEditMod = () => {
        setEditVod(false)
        props.changeTitle(title)
    }
    const onKeyDownEditMod = (el: KeyboardEvent<HTMLInputElement>) => {
        el.key === "Enter" && offEditMod()
    }
    return (
        isEditMod
            ? <input
                value={title}
                onChange={setLocalTitle}
                autoFocus
                onBlur={offEditMod}
                onKeyDown={onKeyDownEditMod}
            />

            : <span onDoubleClick={onEditMod}>{props.title}</span>
    );
};

export default EditTableSpan;