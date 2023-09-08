import { useState, useEffect, useRef } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/webpack';

const InputChatBox = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Set the worker source URL
    GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.js`;
    //pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);


  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    console.log(event)
    const file = event.dataTransfer.files[0];
    decodeFiles(file)
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    let files;

    if (event.dataTransfer && event.dataTransfer.files) {
      files = event.dataTransfer.files;
    } else if (event.target && event.target.files) {
      files = event.target.files;
    }
    if (files && files.length > 0) {
      const file = files[0];
      decodeFiles(file)
    }
  }

  const decodeFiles = (file) => {

    const fileType = file.type;

    if (fileType === 'application/pdf') {
      const reader = new FileReader();

      reader.onload = async function (event) {
        const typedArray = new Uint8Array(event.target.result);
        const loadingTask = getDocument(typedArray);

        try {
          const pdfDocument = await loadingTask.promise;
          const numPages = pdfDocument.numPages;
          let combinedText = '';

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const textContent = await page.getTextContent();
            const textItems = textContent.items;
            const pageText = textItems.map(item => item.str).join(' ');
            combinedText += pageText + '\n\n';
          }
          console.log(combinedText);
          props.handleFileInput(combinedText);
        } catch (error) {
          console.error('Error occurred while parsing PDF:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    } else if (fileType === 'text/plain') {
      console.log('Dropped text file:', file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target.result;

        console.log('File contents:', contents);

        props.handleFileInput(contents);

      };

      reader.readAsText(file);
    } else if (fileType === 'text/html') {
      const reader = new FileReader();

      reader.onload = (event) => {
        const contents = event.target.result;

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(contents, 'text/html');
        const text = htmlDoc.body.textContent;

        console.log('HTML contents without tags:', text);
        props.handleFileInput(text);
      };

      reader.readAsText(file);
    } else {
      console.log('Unsupported file type:', fileType);
    }
  };



  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '55%',
        transform: 'translateX(-50%)',
        width: 'max(700px,30vw)',
        border: isDragging ? '2px dashed #007bff' : '1px solid #58606e',
        backgroundColor: '#58606e',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <textarea
        style={{
          flex: '1',
          minHeight: '10vh',
          resize: 'none',
          boxSizing: 'border-box',
          border: 'none',
          padding: '8px',
          backgroundColor: '#58606e',
          fontSize: '16px',
          whiteSpace: 'pre-wrap',
        }}
        value={props.InputText}
        onChange={props.handleChange}
        onKeyPress={props.handleKeyPress}
      />
      <input
        type="file"
        accept=".txt,.doc,.docx,.pdf,.png,.jpg,.jpeg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInputRef}

      />
      <button
        style={{
          padding: '1.2vh',
          margin: '2vh',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={props.sendMessage}
      >
        Send
      </button>
      <button
        style={{
          marginRight: '0.8vh',
          color: 'transparent',
          background: 'none',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 512 512" style={{ fill: '#123070' }}>
          <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
        </svg>
      </button>
    </div>
  );
};



export default InputChatBox;

