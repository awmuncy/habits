import React, {useState} from 'react';

function NewCoreValue(props) {
    const [title, updateTitle] = useState("");
    const [content, updateContent] = useState("");

    function create(e) {
        e.preventDefault();
        e.stopPropagation();

        props.newCoreValue(title, content);
    }

    return (
        <form onSubmit={e=>create(e)}>
            <input type="text" value={title} onChange={(e)=>updateTitle(e.target.value)} />
            <input type="text" value={content} onChange={(e)=>updateContent(e.target.value)} />
            <input type="submit" />
        </form>
    );
}

export default NewCoreValue;