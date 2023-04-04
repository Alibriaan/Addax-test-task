import { useRef } from 'react';
import { Button } from '../../components/Button';
import { HiddenFileInput } from '../../components/HiddenFileInput';

export interface UploadFileButtonProps {
  onFileUpload: (file: File) => void;
  placeholder: string;
};

export function UploadFileButton(props: UploadFileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFileButtonClick = () => {
    inputRef.current?.click();
  }

  const uploadFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) {
      return;
    }

    const file = event.target.files.item(0);

    if(!file) {
      return;
    }

    props.onFileUpload(file);
  }

  return (
    <>
      <Button variant='paper' onClick={uploadFileButtonClick}>{props.placeholder}</Button>
      <HiddenFileInput ref={inputRef} onChange={uploadFileChange}/>
    </>
  );
}