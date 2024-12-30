'use client';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl p-5 space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;