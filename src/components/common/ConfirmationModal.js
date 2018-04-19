import React from 'react';

const ConfirmationModal = () => (
    <Modal
    trigger={<Button>Show Modal</Button>}
    header='Reminder!'
    content='Call Benjamin regarding the reports.'
    actions={[
      'Snooze',
      { key: 'done', content: 'Done', positive: true },
    ]}
  />
);