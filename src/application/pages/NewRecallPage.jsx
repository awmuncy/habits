import React from 'react';
import { DefaultLayout } from '../page-templates/DefaultLayout';
import { NewRecallForm } from '../store/ConnectedComponents';

function NewRecallPage() {
    return (
        <DefaultLayout>
            <NewRecallForm />
        </DefaultLayout>
    );
}

export {
    NewRecallPage
}
