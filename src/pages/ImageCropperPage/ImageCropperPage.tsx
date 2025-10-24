import { ImageCropper } from '@features/ImageCropper';
import style from './imageCropperPage.module.css';

export const ImageCropperPage = () => {
  return (
    <div className={style.page}>
      <header className={style.header}>Image Cropper</header>

      <main className={style.mainContainer}>
        <div className={style.leftSection} />

        <div className={style.imageSection}>
          <ImageCropper />
        </div>

        <div className={style.rightSection} />
      </main>
    </div>
  );
};
