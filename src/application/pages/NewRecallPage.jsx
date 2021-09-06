import React from 'react';
import { EphemeralForm } from '../molecules/EditEphemeral';
import { DefaultLayout } from '../page-templates/DefaultLayout';
import { NewRecallForm } from '../store/ConnectedComponents';

function NewRecallPage() {
    return (
        <DefaultLayout>
            <NewRecallForm />
            <EphemeralForm />
        </DefaultLayout>
    );
}

export {
    NewRecallPage
}
