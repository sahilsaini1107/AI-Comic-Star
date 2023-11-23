// import styles from "./Hero.module.css";
// import HeroCanvas from '../herocanvas/HeroCanvas';
// const Hero = (props) => {
//   return (
//     <div className={props.images.length ? `grid grid-cols-4 gap-4 ${styles.mainOne} ${styles["image-container"]}` : styles.mainTwo}>
//       {props.images.length === 0 && (
//         <h1 className={styles.head}>Need 10 pages to make a comic 😒... </h1>
//       )}
//       {
//         (props.images.length ===3) &&    ( <div>
//         {props.images.length ? (
//           <HeroCanvas images={props.images} />
//         ) : (
//           <h1 className={styles.head}>Need 10 pages to make a comic 😒... </h1>
//         )}
//       </div>)
//       }

//       {props.images.map((url, index) => (
//         <div key={index} className={`imgsec ${styles["image-wrapper"]}`}>
//           {console.log(url)}
//           <img src={url.url} alt={`Image ${index}`} />
//           <p ></p>
//           <div className={`${styles["image-text"]}`}>
//             {url.anno}
//             <div className={styles.circle1}></div>
//             <div classNmae={styles.circle2}></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Hero;


import styles from "./Hero.module.css";
import HeroCanvas from '../herocanvas/HeroCanvas';
const Hero = (props) => {
  return (
    <div className={props.images.length ? `flex ${styles.mainOne} ${styles["image-container"]} ${styles.canvasContainer}` : styles.mainTwo}>
      {props.images.length ? (
        <HeroCanvas images={props.images} />
      ) : (
        <h1 className={styles.head}>Need 10 pages to make a comic 😒... </h1>
      )}
    </div>
  );
};

export default Hero;
