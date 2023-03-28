import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';                                                           
import icon from '../../assets/icon.svg';
import './App.css';
import { getAppCacheDir } from 'electron-updater/out/AppAdapter';

function Hello() {
  const link = "./pic/";
  const straightlink = '/direct-dir-link/pic/'
  const [photos, setPhotos] = useState<string[]>([]);
  const [randomPhoto, setRandomPhoto] = useState<string | null>(null);

  useEffect(() => {
    window.electron.fs.readdir(link).then((files) =>{console.log(files); setPhotos(files)});
  }, []);

  const getRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhotoName = photos[randomIndex];
    const randomPhotoPath = `${straightlink}${randomPhotoName}`;
    console.log(randomPhotoPath);
    setRandomPhoto(randomPhotoPath);
  };

  return (
    <div>
      <button onClick={getRandomPhoto}>ランダムな写真を表示する</button>
      {randomPhoto && <img src={`file:${randomPhoto}`} alt="Random Photo" />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
