import React, { useState } from 'react';
import styles from './Main.module.css';

const Main = (props) => {
  const [description, setDescription] = useState('');
  const [annotations, setAnnotations] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
    props.handleChangeDes(description);
  };

  const handleAnnotationsChange = (e) => {
    setAnnotations(e.target.value);
    props.handleChangeAnn(annotations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleClick();
    setDescription('');
    setAnnotations('');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className={styles.inbox}>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            required
          />
        </div>
        <div className={styles.inbox}>
          <input
            type="tel"
            value={annotations}
            onChange={handleAnnotationsChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="annotations"
            required
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        >
          Add Page
        </button>
        <button
          type="button"
          onClick={() => {
            setDescription('');
            setAnnotations('');
            props.handleRestart()
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Restart
        </button>
      </div>
    </form>
  );
};

export default Main;
