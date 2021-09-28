import React from 'react';
import { EphemeralForm } from '../molecules/EditEphemeral.jsx';
import { DefaultLayout } from '../page-templates/DefaultLayout.jsx';
import { NewRecallForm } from '../store/ConnectedComponents.js';

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
};
