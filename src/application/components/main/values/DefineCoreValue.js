import React, {useState} from 'react';

function DefineCoreValue(props) {
    const [title, updateTitle] = useState(props.core_value.title || "");
    const [content, updateContent] = useState(props.core_value.content || "");

    function create(e) {
        e.preventDefault();
        e.stopPropagation();

        props.defineCoreValue({title: title, content:content, id: props.id || false});
    }

    var currentHabit = props.id ? <input type="hidden" value={props.id} /> : null;

    return (
        <form onSubmit={e=>create(e)}>
            <input type="text" value={title} onChange={(e)=>updateTitle(e.target.value)} />
            <input type="text" value={content} onChange={(e)=>updateContent(e.target.value)} />
            {currentHabit}
            <input type="submit" />
        </form>
    );
}

export default DefineCoreValue;