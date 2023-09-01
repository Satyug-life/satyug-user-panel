const ENV = process.env;
export const ENVIRONMENT = {
  RAZORPAY_KEY: ENV.REACT_APP_RAZORPAY_KEY,
  MAP_key: ENV.REACT_APP_GOOGLE_API_KEY,
  GAME_URL: ENV.REACT_APP_GAME_URL,
  RAZORPAY_URL: ENV.REACT_APP_RAZORPAY,
  URL_LINK: ENV.REACT_APP_SHARE_URL
};
// export const URL_LINK = `https://www.stage-user.satyug.life/?id=`
export const FORMIK_REGEX = {
  ALPHA_REGEX: /^[A-Za-z\s]+$/,
  MOBILE_NUMBER_REGEX: /^\+(?:[0-9]●?){6,16}[0-9]$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EMAIL_REGEX_NEW:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ADDRESS_REGEX: /^[a-zA-Z a-zA-Z0-9\n-/@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  POSTAL_REGEX: /^(\d{4}|\d{10})$/,
  NUMERIC_REGEX: /^\d+$/,
};
export const GAME_TOKEN = {
  GameAccessToken: "GameAccessToken",
  GameVerifyToken: "GameVerifyToken",
  UserRegisterToken: "UserRegisterToken",
  Collectible: "collectible",
};

export const S3_BUCKET = {
  URL: "https://ik.imagekit.io/satyug",
  IMAGES: "https://ik.imagekit.io/satyug/satyugImages",
  VIDEOS: "https://ik.imagekit.io/satyug/satyugvideos",
  SHIRT: "https://ik.imagekit.io/satyug/products/Tshirt.png",
  CAP: "https://ik.imagekit.io/satyug/products/cap.png",
  BEFORE_GAME: "https://ik.imagekit.io/satyug/satyugvideos/BeforeGam.mp4",
  CINEMATIC_GAME: "https://ik.imagekit.io/satyug/satyugvideos/Construction.mp4",
  DAKSHINA_GAME: "https://ik.imagekit.io/satyug/satyugvideos/Bhojnalya_stage.mp4",
  SATHAPNA_GAME: "https://ik.imagekit.io/satyug/satyugvideos/Murti_stage.mp4",
  NIRMAAN_GAME: "https://ik.imagekit.io/satyug/satyugvideos/bagicha-stage.mp4",
  ABOUT_US_TEXT: "https://ik.imagekit.io/satyug/satyugImages/about-us.png",
  CLICK_TO_ENTER_TEXT: "https://ik.imagekit.io/satyug/satyugImages/click-to-enter.png",
  SATYUG_VIDEO_POSTER: "https://ik.imagekit.io/satyug/satyugImages/satyug-video-poster.webp",
  SHARE_PAGE_VIDEO: "https://ik.imagekit.io/satyug/satyugvideos/BahumulyaWEBM.webm",
  BAGEECHA: "https://ik.imagekit.io/satyug/satyugImages/bageecha.webp",
  MURTI_STHAPANA: "https://ik.imagekit.io/satyug/satyugImages/murthi-sathapna.webp",
  BHOJNALYA: "https://ik.imagekit.io/satyug/satyugImages/bhojnalaya.webp",
  MANDIR: "https://ik.imagekit.io/satyug/satyugImages/card-image.webp",
  SHARE_IMAGE: "https://ik.imagekit.io/satyug/satyugImages/share-image.webp",
  ABOUT_US_HIGH: "https://ik.imagekit.io/satyug/satyugvideos/about-us.mp4",
  ABOUT_US_LOW: "https://ik.imagekit.io/satyug/satyugvideos/about-us-low.mp4",
  ABOUT_US_480: "https://ik.imagekit.io/satyug/satyugvideos/about-us-480.mp4",
  ABOUT_US_720: "https://ik.imagekit.io/satyug/satyugvideos/about-us-720.mp4",
  SATYUG_VIDEO: "https://ik.imagekit.io/satyug/satyugvideos/Satyug.mp4",
  SATYUG_VIDEO_LOW: "https://ik.imagekit.io/satyug/satyugvideos/satyug-low.mp4",
  DHYANA_VIDEO: "https://ik.imagekit.io/satyug/satyugvideos/dhyana.mp4",
  DHYANA_VIDEO_LOW: "https://ik.imagekit.io/satyug/satyugvideos/dhyana-low.mp4",
  YOGA_VIDEO: "https://ik.imagekit.io/satyug/satyugvideos/yoga.mp4",
  YOGA_VIDEO_LOW: "https://ik.imagekit.io/satyug/satyugvideos/yoga-low.mp4",
  SHARE_BACK: "https://ik.imagekit.io/satyug/satyugvideos/sharevideo.mp4",
  ABOUT_US_POSTER: "https://ik.imagekit.io/satyug/satyugImages/about-us-poster.png",
  LOGO_HD: "https://satyug-bucket.s3.amazonaws.com/satyugImages/logo-hd.webp",
  BEFORE_GAME_720: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/before-game-720.mp4",
  BEFORE_GAME_480: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/before-game-480.mp4",
  BEFORE_GAME_360: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/before-game-360.mp4",
  SHARE_360: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/share-360.mp4",
  SHARE_480: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/share-480.mp4",
  OLD_LOGO: "https://satyug-bucket.s3.amazonaws.com/satyugImages/satyug-old-logo.webp",
  BADHAI: "https://satyug-bucket.s3.amazonaws.com/satyugvideos/Badhai (1).webm"
};
export const S3_BUCKET_AUDIO = {
  AFTER_GAME: "https://ik.imagekit.io/satyug/audio/AfterGame.mp3",
  DONATE: "https://ik.imagekit.io/satyug/audio/Donate.mp3",
  MANDIR_CONSTRUCTION:
    "https://ik.imagekit.io/satyug/audio/MandirConstruction.mp3",
  QUIZ: "https://ik.imagekit.io/satyug/audio/Quiz.mp3",
  SHARE: "https://ik.imagekit.io/satyug/audio/share.mp3",
  PARTICIPATION: "https://ik.imagekit.io/satyug/audio/participation.mp3"
};

export const NETWORK_SPEED = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
}


export const SCREEN_SIZE = {
  MOBILE: "MOBILE",
  TAB: "TAB",
  DESKTOP: "DESKTOP",
}