import React, { useState } from "react";
// import styles from './styles.module.css'

function createInputComponent({
  multiple,
  accept,
}: {
  multiple: boolean;
  accept: string;
}) {
  const el = document.createElement("input");
  // set input config
  el.type = "file";
  el.accept = accept;
  el.multiple = multiple;
  // return file input element
  return el;
}

type ParsedFile = {
  source: string;
  name: string;
  size: number;
  file: File;
};

export const useFileUpload = () => {
  const [files, setFiles] = useState<ParsedFile[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let userCallback: (p: ParsedFile[]) => void = () => {};

  // Handle onChange event
  const onChange: (e: Event) => void = async (e) => {
    const parsedFiles = [] as ParsedFile[];
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const length = target.files.length;

    // Loop through files
    for (let i = 0; i < length; i++) {
      // get file object
      const file = target.files[i];

      // select properties

      const parsedFile = {
        source: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file, // original file object
      };

      // add to parsed file list
      parsedFiles.push(parsedFile);
    }

    // remove event listener after operation
    target.removeEventListener("change", onChange);

    // remove input element after operation
    target.remove();

    // update files state hook

    setFiles(parsedFiles);
    return userCallback(parsedFiles);

    // user specified callback
  };

  // Handle upload
  const uploadFile = (
    { accept, multiple }: { accept: string; multiple: boolean },
    cb: (p: ParsedFile[]) => void
  ) => {
    if (typeof cb === "function") {
      userCallback = cb;
    }
    // create virtual input element
    const inputEL = createInputComponent({ multiple, accept });
    // add event listener
    inputEL.addEventListener("change", onChange);
    inputEL.click();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => ({ files, uploadFile }), [files]);
};
